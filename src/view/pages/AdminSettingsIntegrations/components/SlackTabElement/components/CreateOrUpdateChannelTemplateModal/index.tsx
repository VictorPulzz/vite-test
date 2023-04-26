import { Button, ButtonVariant, useSelectOptions } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { Checkbox } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import React, { FC } from 'react';

import { useFetchSlackTemplateInfoQuery } from '~/view/pages/AdminSettingsIntegrations/__generated__/schema';
import { useFetchAllUsersQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { useChannelTemplateForm } from './hooks/useChannelTemplateForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  channelTemplateId?: number;
}

export const CreateOrUpdateChannelTemplateModal: FC<Props> = ({
  isOpen,
  close,
  channelTemplateId,
}) => {
  const isEditMode = !!channelTemplateId;

  const { data: slackTemplateInfo, loading: isLoadingSlackTemplateInfo } =
    useFetchSlackTemplateInfoQuery({
      variables: {
        input: { id: Number(channelTemplateId) },
      },
      skip: !channelTemplateId,
    });

  const { form, handleSubmit, resetForm, isLoading } = useChannelTemplateForm({
    onSubmitSuccessful: () => close(),
    prefilledData: slackTemplateInfo?.slackTemplate,
  });

  const { data: allUsers, loading: isLoadingAllUsers } = useFetchAllUsersQuery({
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
  });

  const isDisableAccessibilityCheckbox =
    isEditMode && !!slackTemplateInfo?.slackTemplate?.isPrivate;

  const isLoadingQueries = isLoadingAllUsers || isLoadingSlackTemplateInfo;

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-[470px]"
      title={`${isEditMode ? 'Edit' : 'Add'} Custom template`}
      onAfterClose={resetForm}
      shouldCloseOnOverlayClick={false}
    >
      {isLoadingQueries && (
        <div className="flex items-center h-[410px]">
          <Loader full colorful />
        </div>
      )}
      {!isLoadingQueries && (
        <>
          <div className="flex flex-col">
            <TextField
              name="label"
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
              disabled={isEditMode}
            />
            <SelectField
              name="initialUsers"
              options={usersOptions}
              control={form.control}
              label="Initial users"
              isMulti
            />
            <div className="flex flex-col gap-1">
              <Checkbox
                label="Make private"
                {...form.register('isPrivate')}
                className="mt-4"
                disabled={isDisableAccessibilityCheckbox}
              />
              <span className="text-p5 text-gray-2">
                You’ll not be able to make it public later
              </span>
            </div>
          </div>
          <Button
            variant={ButtonVariant.PRIMARY}
            onClick={handleSubmit}
            label={`${isEditMode ? 'Save' : 'Create template'}`}
            className="mt-[120px]"
            isLoading={isLoading}
          />
        </>
      )}
    </Modal>
  );
};
