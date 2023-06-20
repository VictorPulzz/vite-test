import { Button, ButtonVariant, TextAreaField } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import React, { FC } from 'react';

import { useCreateNewMessageForm } from './hooks/useCreateNewMessageForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

export const CreateNewMessageModal: FC<Props> = ({ isOpen, close }) => {
  const {
    form: { control, formState },
    handleSubmit,
    resetForm,
  } = useCreateNewMessageForm({ onSubmitSuccessful: () => close() });

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      contentClassName="w-1/2 h"
      title="Create new message"
      onAfterClose={resetForm}
    >
      <div className="flex w-full">
        <TextAreaField
          className="w-full h-full justify-center"
          name="prompt"
          control={control}
          label="Prompt"
        />
      </div>
      <Button
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
        label="Generate"
        className="mt-6"
        isLoading={formState.isSubmitting}
      />
    </Modal>
  );
};
