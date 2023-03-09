import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import { InlineFields } from '@ui/components/form/InlineFields';
import { PasswordField } from '@ui/components/form/PasswordField';
import { TextField } from '@ui/components/form/TextField';
import React, { FC } from 'react';

import { ProjectEnvironmentChoice } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { useRequestNewIntegrationForm } from '~/view/pages/ProjectDetails/hooks/useRequestNewIntegrationForm';
import { SelectField } from '~/view/ui/components/form/SelectField';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

export const RequestNewIntegrationModal: FC<Props> = ({ isOpen, close }) => {
  const { form, handleSubmit, resetForm } = useRequestNewIntegrationForm({
    onSubmitSuccessful: () => close(),
  });

  const projectEnvironmentsOptions = enumToSelectOptions(ProjectEnvironmentChoice);

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
          <SelectField
            name="environment"
            options={projectEnvironmentsOptions}
            control={form.control}
            label="Environment"
          />
        </InlineFields>
        <InlineFields>
          <TextField name="credential.login" control={form.control} label="Login" />
          <PasswordField name="credential.password" control={form.control} label="Password" />
        </InlineFields>
        <InlineFields>
          <TextField name="credential.url" control={form.control} label="Url" />
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
