import { Button, ButtonVariant, TextAreaField, TextField } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import React, { FC } from 'react';

import { useCreateNewLeadForm } from '../../hooks/useCreateNewLeadForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

export const CreateNewLeadModal: FC<Props> = ({ isOpen, close }) => {
  const { form, handleSubmit, resetForm } = useCreateNewLeadForm({
    onSubmitSuccessful: () => close(),
  });

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      contentClassName="w-[600px]"
      title="New lead"
      onAfterClose={resetForm}
    >
      <TextField name="name" control={form.control} label="Name" required />
      <TextAreaField name="about" control={form.control} label="About" required />
      <div className="flex justify-end">
        <Button
          variant={ButtonVariant.PRIMARY}
          onClick={handleSubmit}
          label="Create lead"
          className="mt-6 w-[150px]"
          isLoading={form.formState.isSubmitting}
        />
      </div>
    </Modal>
  );
};
