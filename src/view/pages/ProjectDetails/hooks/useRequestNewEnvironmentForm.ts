import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { ProjectEnvironmentChoice } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import {
  FetchProjectEnvironmentsListDocument,
  useRequestNewProjectEnvironmentMutation,
} from '../__generated__/schema';

const formSchema = z.object({
  environment: z
    .nativeEnum(ProjectEnvironmentChoice)
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
  frontendCredentials: z.object({
    url: z.string().refine(value => value !== '', formErrors.REQUIRED),
    login: z.string().refine(value => value !== '', formErrors.REQUIRED),
    password: z.string().refine(value => value !== '', formErrors.REQUIRED),
  }),
  backendCredentials: z.object({
    url: z.string().refine(value => value !== '', formErrors.REQUIRED),
    login: z.string().refine(value => value !== '', formErrors.REQUIRED),
    password: z.string().refine(value => value !== '', formErrors.REQUIRED),
  }),
});

type RequestNewEnvironmentFormValues = z.infer<typeof formSchema>;

interface UseRequestNewEnvironmentFormReturn {
  form: UseFormReturn<RequestNewEnvironmentFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<RequestNewEnvironmentFormValues>>;
  resetForm?: () => void;
}

interface UseRequestNewEnvironmentFormProps {
  onSubmitSuccessful?: () => void;
}

const defaultValues: RequestNewEnvironmentFormValues = {
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

export function useRequestNewEnvironmentForm({
  onSubmitSuccessful,
}: UseRequestNewEnvironmentFormProps): UseRequestNewEnvironmentFormReturn {
  const form = useForm<RequestNewEnvironmentFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const params = useParams();
  const projectId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const [requestNewProjectEnvironment] = useRequestNewProjectEnvironmentMutation();

  const handleSubmit = useCallback(
    async (values: RequestNewEnvironmentFormValues) => {
      try {
        await requestNewProjectEnvironment({
          variables: {
            input: {
              projectId,
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
        processGqlErrorResponse<RequestNewEnvironmentFormValues>(e, {
          fields: ['environment'],
          setFormError: form.setError,
        });
      }
    },
    [form.setError, onSubmitSuccessful, projectId, requestNewProjectEnvironment],
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
