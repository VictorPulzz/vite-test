import { Button, ButtonSize, ButtonVariant } from '@appello/web-ui';
import { TextLink } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { InputSize } from '@appello/web-ui';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { AuthLayout } from '~/view/layouts/AuthLayout';

import { useForgotPasswordForm } from './hooks/useForgotPasswordForm';

export const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate();
  const { form, handleSubmit } = useForgotPasswordForm({
    onSubmitSuccessful: () => navigate(ROUTES.SIGN_IN),
  });

  return (
    <AuthLayout>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <h1 className="text-h2 text-center">Forgot password</h1>
        <p className="text-p3 text-center mt-1.5 text-gray-1">
          Enter your email you used to log in and we will send you a password reset link
        </p>
        <TextLink className="text-p4 mt-1.5 text-accent mb-7" to={ROUTES.SIGN_IN}>
          Back to log in
        </TextLink>
        <TextField
          autoFocus
          control={form.control}
          label="Email"
          name="email"
          placeholder="Enter email"
          size={InputSize.LARGE}
        />
        <Button
          className="mt-7"
          isLoading={form.formState.isSubmitting}
          label="Proceed"
          size={ButtonSize.LARGE}
          type="submit"
          variant={ButtonVariant.PRIMARY}
        />
      </form>
    </AuthLayout>
  );
};
