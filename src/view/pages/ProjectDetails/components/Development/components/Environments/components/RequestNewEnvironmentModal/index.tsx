import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import React, { FC } from 'react';

import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { useRequestNewEnvironmentForm } from '~/view/pages/ProjectDetails/hooks/useRequestNewEnvironmentForm';
import { PasswordField } from '~/view/ui/components/form/PasswordField';
import { SelectField } from '~/view/ui/components/form/SelectField';
import { TextField } from '~/view/ui/components/form/TextField';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

// TODO remove ProjectEnvironment later
export enum ProjectEnvironment {
  DEV = 'DEV',
  STAGE = 'STAGE',
  PROD = 'PROD',
}

export const RequestNewEnvironmentModal: FC<Props> = ({ isOpen, close }) => {
  const { form, handleSubmit } = useRequestNewEnvironmentForm({
    onSubmitSuccessful: () => close(),
  });

  const projectEnvironmentsOptions = enumToSelectOptions(ProjectEnvironment);

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-5/9"
      title="Request new environment"
    >
      <div>
        <SelectField
          name="environment"
          options={projectEnvironmentsOptions}
          control={form.control}
          label="Environment"
        />
        <div className="grid grid-cols-2 gap-x-5 mt-4">
          <div>
            <h2 className="text-p1 font-bold pb-2">Frontend credentials</h2>
            <TextField name="frontendCredentials.url" control={form.control} label="Url" />
            <TextField name="frontendCredentials.login" control={form.control} label="Login" />
            <PasswordField
              name="frontendCredentials.password"
              control={form.control}
              label="Password"
            />
          </div>
          <div>
            <h2 className="text-p1 font-bold pb-2">Backend credentials</h2>
            <TextField name="backendCredentials.url" control={form.control} label="Url" />
            <TextField name="backendCredentials.login" control={form.control} label="Login" />
            <PasswordField
              name="backendCredentials.password"
              control={form.control}
              label="Password"
            />
          </div>
        </div>
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
