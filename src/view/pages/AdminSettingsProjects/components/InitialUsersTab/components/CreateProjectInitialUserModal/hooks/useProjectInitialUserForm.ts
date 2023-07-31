import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import {
  FetchProjectInitialUsersListDocument,
  useCreateProjectInitialUserMutation,
} from '../../../../../__generated__/schema';

const formSchema = z.object({
  userId: z
    .number()
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
});

export type ProjectInitialUserFormValues = z.infer<typeof formSchema>;

interface UseProjectInitialUserFormReturn {
  form: UseFormReturn<ProjectInitialUserFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ProjectInitialUserFormValues>>;
  resetForm?(): void;
  isLoading: boolean;
}

interface UseProjectInitialFormProps {
  onSubmitSuccessful?(): void;
}

const defaultValues: ProjectInitialUserFormValues = {
  userId: null,
};

export function useProjectInitialUserForm({
  onSubmitSuccessful,
}: UseProjectInitialFormProps): UseProjectInitialUserFormReturn {
  const form = useForm<ProjectInitialUserFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [createProjectInitialUser, { loading }] = useCreateProjectInitialUserMutation();

  const handleSubmit = useCallback(
    async (values: ProjectInitialUserFormValues) => {
      try {
        await createProjectInitialUser({
          variables: {
            input: {
              userId: Number(values.userId),
            },
          },
          refetchQueries: [FetchProjectInitialUsersListDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<ProjectInitialUserFormValues>(e, {
          fields: ['userId'],
          setFormError: form.setError,
        });
      }
    },
    [createProjectInitialUser, form.setError, onSubmitSuccessful],
  );

  return useMemo(
    () => ({
      form,
      handleSubmit: form.handleSubmit(handleSubmit),
      resetForm: () => form.reset(defaultValues),
      isLoading: loading,
    }),
    [form, handleSubmit, loading],
  );
}
