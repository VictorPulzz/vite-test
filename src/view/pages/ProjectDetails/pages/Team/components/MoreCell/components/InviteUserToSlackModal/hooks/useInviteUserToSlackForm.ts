import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import {
  FetchProjectMembersDocument,
  useInviteUserToSlackMutation,
} from '~/view/pages/ProjectDetails/__generated__/schema';

const formSchema = z.object({
  slackChannels: z.array(z.number()),
});

type InviteUserToSlackFormValues = z.infer<typeof formSchema>;

interface UseInviteUserToSlackReturn {
  form: UseFormReturn<InviteUserToSlackFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<InviteUserToSlackFormValues>>;
  resetForm?: () => void;
}

interface UseInviteUserToSlackFormProps {
  onSubmitSuccessful?: () => void;
  userId: number;
  isCurrentTeam: boolean;
  projectId: number;
}

const defaultValues: InviteUserToSlackFormValues = {
  slackChannels: [],
};

export function useInviteUserToSlackForm({
  onSubmitSuccessful,
  userId,
  isCurrentTeam,
  projectId,
}: UseInviteUserToSlackFormProps): UseInviteUserToSlackReturn {
  const form = useForm<InviteUserToSlackFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [inviteUserToSlack] = useInviteUserToSlackMutation();

  const handleSubmit = useCallback(
    async (values: InviteUserToSlackFormValues) => {
      try {
        await inviteUserToSlack({
          variables: {
            input: {
              userId,
              projectId,
              slackChannels: values.slackChannels,
              currentTeam: isCurrentTeam,
            },
          },
          refetchQueries: [FetchProjectMembersDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<InviteUserToSlackFormValues>(e, {
          fields: ['slackChannels'],
          setFormError: form.setError,
        });
      }
    },
    [form.setError, inviteUserToSlack, isCurrentTeam, onSubmitSuccessful, projectId, userId],
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
