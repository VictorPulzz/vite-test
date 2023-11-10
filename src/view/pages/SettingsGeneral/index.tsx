import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant } from '@appello/web-ui';
import { InlineFields } from '@appello/web-ui';
import { PhotoField } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { InputSize } from '@appello/web-ui';
import React from 'react';

import { useAppDispatch } from '~/store/hooks';
import { signOut } from '~/store/modules/user';
import { ConfirmActionModal } from '~/view/components/ConfirmActionModal';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { useSettingsGeneralForm } from '~/view/pages/SettingsGeneral/hooks/useSettingsGeneralForm';

import { useMeQuery } from './__generated__/schema';

export const SettingsGeneralPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useMeQuery();

  const { form, handleSubmit } = useSettingsGeneralForm({
    settingsData: data?.me,
  });

  const {
    value: isConfirmActionModal,
    on: openConfirmActionModal,
    off: closeConfirmActionModal,
  } = useSwitchValue(false);

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-h4">General</h1>
        <Button
          className="w-40"
          isLoading={form.formState.isSubmitting}
          label="Save changes"
          variant={ButtonVariant.PRIMARY}
          onClick={handleSubmit}
        />
      </div>
      <PhotoField control={form.control} label="Profile picture" name="photo" />
      <InlineFields>
        <TextField
          required
          control={form.control}
          label="Name"
          name="firstName"
          size={InputSize.LARGE}
        />
        <TextField
          required
          control={form.control}
          label="Last Name"
          name="lastName"
          size={InputSize.LARGE}
        />
      </InlineFields>
      <InlineFields>
        <TextField
          disabled
          control={form.control}
          label="Email"
          name="email"
          size={InputSize.LARGE}
        />
        <TextField
          required
          control={form.control}
          label="Phone"
          name="phone"
          size={InputSize.LARGE}
        />
      </InlineFields>
      <InlineFields>
        <TextField control={form.control} label="Address" name="address" size={InputSize.LARGE} />
      </InlineFields>
      <div className="mt-7">
        <Button
          className="w-40"
          label="Log out"
          variant={ButtonVariant.SECONDARY}
          withIcon="logout"
          onClick={openConfirmActionModal}
        />
      </div>
      <ConfirmActionModal
        action="log out"
        close={closeConfirmActionModal}
        icon="logout"
        isOpen={isConfirmActionModal}
        onAccept={() => dispatch(signOut())}
      />
    </SidebarLayout>
  );
};
