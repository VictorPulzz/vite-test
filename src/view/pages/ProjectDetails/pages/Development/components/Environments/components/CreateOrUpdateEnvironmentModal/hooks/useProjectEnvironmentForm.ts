import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { ProjectEnvironmentChoice } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import {
  FetchProjectEnvironmentQuery,
  FetchProjectEnvironmentsListDocument,
  useCreateOrUpdateNewProjectEnvironmentMutation,
} from '../../../../../../../__generated__/schema';
import { transformProjectEnvironmentPrefilledData } from '../utils';

const formSchema = z.object({
  environment: z
    .nativeEnum(ProjectEnvironmentChoice)
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
  frontendCredentials: z.object({
    url: z.string(),
    login: z.string(),
    password: z.string(),
  }),
  backendCredentials: z.object({
    url: z.string(),
    login: z.string(),
    password: z.string(),
  }),
});

export type ProjectEnvironmentFormValues = z.infer<typeof formSchema>;

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
  environment: null,
  frontendCredentials: {
    url: '',
    login: '',
    password: '',
  },
  backendCredentials: {
    url: '',
    login: '',
    password: '',
  },
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
              frontendCredentials: {
                url: values.frontendCredentials.url,
                login: values.frontendCredentials.login,
                password: values.frontendCredentials.password,
              },
              backendCredentials: {
                url: values.backendCredentials.url,
                login: values.backendCredentials.login,
                password: values.backendCredentials.password,
              },
            },
          },
          refetchQueries: [FetchProjectEnvironmentsListDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<ProjectEnvironmentFormValues>(e, {
          fields: ['environment', 'frontendCredentials.url', 'backendCredentials.url'],
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
