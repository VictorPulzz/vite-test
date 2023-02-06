import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

const formSchema = z.object({
  environment: z.string(),
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

type RequestNewEnvironmentFormValues = z.infer<typeof formSchema>;

interface UseRequestNewEnvironmentFormReturn {
  form: UseFormReturn<RequestNewEnvironmentFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<RequestNewEnvironmentFormValues>>;
}

interface UseRequestNewEnvironmentFormProps {
  onSubmitSuccessful?: () => void;
}

const defaultValues: RequestNewEnvironmentFormValues = {
  environment: '',
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
  // const [requestNewEnvironment] = useRequestNewEnvironmentMutation();

  const handleSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (values: RequestNewEnvironmentFormValues) => {
      try {
        // await requestNewEnvironment({
        //   variables: {
        //     input: {
        //       environment: values.environment,
        //     },
        //   },
        // });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<RequestNewEnvironmentFormValues>(e, {
          fields: ['environment'],
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
