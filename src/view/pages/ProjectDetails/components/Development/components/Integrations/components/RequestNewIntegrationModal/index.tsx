import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import React, { FC } from 'react';

import { useRequestNewIntegrationForm } from '~/view/pages/ProjectDetails/hooks/useRequestNewIntegrationForm';
import { InlineFields } from '~/view/ui/components/form/InlineFields';
import { PasswordField } from '~/view/ui/components/form/PasswordField';
import { TextField } from '~/view/ui/components/form/TextField';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

export const RequestNewIntegrationModal: FC<Props> = ({ isOpen, close }) => {
  const { form, handleSubmit } = useRequestNewIntegrationForm({
    onSubmitSuccessful: () => close(),
  });

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-5/9"
      title="Request new integration"
    >
      <div className="flex flex-col">
        <TextField name="name" control={form.control} label="Integration name" />
        <InlineFields>
          <TextField name="credentials.login" control={form.control} label="Login" />
          <PasswordField name="credentials.password" control={form.control} label="Password" />
        </InlineFields>
        <InlineFields>
          <TextField name="credentials.devApiKey" control={form.control} label="Dev API key" />
          <PasswordField
            name="credentials.prodApiKey"
            control={form.control}
            label="Prod API key"
          />
        </InlineFields>
      </div>
      <Button
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
        label="Send"
        className="mt-6"
      />
    </Modal>
  );
};
