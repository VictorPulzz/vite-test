import { Row } from '@tanstack/react-table';
import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import { InlineFields } from '@ui/components/form/InlineFields';
import { TextField } from '@ui/components/form/TextField';
import React, { FC } from 'react';

import { ClientType } from '~/services/gql/__generated__/globalTypes';
import { TextAreaField } from '~/view/ui/components/form/TextAreaField';

import { useAddOrEditClientTeamMemberForm } from './hooks/useAddOrEditClientTeamMemberForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  isEditMode: boolean;
  clientTeamMemberRow?: Row<ClientType>;
}

export const AddOrEditModal: FC<Props> = ({ isOpen, close, isEditMode, clientTeamMemberRow }) => {
  const { form, handleSubmit, resetForm } = useAddOrEditClientTeamMemberForm({
    onSubmitSuccessful: () => close(),
    prefilledData: clientTeamMemberRow,
  });

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-5/9"
      title={`${isEditMode ? 'Edit' : 'Add'} client team member`}
      onAfterClose={resetForm}
      shouldCloseOnOverlayClick={false}
    >
      <div className="flex flex-col">
        <InlineFields>
          <TextField name="fullName" control={form.control} label="Name" required />
          <TextField name="email" control={form.control} label="Email" required />
        </InlineFields>
        <InlineFields>
          <TextField name="phone" control={form.control} label="Phone" />
          <TextField name="position" control={form.control} label="Position" />
        </InlineFields>
        <TextAreaField name="notes" control={form.control} label="Notes" />
      </div>
      <Button
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
        label={`${isEditMode ? 'Save' : 'Add'}`}
        className="mt-6"
        isLoading={form.formState.isSubmitting}
      />
    </Modal>
  );
};
