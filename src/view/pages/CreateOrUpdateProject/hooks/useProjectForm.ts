import { isNil } from '@appello/common';
import { getGqlError } from '@appello/services/dist/gql';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from 'date-fns';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import toast from 'react-hot-toast';
import { generatePath, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { ROUTES } from '~/constants/routes';
import { ProjectPhaseChoice } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { numberValidation } from '~/utils/validations';
import { useGenerateProjectDocumentMutation } from '~/view/components/Docs/__generated__/schema';
import { transformProjectPrefilledData } from '~/view/pages/CreateOrUpdateProject/utils';

import {
  FetchProjectInfoDocument,
  FetchProjectPreviewDocument,
  FetchProjectStatsDocument,
} from '../../ProjectDetails/__generated__/schema';
import {
  FetchDocumentTemplateListQuery,
  FetchProjectDocument,
  FetchProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from '../__generated__/schema';

const formSchema = z
  .object({
    name: z.string().min(1),
    phase: z.nativeEnum(ProjectPhaseChoice),
    status: z.number().nullable(),
    hoursEstimated: z.string().and(numberValidation),
    platforms: z.array(z.number()),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
    design: z.string(),
    roadmap: z.string(),
    kanbanBoard: z.string(),
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
  templates: FetchDocumentTemplateListQuery['documentTemplateList']['results'];
}

const defaultValues: ProjectFormValues = {
  name: '',
  phase: ProjectPhaseChoice.PRE_SIGNED,
  status: null,
  hoursEstimated: '',
  platforms: [],
  startDate: null,
  endDate: null,
  design: '',
  roadmap: '',
  kanbanBoard: '',
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

  const isEditMode = !!id;
  const navigate = useNavigate();

  useEffect(() => {
    const documentTemplateList = templates?.map(template => {
      return {
        isOpen: false,
        templateId: template.id,
        templateFields: template?.fields?.map(field => ({ value: '', name: field.name })),
      };
    });

    form.setValue('documentTemplate', documentTemplateList as []);
  }, [form, templates]);

  const [projectCreate, { loading: loadingProjectCreate }] = useCreateProjectMutation();
  const [projectUpdate, { loading: loadingProjectUpdate }] = useUpdateProjectMutation();

  const [generateProjectDocument] = useGenerateProjectDocumentMutation();

  const handleSubmit = useCallback(
    async (values: ProjectFormValues) => {
      try {
        if (isEditMode) {
          await projectUpdate({
            variables: {
              input: {
                id,
                name: values.name,
                hoursEstimated: +values.hoursEstimated,
                platforms: !isNil(values.platforms) ? values.platforms ?? [] : undefined,
                statusId: values.status,
                startDate: values.startDate
                  ? formatISO(values.startDate, { representation: 'date' })
                  : null,
                endDate: values.endDate
                  ? formatISO(values.endDate, { representation: 'date' })
                  : null,
                design: values.design,
                roadmap: values.roadmap,
                kanbanBoard: values.kanbanBoard,
                notes: values.notes,
                phase: values.phase,
                clientTeam: values.clientTeam ?? [],
              },
            },
            refetchQueries: [
              FetchProjectPreviewDocument,
              FetchProjectDocument,
              FetchProjectStatsDocument,
              FetchProjectInfoDocument,
            ],
          });

          navigate(
            generatePath(ROUTES.PROJECT_DETAILS, {
              id,
            }),
          );
        } else {
          const { data } = await projectCreate({
            variables: {
              input: {
                name: values.name,
                hoursEstimated: +values.hoursEstimated,
                platforms: !isNil(values.platforms) ? values.platforms ?? [] : undefined,
                statusId: values.status,
                notes: values.notes,
                phase: values.phase,
                clientTeam: values.clientTeam ?? [],
              },
            },
            refetchQueries: [FetchProjectDocument, FetchProjectStatsDocument],
          });

          const newProjectId = data?.projectCreate.id as number;
          const isDocsList = !!values.documentTemplate.filter(template => template.isOpen).length;

          navigate(
            generatePath(ROUTES.PROJECT_DETAILS, {
              id: newProjectId,
            }),
          );

          if (isDocsList) {
            const documentGenerateValues = values.documentTemplate
              .filter(template => !!template.isOpen)
              .map(({ templateId, templateFields }) => ({
                projectId: newProjectId,
                templateId: templateId as number,
                fields: templateFields,
              }));

            toast.promise(
              generateProjectDocument({
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
        }
      } catch (e) {
        processGqlErrorResponse<ProjectFormValues>(e, {
          fields: ['name', 'startDate', 'endDate', 'design', 'roadmap', 'kanbanBoard', 'notes'],
          setFormError: form.setError,
        });
      }
    },
    [
      form.setError,
      generateProjectDocument,
      id,
      isEditMode,
      navigate,
      projectCreate,
      projectUpdate,
    ],
  );

  return useMemo(
    () => ({
      form,
      handleSubmit: form.handleSubmit(handleSubmit),
      isLoading: loadingProjectCreate || loadingProjectUpdate,
    }),
    [form, handleSubmit, loadingProjectCreate, loadingProjectUpdate],
  );
}
