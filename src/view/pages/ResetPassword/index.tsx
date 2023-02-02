import { Button, ButtonSize, ButtonVariant } from '@ui/components/common/Button';
import { PasswordField } from '@ui/components/form/PasswordField';
import { InputSize } from '@ui/components/form/TextInput';
import React, { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { AuthLayout } from '~/view/layouts/AuthLayout';

import { useResetPasswordForm } from './hooks/useResetPasswordForm';

export const ResetPasswordPage: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('key') ?? '';

  const { form, handleSubmit } = useResetPasswordForm({
    token,
    onSubmitSuccessful: () => navigate(ROUTES.SIGN_IN),
  });

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <h1 className="text-h2 text-center mb-7">Create a new password</h1>
        <PasswordField
          name="password"
          control={form.control}
          label="New password"
          size={InputSize.LARGE}
          placeholder="Enter password"
          autoFocus
          autoComplete="new-password"
        />
        <PasswordField
          name="confirmPassword"
          control={form.control}
          label="Confirm new password"
          size={InputSize.LARGE}
          placeholder="Confirm password"
          autoComplete="new-password"
        />
        <Button
          label="Change password"
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.LARGE}
          type="submit"
          isLoading={form.formState.isSubmitting}
          className="mt-7"
        />
      </form>
    </AuthLayout>
  );
};
