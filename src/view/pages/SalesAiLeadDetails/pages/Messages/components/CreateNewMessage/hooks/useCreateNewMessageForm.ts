import { getErrorData } from '@appello/common/lib/services/rtkQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { useCreateMessageMutation } from '~/services/rtk/lead';
import { CreateMessageRequest } from '~/services/rtk/lead/types';
import { processApiError } from '~/utils/processApiError';

const formSchema = z.object({
  promptId: z.string(),
  promptText: z.string().min(1),
});

type CreateNewMessageFormValues = z.infer<typeof formSchema>;

interface UseCreateNewMessageFormReturn {
  form: UseFormReturn<CreateNewMessageFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<CreateNewMessageFormValues>>;
  resetForm?(): void;
}

const defaultValues: CreateNewMessageFormValues = {
  promptId: '',
  promptText: '',
};

export function useCreateNewMessageForm(): UseCreateNewMessageFormReturn {
  const params = useParams();
  const leadId = useMemo(() => (params.id ? String(params.id) : ''), [params.id]);

  const form = useForm<CreateNewMessageFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [createMessage] = useCreateMessageMutation();

  const handleSubmit = useCallback(
    async (values: CreateNewMessageFormValues) => {
      try {
        await createMessage({
          id: `${leadId}`,
          promptText: values.promptText,
        }).unwrap();
      } catch (e) {
        processApiError<CreateMessageRequest>({
          errors: getErrorData(e),
          fields: ['promptText'],
        });
      }
    },
    [createMessage, leadId],
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
