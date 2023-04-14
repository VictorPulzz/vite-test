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
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h1 className="text-h2 text-center">Forgot password</h1>
        <p className="text-p3 text-center mt-1.5 text-gray-1">
          Enter your email you used to log in and we will send you a password reset link
        </p>
        <TextLink to={ROUTES.SIGN_IN} className="text-p4 mt-1.5 text-accent mb-7">
          Back to log in
        </TextLink>
        <TextField
          name="email"
          control={form.control}
          label="Email"
          size={InputSize.LARGE}
          placeholder="Enter email"
          autoFocus
        />
        <Button
          label="Proceed"
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
