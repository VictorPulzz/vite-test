import { Button, ButtonVariant, TextAreaField, TextField } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import React, { FC } from 'react';

import { useGetPromptInfoQuery } from '~/services/rtk/lead';

import { usePromptForm } from '../../hooks/usePromptForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  promptId?: string;
}

export const CreateOrUpdatePromptModal: FC<Props> = ({ isOpen, close, promptId }) => {
  const { data } = useGetPromptInfoQuery(`${promptId}`, { skip: !promptId });

  const { form, handleSubmit, resetForm } = usePromptForm({
    onSubmitSuccessful: () => close(),
    prefilledData: data,
  });

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      contentClassName="w-[600px]"
      title={`${promptId ? 'Edit' : 'New'} prompt`}
      onAfterClose={resetForm}
    >
      <TextField name="name" control={form.control} label="Name" required />
      <TextAreaField name="promptText" control={form.control} label="Text" required />
      <div className="flex justify-end">
        <Button
          variant={ButtonVariant.PRIMARY}
          onClick={handleSubmit}
          label={promptId ? 'Save' : 'Create prompt'}
          className="mt-6 w-[150px]"
          isLoading={form.formState.isSubmitting}
        />
      </div>
    </Modal>
  );
};
