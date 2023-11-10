import { Button, ButtonSize, ButtonVariant } from '@appello/web-ui';
import { PasswordField } from '@appello/web-ui';
import { InputSize } from '@appello/web-ui';
import React, { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { useAppDispatch } from '~/store/hooks';
import { signOut } from '~/store/modules/user';
import { AuthLayout } from '~/view/layouts/AuthLayout';

import { useResetPasswordForm } from './hooks/useResetPasswordForm';

export const ResetPasswordPage: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('key') ?? '';
  const dispatch = useAppDispatch();

  const { form, handleSubmit } = useResetPasswordForm({
    token,
    onSubmitSuccessful: () => {
      dispatch(signOut());
      navigate(ROUTES.SIGN_IN);
    },
  });

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <h1 className="text-h2 text-center mb-7">Create a new password</h1>
        <PasswordField
          autoFocus
          autoComplete="new-password"
          control={form.control}
          label="New password"
          name="newPassword"
          placeholder="Enter password"
          size={InputSize.LARGE}
        />
        <PasswordField
          autoComplete="new-password"
          control={form.control}
          label="Confirm new password"
          name="confirmPassword"
          placeholder="Confirm password"
          size={InputSize.LARGE}
        />
        <Button
          className="mt-7"
          isLoading={form.formState.isSubmitting}
          label="Change password"
          size={ButtonSize.LARGE}
          type="submit"
          variant={ButtonVariant.PRIMARY}
        />
      </form>
    </AuthLayout>
  );
};
