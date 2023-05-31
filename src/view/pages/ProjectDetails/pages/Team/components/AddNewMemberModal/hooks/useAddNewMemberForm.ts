import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import {
  FetchProjectMembersDocument,
  useAddProjectMemberMutation,
} from '../../../../../__generated__/schema';

const formSchema = z.object({
  user: z
    .number()
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
});

type AddNewMemberFormValues = z.infer<typeof formSchema>;

interface UseAddNewMemberFormReturn {
  form: UseFormReturn<AddNewMemberFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<AddNewMemberFormValues>>;
  resetForm?: () => void;
}

interface UseAddNewMemberFormProps {
  onSubmitSuccessful?: () => void;
  projectId: number;
  isCurrentTeam: boolean;
}

const defaultValues: AddNewMemberFormValues = {
  user: null,
};

export function useAddNewMemberForm({
  onSubmitSuccessful,
  projectId,
  isCurrentTeam,
}: UseAddNewMemberFormProps): UseAddNewMemberFormReturn {
  const form = useForm<AddNewMemberFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const [addProjectMember] = useAddProjectMemberMutation();

  const handleSubmit = useCallback(
    async (values: AddNewMemberFormValues) => {
      try {
        await addProjectMember({
          variables: {
            input: {
              projectId,
              currentTeam: isCurrentTeam,
              userId: Number(values.user),
            },
          },
          refetchQueries: [FetchProjectMembersDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<AddNewMemberFormValues>(e, {
          fields: ['user'],
          setFormError: form.setError,
        });
      }
    },
    [addProjectMember, form.setError, isCurrentTeam, onSubmitSuccessful, projectId],
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
