import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

const formSchema = z.object({
  platform: z.string(),
  type: z.string(),
});

type RequestNewRepositoryFormValues = z.infer<typeof formSchema>;

interface UseRequestNewRepositoryFormReturn {
  form: UseFormReturn<RequestNewRepositoryFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<RequestNewRepositoryFormValues>>;
}

interface UseRequestNewRepositoryFormProps {
  onSubmitSuccessful?: () => void;
}

const defaultValues: RequestNewRepositoryFormValues = {
  platform: '',
  type: '',
};

export function useRequestNewRepositoryForm({
  onSubmitSuccessful,
}: UseRequestNewRepositoryFormProps): UseRequestNewRepositoryFormReturn {
  const form = useForm<RequestNewRepositoryFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  // const [requestNewRepository] = useRequestNewRepositoryMutation();

  const handleSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (values: RequestNewRepositoryFormValues) => {
      try {
        // await requestNewRepository({
        //   variables: {
        //     input: {
        //       platform: values.platform,
        //       type: values.type,
        //     },
        //   },
        // });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<RequestNewRepositoryFormValues>(e, {
          fields: ['platform', 'type'],
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
