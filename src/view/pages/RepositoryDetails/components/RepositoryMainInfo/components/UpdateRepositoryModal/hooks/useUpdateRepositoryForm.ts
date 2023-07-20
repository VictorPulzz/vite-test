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
} from '~/view/pages/RepositoryDetails/__generated__/schema';

import { transformRepositoryPrefilledData } from '../utils';

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .refine(value => value !== '', formErrors.REQUIRED),
  technologies: z.array(z.number()).refine(value => value.length !== 0, formErrors.REQUIRED),
});

export type UpdateRepositoryFormValues = z.infer<typeof formSchema>;

interface UseUpdateRepositoryFormReturn {
  form: UseFormReturn<UpdateRepositoryFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<UpdateRepositoryFormValues>>;
  resetForm?: () => void;
}

interface UseUpdateRepositoryFormProps {
  onSubmitSuccessful?: () => void;
  repository: FetchRepositoryDetailsQuery['repository'];
}

const defaultValues: UpdateRepositoryFormValues = {
  name: '',
  technologies: [],
};

export function useUpdateRepositoryForm({
  onSubmitSuccessful,
  repository,
}: UseUpdateRepositoryFormProps): UseUpdateRepositoryFormReturn {
  const form = useForm<UpdateRepositoryFormValues>({
    defaultValues,
    values: repository ? transformRepositoryPrefilledData(repository) : undefined,
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
          fields: ['name', 'technologies'],
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
    [form, handleSubmit],
  );
}
