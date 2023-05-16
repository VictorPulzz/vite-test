import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { RepositoryAccessLevelChoice } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import {
  FetchGitInitialUserDetailsQuery,
  FetchGitInitialUsersListDocument,
  useCreateOrUpdateGitInitialUserMutation,
} from '~/view/pages/AdminSettingsIntegrations/__generated__/schema';

import { transformGitInitialUserPrefilledData } from '../utils';

const formSchema = z.object({
  userId: z
    .number()
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
  accessLevel: z
    .nativeEnum(RepositoryAccessLevelChoice)
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
});

export type GitInitialUserFormValues = z.infer<typeof formSchema>;

interface UseGitInitialUserFormReturn {
  form: UseFormReturn<GitInitialUserFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<GitInitialUserFormValues>>;
  resetForm?(): void;
  isLoading: boolean;
}

interface UseGitInitialUserFormProps {
  onSubmitSuccessful?(): void;
  prefilledData?: FetchGitInitialUserDetailsQuery['gitInitialUserDetails'];
}

const defaultValues: GitInitialUserFormValues = {
  userId: null,
  accessLevel: null,
};

export function useGitInitialUserForm({
  onSubmitSuccessful,
  prefilledData,
}: UseGitInitialUserFormProps): UseGitInitialUserFormReturn {
  const form = useForm<GitInitialUserFormValues>({
    defaultValues,
    values: prefilledData ? transformGitInitialUserPrefilledData(prefilledData) : undefined,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [createOrUpdateGitInitialUser, { loading }] = useCreateOrUpdateGitInitialUserMutation();

  const handleSubmit = useCallback(
    async (values: GitInitialUserFormValues) => {
      try {
        await createOrUpdateGitInitialUser({
          variables: {
            input: {
              userId: Number(values.userId),
              accessLevel: values.accessLevel as RepositoryAccessLevelChoice,
            },
          },
          refetchQueries: [FetchGitInitialUsersListDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<GitInitialUserFormValues>(e, {
          fields: ['userId', 'accessLevel'],
          setFormError: form.setError,
        });
      }
    },
    [createOrUpdateGitInitialUser, form.setError, onSubmitSuccessful],
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
