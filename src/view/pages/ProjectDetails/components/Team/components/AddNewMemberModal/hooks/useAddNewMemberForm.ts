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
  user: z.string().refine(value => value !== '', formErrors.REQUIRED),
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
}

const defaultValues: AddNewMemberFormValues = {
  user: '',
};

export function useAddNewMemberForm({
  onSubmitSuccessful,
  projectId,
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
              currentTeam: true,
              projectId,
              userId: +values.user,
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
    [addProjectMember, form.setError, onSubmitSuccessful, projectId],
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
