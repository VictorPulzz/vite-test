import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

const formSchema = z.object({
  user: z.string(),
  accessLevel: z.string(),
});

type AddParticipantFormValues = z.infer<typeof formSchema>;

interface UseAddParticipantFormReturn {
  form: UseFormReturn<AddParticipantFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<AddParticipantFormValues>>;
}

interface UseAddParticipantFormProps {
  onSubmitSuccessful?: () => void;
}

const defaultValues: AddParticipantFormValues = {
  user: '',
  accessLevel: '',
};

export function useAddParticipantForm({
  onSubmitSuccessful,
}: UseAddParticipantFormProps): UseAddParticipantFormReturn {
  const form = useForm<AddParticipantFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  // const [addRepositoryParticipant] = useAddRepositoryParticipantMutation();

  const handleSubmit = useCallback(
    async (values: AddParticipantFormValues) => {
      try {
        // eslint-disable-next-line no-console
        console.log('🚀 ~ file: useProjectForm.ts:138 ~ values', values);
        // await addRepositoryParticipant({
        //   variables: {
        //     input: {
        //       user: values.user,
        //       accessLevel: values.accessLevel,
        //     },
        //   },
        // });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<AddParticipantFormValues>(e, {
          fields: ['user', 'accessLevel'],
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
