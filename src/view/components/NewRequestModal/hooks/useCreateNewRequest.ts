import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from 'date-fns';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import {
  ProjectEnvironmentChoice,
  RepositoryAccessLevelChoice,
  RepositoryTypeChoice,
  RequestTypeChoice,
} from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import {
  FetchEnvsRequestsListDocument,
  FetchIntegrationsRequestsListDocument,
  FetchReposRequestsListDocument,
} from '~/view/pages/ProjectDetails/__generated__/schema';

import { FetchRequestsListDocument } from '../../../pages/Requests/__generated__/schema';
import { useCreateRequestMutation } from '../__generated__/schema';

const formSchema = z
  .object({
    type: z
      .nativeEnum(RequestTypeChoice)
      .nullable()
      .refine(value => value !== null, formErrors.REQUIRED),
    assignedRoleId: z
      .number()
      .nullable()
      .refine(value => value !== null, formErrors.REQUIRED),
    assignedToId: z.number().nullable(),
    dueDate: z.date().nullable(),
    description: z.string(),
    projectId: z.number().nullable(),
    repositoryId: z.number().nullable(),
    accessLevel: z.nativeEnum(RepositoryAccessLevelChoice).nullable(),
    repositoryType: z.nativeEnum(RepositoryTypeChoice).nullable(),
    technologies: z.array(z.number()),
    environment: z.nativeEnum(ProjectEnvironmentChoice).nullable(),
    integrationName: z.string(),
  })
  .superRefine((value, ctx) => {
    if (value.type === RequestTypeChoice.ACCESS_PROJECT) {
      if (value.projectId === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: formErrors.REQUIRED,
          path: ['projectId'],
        });
      }
    }
    if (value.type === RequestTypeChoice.ACCESS_REPOSITORY) {
      const additionalFields = [
        { value: value.projectId, title: 'projectId' },
        { value: value.repositoryId, title: 'repositoryId' },
        { value: value.accessLevel, title: 'accessLevel' },
      ];
      additionalFields.forEach(field => {
        if (field.value === null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: formErrors.REQUIRED,
            path: [field.title],
          });
        }
      });
    }
    if (value.type === RequestTypeChoice.CREATION_ENVIRONMENT) {
      const additionalFields = [
        { value: value.projectId, title: 'projectId' },
        { value: value.environment, title: 'environment' },
      ];
      additionalFields.forEach(field => {
        if (field.value === null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: formErrors.REQUIRED,
            path: [field.title],
          });
        }
      });
    }
    if (value.type === RequestTypeChoice.CREATION_INTEGRATION) {
      const additionalFields = [
        { value: value.projectId, title: 'projectId' },
        { value: value.integrationName, title: 'integrationName' },
      ];
      additionalFields.forEach(field => {
        if (field.value === null || field.value === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: formErrors.REQUIRED,
            path: [field.title],
          });
        }
      });
    }
    if (value.type === RequestTypeChoice.CREATION_REPOSITORY) {
      const additionalFields = [
        { value: value.projectId, title: 'projectId' },
        { value: value.repositoryType, title: 'repositoryType' },
        { value: value.technologies, title: 'technologies', length: value.technologies.length },
      ];
      additionalFields.forEach(field => {
        if (field.value === null || field.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: formErrors.REQUIRED,
            path: [field.title],
          });
        }
      });
    }
  });

type CreateNewRequestFormValues = z.infer<typeof formSchema>;

interface UseCreateNewRequestFormReturn {
  form: UseFormReturn<CreateNewRequestFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<CreateNewRequestFormValues>>;
  resetForm?: () => void;
}

interface UseCreateNewRequestFormProps {
  onSubmitSuccessful?: () => void;
  repositoryId?: number;
}

const defaultValues: CreateNewRequestFormValues = {
  type: null,
  assignedRoleId: null,
  assignedToId: null,
  dueDate: null,
  description: '',
  projectId: null,
  repositoryId: null,
  accessLevel: null,
  repositoryType: null,
  technologies: [],
  environment: null,
  integrationName: '',
};

export function useCreateNewRequestForm({
  onSubmitSuccessful,
  repositoryId,
}: UseCreateNewRequestFormProps): UseCreateNewRequestFormReturn {
  const form = useForm<CreateNewRequestFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const typeField = form.watch('type');

  useEffect(() => {
    if (typeField === RequestTypeChoice.ACCESS_REPOSITORY && repositoryId) {
      form.setValue('repositoryId', repositoryId);
    } else {
      form.setValue('repositoryId', null);
    }
    form.setValue('accessLevel', null);
    form.setValue('repositoryType', null);
    form.setValue('technologies', []);
    form.setValue('environment', null);
    form.setValue('integrationName', '');
  }, [form, repositoryId, typeField]);

  const [createRequest] = useCreateRequestMutation();

  const handleSubmit = useCallback(
    async (values: CreateNewRequestFormValues) => {
      try {
        await createRequest({
          variables: {
            input: {
              ...values,
              type: values.type as RequestTypeChoice,
              assignedRoleId: Number(values.assignedRoleId),
              projectId: Number(values.projectId),
              dueDate: values.dueDate
                ? formatISO(values.dueDate, { representation: 'date' })
                : null,
            },
          },
          refetchQueries: [
            FetchRequestsListDocument,
            FetchReposRequestsListDocument,
            FetchEnvsRequestsListDocument,
            FetchIntegrationsRequestsListDocument,
          ],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<CreateNewRequestFormValues>(e, {
          fields: ['description', 'integrationName'],
          setFormError: form.setError,
        });
      }
    },
    [createRequest, form.setError, onSubmitSuccessful],
  );

  return useMemo(
    () => ({
      form,
      handleSubmit: form.handleSubmit(handleSubmit),
      resetForm: () => form.reset(defaultValues),
    }),
    [form, handleSubmit],
  );
}
