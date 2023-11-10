import { Button, ButtonSize, ButtonVariant } from '@appello/web-ui';
import { PasswordField } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { InputSize } from '@appello/web-ui';
import { TextLink } from '@appello/web-ui';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { AuthLayout } from '~/view/layouts/AuthLayout';

import { useSignInForm } from './hooks/useSignInForm';

export const SignInPage: FC = () => {
  const navigate = useNavigate();

  const { form, handleSubmit } = useSignInForm({
    onSubmitSuccessful: () => navigate(ROUTES.HOME),
  });

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <h1 className="text-h2 mb-4 text-center">Log in</h1>
        <TextField
          autoFocus
          control={form.control}
          label="Email"
          name="email"
          placeholder="Enter email"
          size={InputSize.LARGE}
        />
        <PasswordField
          control={form.control}
          label="Password"
          name="password"
          placeholder="Enter password"
          size={InputSize.LARGE}
        />
        <TextLink className="text-p2 mt-2 underline text-gray-1" to={ROUTES.FORGOT_PASSWORD}>
          Forgot password?
        </TextLink>
        <Button
          className="mt-7"
          isLoading={form.formState.isSubmitting}
          label="Log in"
          size={ButtonSize.LARGE}
          type="submit"
          variant={ButtonVariant.PRIMARY}
        />
      </form>
    </AuthLayout>
  );
};
