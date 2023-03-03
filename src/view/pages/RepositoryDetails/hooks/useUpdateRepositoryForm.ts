import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import {
  FetchRepositoryDetailsDocument,
  FetchRepositoryDetailsQuery,
  useUpdateRepositoryMutation,
} from '../__generated__/schema';

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .refine(value => value !== '', formErrors.REQUIRED),
});

type UpdateRepositoryFormValues = z.infer<typeof formSchema>;

interface UseUpdateRepositoryFormReturn {
  form: UseFormReturn<UpdateRepositoryFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<UpdateRepositoryFormValues>>;
  resetForm?: () => void;
}

interface UseUpdateRepositoryFormProps {
  onSubmitSuccessful?: () => void;
  repository: FetchRepositoryDetailsQuery['repository'];
}

export function useUpdateRepositoryForm({
  onSubmitSuccessful,
  repository,
}: UseUpdateRepositoryFormProps): UseUpdateRepositoryFormReturn {
  const defaultValues = useMemo(() => {
    return { name: repository.name ?? '' };
  }, [repository.name]);

  const form = useForm<UpdateRepositoryFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const [updateRepository] = useUpdateRepositoryMutation();

  const handleSubmit = useCallback(
    async (values: UpdateRepositoryFormValues) => {
      try {
        await updateRepository({
          variables: {
            input: {
              id: repository.id,
              ...values,
            },
          },
          refetchQueries: [FetchRepositoryDetailsDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<UpdateRepositoryFormValues>(e, {
          fields: ['name'],
          setFormError: form.setError,
        });
      }
    },
    [form.setError, onSubmitSuccessful, repository.id, updateRepository],
  );

  return useMemo(
    () => ({
      form,
      handleSubmit: form.handleSubmit(handleSubmit),
      resetForm: () => form.reset(defaultValues),
    }),
    [defaultValues, form, handleSubmit],
  );
}
