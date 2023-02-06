import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

const formSchema = z.object({
  name: z.string(),
  credentials: z.object({
    login: z.string(),
    password: z.string(),
    devApiKey: z.string(),
    prodApiKey: z.string(),
  }),
});

type RequestNewIntegrationFormValues = z.infer<typeof formSchema>;

interface UseRequestNewIntegrationFormReturn {
  form: UseFormReturn<RequestNewIntegrationFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<RequestNewIntegrationFormValues>>;
}

interface UseRequestNewIntegrationFormProps {
  onSubmitSuccessful?: () => void;
}

const defaultValues: RequestNewIntegrationFormValues = {
  name: '',
  credentials: {
    login: '',
    password: '',
    devApiKey: '',
    prodApiKey: '',
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
  // const [requestNewIntegration] = useRequestNewIntegrationMutation();

  const handleSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (values: RequestNewIntegrationFormValues) => {
      try {
        // await requestNewIntegration({
        //   variables: {
        //     input: {
        //       name: values.name,
        //     },
        //   },
        // });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<RequestNewIntegrationFormValues>(e, {
          fields: ['name'],
          setFormError: form.setError,
        });
      }
    },
    [form.setError, onSubmitSuccessful],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
