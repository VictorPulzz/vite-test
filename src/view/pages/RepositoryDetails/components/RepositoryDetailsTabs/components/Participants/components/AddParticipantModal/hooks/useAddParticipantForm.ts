import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { RepositoryAccessLevelChoice } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import {
  FetchRepositoryParticipantsDocument,
  useAddOrUpdateRepositoryParticipantMutation,
} from '~/view/pages/RepositoryDetails/__generated__/schema';

const formSchema = z.object({
  user: z
    .number()
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
  accessLevel: z
    .nativeEnum(RepositoryAccessLevelChoice)
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
});

type AddParticipantFormValues = z.infer<typeof formSchema>;

interface UseAddParticipantFormReturn {
  form: UseFormReturn<AddParticipantFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<AddParticipantFormValues>>;
  resetForm?(): void;
}

interface UseAddParticipantFormProps {
  onSubmitSuccessful?(): void;
  repositoryId: number;
}

const defaultValues: AddParticipantFormValues = {
  user: null,
  accessLevel: null,
};

export function useAddParticipantForm({
  onSubmitSuccessful,
  repositoryId,
}: UseAddParticipantFormProps): UseAddParticipantFormReturn {
  const form = useForm<AddParticipantFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const [addRepositoryParticipant] = useAddOrUpdateRepositoryParticipantMutation();

  const handleSubmit = useCallback(
    async (values: AddParticipantFormValues) => {
      try {
        await addRepositoryParticipant({
          variables: {
            input: {
              userId: Number(values.user),
              accessLevel: values.accessLevel as RepositoryAccessLevelChoice,
              repositoryId,
            },
          },
          refetchQueries: [FetchRepositoryParticipantsDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<AddParticipantFormValues>(e, {
          fields: ['user', 'accessLevel'],
          setFormError: form.setError,
        });
      }
    },
    [addRepositoryParticipant, form.setError, onSubmitSuccessful, repositoryId],
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
