import { Button, ButtonVariant } from '@appello/web-ui';
import { InlineFields } from '@appello/web-ui';
import { PasswordField } from '@appello/web-ui';
import { InputSize } from '@appello/web-ui';
import React from 'react';

import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { useSecuritySettingsForm } from '~/view/pages/SettingsSecurity/hooks/useSecuritySettingsForm';

export const SettingsSecurityPage: React.FC = () => {
  const { form, handleSubmit } = useSecuritySettingsForm();

  return (
    <SidebarLayout contentClassName="p-6">
      <h1 className="text-h4 mb-5">Security</h1>
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
            placeholder="New password"
            autoFocus
            autoComplete="new-password"
            className="mb-4"
          />
        </InlineFields>
        <Button
          isLoading={form.formState.isSubmitting}
          disabled={!form.formState.isValid}
          onClick={handleSubmit}
          variant={ButtonVariant.SECONDARY}
          className="w-40"
          label="Change password"
        />
      </form>
    </SidebarLayout>
  );
};
