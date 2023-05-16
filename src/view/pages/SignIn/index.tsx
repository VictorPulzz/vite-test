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
          name="email"
          control={form.control}
          label="Email"
          size={InputSize.LARGE}
          placeholder="Enter email"
          autoFocus
        />
        <PasswordField
          name="password"
          control={form.control}
          label="Password"
          size={InputSize.LARGE}
          placeholder="Enter password"
        />
        <TextLink to={ROUTES.FORGOT_PASSWORD} className="text-p2 mt-2 underline text-gray-1">
          Forgot password?
        </TextLink>
        <Button
          label="Log in"
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
