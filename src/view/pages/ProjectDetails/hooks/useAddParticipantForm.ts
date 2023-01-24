import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

const formSchema = z.object({
  user: z.string(),
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
};

export function useAddParticipantForm({
  onSubmitSuccessful,
}: UseAddParticipantFormProps): UseAddParticipantFormReturn {
  const form = useForm<AddParticipantFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  // const [addProjectParticipant] = useAddProjectParticipantMutation();

  const handleSubmit = useCallback(
    async (values: AddParticipantFormValues) => {
      try {
        // eslint-disable-next-line no-console
        console.log('🚀 ~ file: useAddParticipantForm.ts:39 ~ values', values);
        // await addProjectParticipant({
        //   variables: {
        //     input: {
        //       user: values.user,
        //     },
        //   },
        // });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<AddParticipantFormValues>(e, {
          fields: ['user'],
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
