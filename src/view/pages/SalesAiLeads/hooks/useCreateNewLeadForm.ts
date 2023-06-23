import { getErrorData } from '@appello/common/lib/services/rtkQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { useCreateLeadMutation } from '~/services/rtk/lead';
import { processApiError } from '~/utils/processApiError';

const formSchema = z.object({
  name: z.string().min(1),
  about: z.string().min(1),
});

type CreateNewLeadFormValues = z.infer<typeof formSchema>;

interface UseCreateNewLeadFormProps {
  onSubmitSuccessful?: () => void;
}

interface UseCreateNewLeadFormReturn {
  form: UseFormReturn<CreateNewLeadFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<CreateNewLeadFormValues>>;
  resetForm?(): void;
}

const defaultValues: CreateNewLeadFormValues = {
  name: '',
  about: '',
};

export function useCreateNewLeadForm({
  onSubmitSuccessful,
}: UseCreateNewLeadFormProps): UseCreateNewLeadFormReturn {
  const form = useForm<CreateNewLeadFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [createLead] = useCreateLeadMutation();

  const handleSubmit = useCallback(
    async (values: CreateNewLeadFormValues) => {
      try {
        await createLead(values).unwrap();
        onSubmitSuccessful?.();
      } catch (e) {
        processApiError<CreateNewLeadFormValues>({
          errors: getErrorData(e),
          fields: ['name', 'about'],
          setFieldError: (name, message) => form.setError(name, { message }),
        });
      }
    },
    [createLead, form, onSubmitSuccessful],
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
