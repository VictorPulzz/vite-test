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
            autoComplete="new-password"
            control={form.control}
            label="Old password"
            name="oldPassword"
            placeholder="Old password"
            size={InputSize.LARGE}
          />
          <PasswordField
            autoComplete="new-password"
            control={form.control}
            label="New password"
            name="newPassword"
            placeholder="New password"
            size={InputSize.LARGE}
          />
        </InlineFields>
        <InlineFields>
          <PasswordField
            autoComplete="new-password"
            className="mb-4"
            control={form.control}
            label="Confirm new password"
            name="confirmPassword"
            placeholder="New password"
            size={InputSize.LARGE}
          />
        </InlineFields>
        <Button
          className="w-40"
          disabled={!form.formState.isValid}
          isLoading={form.formState.isSubmitting}
          label="Change password"
          variant={ButtonVariant.SECONDARY}
          onClick={handleSubmit}
        />
      </form>
    </SidebarLayout>
  );
};
