import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { passwordValidation } from '~/utils/validations';

import { useResetPasswordMutation } from '../__generated__/schema';

const formSchema = z
  .object({
    newPassword: passwordValidation,
    confirmPassword: z.string().min(1),
  })
  .superRefine((value, ctx) => {
    if (value.newPassword !== value.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: formErrors.PASSWORD_MISMATCH,
      });
    }
  });

type ResetPasswordFormValues = z.infer<typeof formSchema>;

interface UseResetPasswordFormReturn {
  form: UseFormReturn<ResetPasswordFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ResetPasswordFormValues>>;
}

interface UseResetPasswordFormProps {
  token: string;
  onSubmitSuccessful?: () => void;
}

const defaultValues: ResetPasswordFormValues = {
  newPassword: '',
  confirmPassword: '',
};

export function useResetPasswordForm({
  token,
  onSubmitSuccessful,
}: UseResetPasswordFormProps): UseResetPasswordFormReturn {
  const [resetPassword] = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = useCallback(
    async (values: ResetPasswordFormValues) => {
      try {
        await resetPassword({
          variables: {
            input: {
              token,
              password: values.confirmPassword,
            },
          },
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<ResetPasswordFormValues>(e, {
          fields: {
            password: 'confirmPassword',
            token: 'confirmPassword',
          },
          setFormError: form.setError,
        });
      }
    },
    [form, onSubmitSuccessful, resetPassword, token],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
