import { Button, ButtonVariant } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { InlineFields } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { TextAreaField } from '@appello/web-ui';
import { Row } from '@tanstack/table-core';
import React, { FC } from 'react';

import { ClientType } from '~/services/gql/__generated__/globalTypes';

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
      close={close}
      contentClassName="w-5/9"
      isOpen={isOpen}
      title={`${isEditMode ? 'Edit' : 'Add'} client team member`}
      onAfterClose={resetForm}
    >
      <InlineFields>
        <TextField required control={form.control} label="Name" name="fullName" />
        <TextField required control={form.control} label="Email" name="email" />
      </InlineFields>
      <InlineFields>
        <TextField control={form.control} label="Phone" name="phone" />
        <TextField control={form.control} label="Position" name="position" />
      </InlineFields>
      <TextAreaField control={form.control} label="Notes" name="notes" />

      <Button
        className="mt-6"
        isLoading={form.formState.isSubmitting}
        label={`${isEditMode ? 'Save' : 'Add'}`}
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
      />
    </Modal>
  );
};
