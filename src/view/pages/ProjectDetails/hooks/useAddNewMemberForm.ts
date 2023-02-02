import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

const formSchema = z.object({
  user: z.string(),
});

type AddNewMemberFormValues = z.infer<typeof formSchema>;

interface UseAddNewMemberFormReturn {
  form: UseFormReturn<AddNewMemberFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<AddNewMemberFormValues>>;
}

interface UseAddNewMemberFormProps {
  onSubmitSuccessful?: () => void;
}

const defaultValues: AddNewMemberFormValues = {
  user: '',
};

export function useAddNewMemberForm({
  onSubmitSuccessful,
}: UseAddNewMemberFormProps): UseAddNewMemberFormReturn {
  const form = useForm<AddNewMemberFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  // const [addProjectParticipant] = useAddProjectParticipantMutation();

  const handleSubmit = useCallback(
    async (values: AddNewMemberFormValues) => {
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
        processGqlErrorResponse<AddNewMemberFormValues>(e, {
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
