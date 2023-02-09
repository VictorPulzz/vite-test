import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import { InlineFields } from '@ui/components/form/InlineFields';
import { PasswordField } from '@ui/components/form/PasswordField';
import { TextField } from '@ui/components/form/TextField';
import React, { FC } from 'react';

import { useRequestNewIntegrationForm } from '~/view/pages/ProjectDetails/hooks/useRequestNewIntegrationForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

export const RequestNewIntegrationModal: FC<Props> = ({ isOpen, close }) => {
  const { form, handleSubmit, resetForm } = useRequestNewIntegrationForm({
    onSubmitSuccessful: () => close(),
  });

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-5/9"
      title="Request new integration"
      onAfterClose={resetForm}
    >
      <div className="flex flex-col">
        <InlineFields>
          <TextField name="name" control={form.control} label="Integration name" />
          <TextField name="credentials.name" control={form.control} label="Credentials name" />
        </InlineFields>
        <InlineFields>
          <TextField name="credentials.login" control={form.control} label="Login" />
          <PasswordField name="credentials.password" control={form.control} label="Password" />
        </InlineFields>
        <InlineFields>
          <TextField name="credentials.url" control={form.control} label="Url" />
          <TextField name="credentials.key" control={form.control} label="Key" />
        </InlineFields>
      </div>
      <Button
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
        label="Send"
        className="mt-6"
        isLoading={form.formState.isSubmitting}
      />
    </Modal>
  );
};
