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
          label="Save changes"
          variant={ButtonVariant.PRIMARY}
          className="w-40"
          onClick={handleSubmit}
          isLoading={form.formState.isSubmitting}
        />
      </div>
      <PhotoField name="photo" control={form.control} label="Profile picture" />
      <InlineFields>
        <TextField
          name="firstName"
          control={form.control}
          label="Name"
          size={InputSize.LARGE}
          required
        />
        <TextField
          name="lastName"
          control={form.control}
          label="Last Name"
          size={InputSize.LARGE}
          required
        />
      </InlineFields>
      <InlineFields>
        <TextField
          disabled
          name="email"
          control={form.control}
          label="Email"
          size={InputSize.LARGE}
        />
        <TextField
          name="phone"
          control={form.control}
          label="Phone"
          size={InputSize.LARGE}
          required
        />
      </InlineFields>
      <InlineFields>
        <TextField name="address" control={form.control} label="Address" size={InputSize.LARGE} />
      </InlineFields>
      <div className="mt-7">
        <Button
          onClick={openConfirmActionModal}
          withIcon="logout"
          className="w-40"
          variant={ButtonVariant.SECONDARY}
          label="Log out"
        />
      </div>
      <ConfirmActionModal
        icon="logout"
        action="log out"
        isOpen={isConfirmActionModal}
        close={closeConfirmActionModal}
        onAccept={() => dispatch(signOut())}
      />
    </SidebarLayout>
  );
};
