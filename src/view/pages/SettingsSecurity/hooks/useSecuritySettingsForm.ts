import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { passwordValidation } from '~/utils/validations';

const formSchema = z
  .object({
    oldPassword: z.string().min(1),
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

type ChangePasswordFormValues = z.infer<typeof formSchema>;

const defaultValues: ChangePasswordFormValues = {
  newPassword: '',
  confirmPassword: '',
  oldPassword: '',
};

interface UseChangePasswordFormFormReturn {
  form: UseFormReturn<ChangePasswordFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ChangePasswordFormValues>>;
}

// TODO fix hook when backend will be ready
export const useSecuritySettingsForm = (): UseChangePasswordFormFormReturn => {
  // const [changePassword] = usePasswordChangeMutation();

  const form = useForm<ChangePasswordFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = useCallback(
    async (values: ChangePasswordFormValues) => {
      try {
        // eslint-disable-next-line no-console
        console.log('🚀 ~ file: useSecuritySettingsForm.ts:51 ~ values', values);
        // await changePassword({
        //   variables: {
        //     data: {
        //       oldPassword: values.oldPassword,
        //       newPassword: values.newPassword,
        //     },
        //   },
        // });
        toast('Password changed');
        form.reset(defaultValues);
      } catch (e) {
        processGqlErrorResponse<ChangePasswordFormValues>(e, {
          fields: ['oldPassword'],
          setFormError: form.setError,
        });
      }
    },
    [form],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
};
