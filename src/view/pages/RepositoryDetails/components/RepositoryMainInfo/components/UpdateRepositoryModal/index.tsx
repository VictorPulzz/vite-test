import { Button, ButtonVariant } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import React, { FC } from 'react';

import { FetchRepositoryDetailsQuery } from '~/view/pages/RepositoryDetails/__generated__/schema';

import { useUpdateRepositoryForm } from './hooks/useUpdateRepositoryForm';

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
