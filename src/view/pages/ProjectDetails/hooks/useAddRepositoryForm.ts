import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

const formSchema = z.object({
  platform: z.string(),
  type: z.string(),
});

type AddRepositoryFormValues = z.infer<typeof formSchema>;

interface UseAddRepositoryFormReturn {
  form: UseFormReturn<AddRepositoryFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<AddRepositoryFormValues>>;
}

interface UseAddRepositoryFormProps {
  onSubmitSuccessful?: () => void;
}

const defaultValues: AddRepositoryFormValues = {
  platform: '',
  type: '',
};

export function useAddRepositoryForm({
  onSubmitSuccessful,
}: UseAddRepositoryFormProps): UseAddRepositoryFormReturn {
  const form = useForm<AddRepositoryFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  // const [requestNewRepository] = useRequestNewRepositoryMutation();

  const handleSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (values: AddRepositoryFormValues) => {
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
        processGqlErrorResponse<AddRepositoryFormValues>(e, {
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
