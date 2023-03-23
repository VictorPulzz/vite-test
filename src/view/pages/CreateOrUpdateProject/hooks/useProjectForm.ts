import { getGqlError } from '@appello/common/lib/services/gql/utils';
import { isNil } from '@appello/common/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from 'date-fns';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';
import { generatePath, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { ROUTES } from '~/constants/routes';
import {
  DocumentTemplateType,
  ProjectPhaseChoice,
  StatusEnum,
} from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { numberValidation } from '~/utils/validations';
import { transformProjectPrefilledData } from '~/view/pages/CreateOrUpdateProject/utils';

import {
  FetchProjectDocument,
  FetchProjectQuery,
  useCreateOrUpdateProjectMutation,
  useDocumentGenerateMutation,
} from '../__generated__/schema';

const formSchema = z
  .object({
    name: z.string().refine(value => value !== '', formErrors.REQUIRED),
    phase: z.nativeEnum(ProjectPhaseChoice),
    status: z.nativeEnum(StatusEnum),
    hoursEstimated: z.string().and(numberValidation),
    platforms: z.array(z.number()),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
    design: z.string(),
    roadmap: z.string(),
    notes: z.string(),
    documentTemplate: z
      .object({
        isOpen: z.boolean(),
        templateId: z.number().nullable(),
        templateFields: z
          .object({
            value: z.string(),
            name: z.string(),
          })

          .array(),
      })
      .superRefine((value, ctx) => {
        if (value.isOpen) {
          value.templateFields.forEach((field, index) => {
            if (field.value === '') {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: formErrors.REQUIRED,
                path: ['templateFields', index, 'value'],
              });
            }
          });
        }
      })
      .array(),
    clientTeam: z
      .object({
        fullName: z.string(),
        email: z.string(),
        phone: z.string(),
        position: z.string(),
        notes: z.string(),
        pointContact: z.boolean(),
      })
      .array(),
  })
  .superRefine((value, ctx) => {
    if (value.endDate && value.startDate) {
      if (value.startDate > value.endDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['startDate'],
          message: formErrors.INVALID_RANGE,
        });
      }
    }
  });

export type ProjectFormValues = z.infer<typeof formSchema>;

interface UseProjectFormReturn {
  form: UseFormReturn<ProjectFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ProjectFormValues>>;
  isLoading: boolean;
}

interface UseProjectFormProps {
  prefilledData?: FetchProjectQuery['project'];
  id?: number;
  templates: DocumentTemplateType[];
}

const defaultValues: ProjectFormValues = {
  name: '',
  phase: ProjectPhaseChoice.PRE_SIGNED,
  status: StatusEnum.WAITING,
  hoursEstimated: '',
  platforms: [],
  startDate: null,
  endDate: null,
  design: '',
  roadmap: '',
  notes: '',
  documentTemplate: [],
  clientTeam: [],
};

export function useProjectForm({
  prefilledData,
  id,
  templates,
}: UseProjectFormProps): UseProjectFormReturn {
  const form = useForm<ProjectFormValues>({
    defaultValues,
    values: prefilledData ? transformProjectPrefilledData(prefilledData) : undefined,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate();

  const templatesIds = useMemo(() => templates?.map(template => template.id), [templates]);

  const templateFields = useMemo(
    () =>
      templates?.map(template => template?.fields?.map(field => ({ value: '', name: field.name }))),
    [templates],
  );

  const documentTemplateList = useMemo(
    () =>
      templateFields?.map((i, index) => {
        return { isOpen: false, templateId: templatesIds[index], templateFields: i };
      }),
    [templateFields, templatesIds],
  );

  useEffect(() => {
    form.setValue('documentTemplate', documentTemplateList as []);
  }, [documentTemplateList, form]);

  const [projectCreateUpdate, { loading: loadingProjectCreateUpdate }] =
    useCreateOrUpdateProjectMutation();

  const [documentGenerate] = useDocumentGenerateMutation();

  const handleSubmit = useCallback(
    (values: ProjectFormValues) => {
      try {
        projectCreateUpdate({
          variables: {
            input: {
              id,
              name: values.name,
              hoursEstimated: +values.hoursEstimated,
              platforms: !isNil(values.platforms) ? (values.platforms as number[]) : undefined,
              startDate: values.startDate
                ? formatISO(values.startDate, { representation: 'date' })
                : null,
              endDate: values.endDate
                ? formatISO(values.endDate, { representation: 'date' })
                : null,
              design: values.design,
              roadmap: values.roadmap,
              notes: values.notes,
              phase: ProjectPhaseChoice.PRE_SIGNED,
              status: values.status,
              clientTeam: values.clientTeam ?? [],
            },
          },
          refetchQueries: [FetchProjectDocument],
        }).then(response => {
          const newProjectId = response.data?.projectCreateUpdate.id as number;
          const isEmptyDocsList = !!values.documentTemplate.filter(template => template.isOpen)
            .length;

          navigate(
            generatePath(ROUTES.PROJECT_DETAILS, {
              id: id || newProjectId,
            }),
          );

          if (!id && isEmptyDocsList) {
            const documentGenerateValues = values.documentTemplate
              .filter(template => !!template.isOpen)
              .map(({ templateId, templateFields }) => ({
                projectId: newProjectId,
                templateId: templateId as number,
                fields: templateFields,
              }));

            toast.promise(
              documentGenerate({
                variables: {
                  input: documentGenerateValues,
                },
              }),
              {
                loading: 'Generating documents...',
                success: 'Documents generation is successful',
                error: e => {
                  const errors = getGqlError(e?.graphQLErrors);
                  return `Error while generating project documents: ${JSON.stringify(errors)}`;
                },
              },
            );
          }
        });
      } catch (e) {
        processGqlErrorResponse<ProjectFormValues>(e, {
          fields: ['name', 'startDate', 'endDate', 'design', 'roadmap', 'notes'],
          setFormError: form.setError,
        });
      }
    },
    [documentGenerate, form.setError, id, navigate, projectCreateUpdate],
  );

  return useMemo(
    () => ({
      form,
      handleSubmit: form.handleSubmit(handleSubmit),
      isLoading: loadingProjectCreateUpdate,
    }),
    [form, handleSubmit, loadingProjectCreateUpdate],
  );
}
