import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import {
  FetchProjectIntegrationsListDocument,
  useRequestNewProjectIntegrationMutation,
} from '../__generated__/schema';

const formSchema = z.object({
  name: z.string(),
  credentials: z.object({
    name: z.string(),
    url: z.string(),
    login: z.string(),
    password: z.string(),
    key: z.string(),
  }),
});

type RequestNewIntegrationFormValues = z.infer<typeof formSchema>;

interface UseRequestNewIntegrationFormReturn {
  form: UseFormReturn<RequestNewIntegrationFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<RequestNewIntegrationFormValues>>;
  resetForm?(): void;
}

interface UseRequestNewIntegrationFormProps {
  onSubmitSuccessful?(): void;
}

const defaultValues: RequestNewIntegrationFormValues = {
  name: '',
  credentials: {
    name: '',
    url: '',
    login: '',
    password: '',
    key: '',
  },
};

export function useRequestNewIntegrationForm({
  onSubmitSuccessful,
}: UseRequestNewIntegrationFormProps): UseRequestNewIntegrationFormReturn {
  const form = useForm<RequestNewIntegrationFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const params = useParams();
  const projectId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const [requestNewProjectIntegration] = useRequestNewProjectIntegrationMutation();

  const handleSubmit = useCallback(
    async (values: RequestNewIntegrationFormValues) => {
      try {
        await requestNewProjectIntegration({
          variables: {
            input: {
              projectId,
              name: values.name,
              credentials: [
                {
                  name: values.credentials.name,
                  url: values.credentials.url,
                  login: values.credentials.login,
                  password: values.credentials.password,
                  key: values.credentials.key,
                },
              ],
            },
          },
          refetchQueries: [FetchProjectIntegrationsListDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<RequestNewIntegrationFormValues>(e, {
          fields: ['name'],
          setFormError: form.setError,
        });
      }
    },
    [form.setError, onSubmitSuccessful, projectId, requestNewProjectIntegration],
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
