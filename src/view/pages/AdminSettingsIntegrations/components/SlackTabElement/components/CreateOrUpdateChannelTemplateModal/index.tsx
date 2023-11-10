import { Button, ButtonVariant, useSelectOptions } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { Checkbox } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import React, { FC } from 'react';

import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import { useFetchSlackTemplateInfoQuery } from '~/view/pages/AdminSettingsIntegrations/__generated__/schema';

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
      fetchPolicy: 'cache-and-network',
    });

  const { form, handleSubmit, resetForm, isLoading } = useChannelTemplateForm({
    onSubmitSuccessful: () => close(),
    prefilledData: slackTemplateInfo?.slackTemplate,
  });

  const { data: allUsers, loading: isLoadingAllUsers } = useFetchUserGlossaryListQuery();

  const usersOptions = useSelectOptions(allUsers?.userGlossaryList.results, {
    value: 'id',
    label: 'fullName',
  });

  const isDisableAccessibilityCheckbox =
    isEditMode && !!slackTemplateInfo?.slackTemplate?.isPrivate;

  const isLoadingQueries = isLoadingAllUsers || isLoadingSlackTemplateInfo;

  return (
    <Modal
      close={close}
      contentClassName="w-[470px]"
      isOpen={isOpen}
      title={`${isEditMode ? 'Edit' : 'Add'} Custom template`}
      onAfterClose={resetForm}
    >
      {isLoadingQueries && (
        <div className="flex items-center h-[410px]">
          <Loader colorful full />
        </div>
      )}
      {!isLoadingQueries && (
        <>
          <div className="flex flex-col">
            <TextField
              required
              control={form.control}
              label="Name"
              name="label"
              placeholder="Template name"
            />
            <TextField
              required
              control={form.control}
              disabled={isEditMode}
              label="Prefix (You’ll not be able to change prefix later)"
              name="prefix"
              placeholder="Channel prefix"
            />
            <SelectField
              isMulti
              control={form.control}
              label="Initial users"
              name="initialUsers"
              options={usersOptions}
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
            className="mt-[120px]"
            isLoading={isLoading}
            label={`${isEditMode ? 'Save' : 'Create template'}`}
            variant={ButtonVariant.PRIMARY}
            onClick={handleSubmit}
          />
        </>
      )}
    </Modal>
  );
};
