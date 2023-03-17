import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import { useForgotPasswordMutation } from '../__generated__/schema';

const formSchema = z.object({
  email: z.string().email().min(1),
});

type ForgotPasswordFormValues = z.infer<typeof formSchema>;

interface UseForgotPasswordFormReturn {
  form: UseFormReturn<ForgotPasswordFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ForgotPasswordFormValues>>;
}

interface UseForgotPasswordFormProps {
  onSubmitSuccessful?: () => void;
}

const defaultValues: ForgotPasswordFormValues = {
  email: '',
};

export function useForgotPasswordForm({
  onSubmitSuccessful,
}: UseForgotPasswordFormProps = {}): UseForgotPasswordFormReturn {
  const [forgotPassword] = useForgotPasswordMutation({ onCompleted: onSubmitSuccessful });

  const form = useForm<ForgotPasswordFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = useCallback(
    async (values: ForgotPasswordFormValues) => {
      try {
        await forgotPassword({
          variables: {
            input: {
              email: values.email,
            },
          },
        });
        toast.success('Check your email for a password reset link', { duration: 5000 });
      } catch (e) {
        processGqlErrorResponse<ForgotPasswordFormValues>(e, {
          fields: ['email'],
          setFormError: form.setError,
        });
      }
    },
    [forgotPassword, form],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
