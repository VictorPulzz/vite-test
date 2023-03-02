import { Button, ButtonVariant } from '@ui/components/common/Button';
import { TextField } from '@ui/components/form/TextField';
import React, { FC } from 'react';

import { Modal, ModalProps } from '~/view/ui/components/common/Modal';

import { FetchRepositoryDetailsQuery } from '../../__generated__/schema';
import { useUpdateRepositoryForm } from '../../hooks/useUpdateRepositoryForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  repository: FetchRepositoryDetailsQuery['repository'];
}

export const UpdateRepositoryModal: FC<Props> = ({ isOpen, close, repository }) => {
  const {
    form: { control, formState },
    handleSubmit,
    resetForm,
  } = useUpdateRepositoryForm({
    onSubmitSuccessful: () => close(),
    repository,
  });

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-[400px]"
      title="Repository info"
      onAfterClose={resetForm}
    >
      <TextField name="name" control={control} label="Name" />
      <Button
        variant={ButtonVariant.PRIMARY}
        label="Save"
        className="mt-6"
        onClick={handleSubmit}
        isLoading={formState.isSubmitting}
      />
    </Modal>
  );
};
