import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { FieldPath, useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import {
  ProjectEnvironmentChoice,
  RepositoryTypeChoice,
} from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import {
  FetchProjectEnvironmentQuery,
  FetchProjectEnvironmentsListDocument,
  useCreateOrUpdateNewProjectEnvironmentMutation,
} from '../../../../../../../__generated__/schema';
import { transformProjectEnvironmentPrefilledData } from '../utils';

const formSchema = z.object({
  title: z.string(),
  environment: z
    .nativeEnum(ProjectEnvironmentChoice)
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
  notes: z.string(),
  credentials: z
    .object({
      id: z.union([z.string(), z.number()]),
      type: z
        .nativeEnum(RepositoryTypeChoice)
        .nullable()
        .refine(value => value !== null, formErrors.REQUIRED),
      shortDescription: z.string(),
      url: z.string().min(1),
      login: z.string(),
      password: z.string(),
      isNew: z.boolean(),
    })
    .array(),
  showCredsToEveryContributors: z.boolean(),
});

export type ProjectEnvironmentFormValues = z.infer<typeof formSchema>;

export type ProjectEnvironmentCredentials = FieldPath<
  Pick<ProjectEnvironmentFormValues, 'credentials'>
>[];

interface UseProjectEnvironmentFormReturn {
  form: UseFormReturn<ProjectEnvironmentFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ProjectEnvironmentFormValues>>;
  resetForm?: () => void;
}

interface UseProjectEnvironmentFormProps {
  onSubmitSuccessful?: () => void;
  prefilledData?: FetchProjectEnvironmentQuery['projectEnvironment'];
}

const defaultValues: ProjectEnvironmentFormValues = {
  title: '',
  environment: null,
  notes: '',
  credentials: [],
  showCredsToEveryContributors: true,
};

export function useProjectEnvironmentForm({
  onSubmitSuccessful,
  prefilledData,
}: UseProjectEnvironmentFormProps): UseProjectEnvironmentFormReturn {
  const form = useForm<ProjectEnvironmentFormValues>({
    defaultValues,
    values: prefilledData ? transformProjectEnvironmentPrefilledData(prefilledData) : undefined,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const params = useParams();
  const projectId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const [createOrUpdateNewProjectEnvironment] = useCreateOrUpdateNewProjectEnvironmentMutation();

  const handleSubmit = useCallback(
    async (values: ProjectEnvironmentFormValues) => {
      try {
        await createOrUpdateNewProjectEnvironment({
          variables: {
            input: {
              projectId,
              id: prefilledData?.id,
              name: values.environment as ProjectEnvironmentChoice,
              title: values.title,
              notes: values.notes,
              credentials: values.credentials.map(value => ({
                id: value.isNew ? null : Number(value.id),
                type: value.type as RepositoryTypeChoice,
                shortDescription: value.shortDescription,
                url: value.url,
                login: value.login,
                password: value.password,
              })),
              showCredsToEveryContributors: values.showCredsToEveryContributors,
            },
          },
          refetchQueries: [FetchProjectEnvironmentsListDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        const prepareCredsError = (field: string) =>
          values.credentials.map(
            (_, index) => `credentials.${index}.${field}`,
          ) as ProjectEnvironmentCredentials;

        processGqlErrorResponse<ProjectEnvironmentFormValues>(e, {
          fields: [
            'environment',
            'title',
            'notes',
            ...prepareCredsError('shortDescription'),
            ...prepareCredsError('url'),
            ...prepareCredsError('login'),
            ...prepareCredsError('password'),
          ],
          setFormError: form.setError,
        });
      }
    },
    [
      createOrUpdateNewProjectEnvironment,
      form.setError,
      onSubmitSuccessful,
      prefilledData?.id,
      projectId,
    ],
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
