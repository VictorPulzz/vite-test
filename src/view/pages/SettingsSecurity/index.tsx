import { Button, ButtonVariant } from '@ui/components/common/Button';
import { InlineFields } from '@ui/components/form/InlineFields';
import { PasswordField } from '@ui/components/form/PasswordField';
import { InputSize } from '@ui/components/form/TextInput';
import React from 'react';

import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { useSecuritySettingsForm } from '~/view/pages/SettingsSecurity/hooks/useSecuritySettingsForm';

export const SettingsSecurityPage: React.FC = () => {
  const { form, handleSubmit } = useSecuritySettingsForm();

  return (
    <SidebarLayout contentClassName="p-6">
      <h1 className="text-h4 mb-5">Security</h1>
      <p className="text-p1 font-semibold mb-2.5">Change password</p>
      <form onSubmit={handleSubmit}>
        <InlineFields>
          <PasswordField
            name="oldPassword"
            control={form.control}
            label="Old password"
            size={InputSize.LARGE}
            placeholder="Old password"
            autoComplete="new-password"
          />
          <PasswordField
            name="newPassword"
            control={form.control}
            label="New password"
            size={InputSize.LARGE}
            placeholder="New password"
            autoComplete="new-password"
          />
        </InlineFields>
        <InlineFields>
          <PasswordField
            name="confirmPassword"
            control={form.control}
            label="Confirm new password"
            size={InputSize.LARGE}
            placeholder="Confirm new password"
            autoFocus
            autoComplete="new-password"
            className="mb-4"
          />
        </InlineFields>
        <Button
          isLoading={form.formState.isSubmitting}
          disabled={!form.formState.isValid}
          onClick={handleSubmit}
          variant={ButtonVariant.PRIMARY}
          className="w-40"
          label="Change password"
        />
      </form>
    </SidebarLayout>
  );
};
