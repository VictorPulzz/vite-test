import { Row } from '@tanstack/table-core';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import { useFetchAllUsersQuery } from '~/view/pages/ProjectDetails/__generated__/schema';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { Modal, ModalProps } from '~/view/ui/components/common/Modal';
import { Checkbox } from '~/view/ui/components/form/Checkbox';
import { SelectField, SelectOption } from '~/view/ui/components/form/SelectField';
import { TextField } from '~/view/ui/components/form/TextField';
import { useSelectOptions } from '~/view/ui/hooks/useSelectOptions';

import { ChannelTemplatesType } from '../../consts';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  isEditMode: boolean;
  channelTemplateRow?: Row<ChannelTemplatesType>;
}

export const CreateOrUpdateChannelTemplateModal: FC<Props> = ({
  isOpen,
  close,
  isEditMode,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  channelTemplateRow,
}) => {
  const form = useForm();

  const { data: allUsers } = useFetchAllUsersQuery({
    variables: {
      pagination: {
        limit: 0,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const usersOptions = useSelectOptions(allUsers?.usersList.results, {
    value: 'id',
    label: 'fullName',
  }) as SelectOption<string>[];

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-[470px]"
      title={`${isEditMode ? 'Edit' : 'Add'} Custom template`}
      // onAfterClose={resetForm}
      shouldCloseOnOverlayClick={false}
    >
      <div className="flex flex-col">
        <TextField
          name="name"
          control={form.control}
          label="Name"
          placeholder="Template name"
          required
        />
        <TextField
          name="prefix"
          control={form.control}
          label="Prefix (You’ll not be able to change prefix later)"
          placeholder="Channel prefix"
          required
        />
        <SelectField
          name="users"
          options={usersOptions}
          control={form.control}
          label="Initial users"
          isMulti
        />
        <div className="flex flex-col gap-1">
          <Checkbox label="Make private" {...form.register('isPrivate')} className="mt-4" />
          <span className="text-c1 text-gray-2">You’ll not be able to make it public later</span>
        </div>
      </div>
      <Button
        variant={ButtonVariant.PRIMARY}
        // onClick={handleSubmit}
        label={`${isEditMode ? 'Save' : 'Create template'}`}
        className="mt-[120px]"
        // isLoading={form.formState.isSubmitting}
      />
    </Modal>
  );
};
