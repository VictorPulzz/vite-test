import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import React, { FC } from 'react';

import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { SelectField } from '~/view/ui/components/form/SelectField';

import { useAddParticipantForm } from '../../../../hooks/useAddParticipantForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

// TODO remove repositoriesTestData when backend will be ready
export enum UserAccessLevel {
  ADMIN = 'ADMIN',
  MAINTAINER = 'MAINTAINER',
  GUEST = 'GUEST',
}

export const AddParticipantModal: FC<Props> = ({ isOpen, close }) => {
  const { form, handleSubmit } = useAddParticipantForm({
    onSubmitSuccessful: () => close(),
  });

  // TODO remove usersOptions when backend will be ready
  const usersOptions = [
    { value: '1', label: 'Emma Stone' },
    { value: '2', label: 'John Stone' },
    { value: '3', label: 'Bruce Stone' },
    { value: '4', label: 'Ann Stone' },
  ];

  const accessLevelOptions = enumToSelectOptions(UserAccessLevel);

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-[22.18rem]"
      title="Add participant"
    >
      <div className="flex flex-col items-center">
        <SelectField name="user" options={usersOptions} control={form.control} label="User" />
        <SelectField
          name="accessLevel"
          options={accessLevelOptions}
          control={form.control}
          label="Access level"
        />
      </div>
      <Button variant={ButtonVariant.PRIMARY} onClick={handleSubmit} label="Add" className="mt-6" />
    </Modal>
  );
};
