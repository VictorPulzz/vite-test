import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import { PasswordField } from '@ui/components/form/PasswordField';
import { SelectField } from '@ui/components/form/SelectField';
import { TextField } from '@ui/components/form/TextField';
import React, { FC } from 'react';

import { ProjectEnvironmentChoice } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { useCreateNewEnvironmentForm } from '~/view/pages/ProjectDetails/hooks/useCreateNewEnvironmentForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

export const CreateNewEnvironmentModal: FC<Props> = ({ isOpen, close }) => {
  const { form, handleSubmit, resetForm } = useCreateNewEnvironmentForm({
    onSubmitSuccessful: () => close(),
  });

  const projectEnvironmentsOptions = enumToSelectOptions(ProjectEnvironmentChoice);

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-5/9"
      title="Create new environment"
      onAfterClose={resetForm}
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
        isLoading={form.formState.isSubmitting}
      />
    </Modal>
  );
};
