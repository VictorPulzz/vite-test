import { getErrorData } from '@appello/common/lib/services/rtkQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { useCreatePromptMutation, useUpdatePromptMutation } from '~/services/rtk/lead';
import { PropmtInfoResponse } from '~/services/rtk/lead/types';
import { processApiError } from '~/utils/processApiError';

const formSchema = z.object({
  name: z.string().min(1),
  promptText: z.string().min(1),
});

type PromptFormFormValues = z.infer<typeof formSchema>;

interface UsePromptFormProps {
  onSubmitSuccessful?: () => void;
  prefilledData?: PropmtInfoResponse;
}

interface UsePromptFormReturn {
  form: UseFormReturn<PromptFormFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<PromptFormFormValues>>;
  resetForm?(): void;
}

const defaultValues: PromptFormFormValues = {
  name: '',
  promptText: '',
};

export function usePromptForm({
  onSubmitSuccessful,
  prefilledData,
}: UsePromptFormProps): UsePromptFormReturn {
  const form = useForm<PromptFormFormValues>({
    defaultValues,
    values: prefilledData
      ? { name: prefilledData.name, promptText: prefilledData.promptText }
      : undefined,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [createPrompt] = useCreatePromptMutation();
  const [updatePrompt] = useUpdatePromptMutation();

  const handleSubmit = useCallback(
    async (values: PromptFormFormValues) => {
      try {
        if (prefilledData) {
          await updatePrompt({ id: prefilledData.id, ...values }).unwrap();
        } else await createPrompt(values).unwrap();
        onSubmitSuccessful?.();
      } catch (e) {
        processApiError<PromptFormFormValues>({
          errors: getErrorData(e),
          fields: ['name', 'promptText'],
          setFieldError: (name, message) => form.setError(name, { message }),
        });
      }
    },
    [createPrompt, form, onSubmitSuccessful, prefilledData, updatePrompt],
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
