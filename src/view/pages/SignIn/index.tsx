import { Button, ButtonSize, ButtonVariant } from '@ui/components/common/Button';
import { PasswordField } from '@ui/components/form/PasswordField';
import { TextField } from '@ui/components/form/TextField';
import { InputSize } from '@ui/components/form/TextInput';
import React, { FC } from 'react';

import { useSignInForm } from './hooks/useSignInForm';

export const SignInPage: FC = () => {
  const { form, handleSubmit } = useSignInForm();

  return (
    <div className="flex-1 flex-center">
      <form onSubmit={handleSubmit} className="w-[500px]">
        <h1 className="mb-4">Log in</h1>
        <TextField
          name="email"
          control={form.control}
          label="Email"
          size={InputSize.LARGE}
          placeholder="Enter email"
        />
        <PasswordField
          name="password"
          control={form.control}
          label="Password"
          size={InputSize.LARGE}
          placeholder="Enter password"
        />
        <Button
          type="submit"
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.LARGE}
          label="Sign in"
          isLoading={form.formState.isSubmitting}
          className="mt-7"
        />
      </form>
    </div>
  );
};
