import { Button, ButtonVariant, Checkbox, Icon, Loader } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { useSelectOptions } from '@appello/web-ui';
import React, { FC, useCallback, useMemo } from 'react';

import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import { useFetchProjectIntegrationsQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { useAddNewMemberForm } from './hooks/useAddNewMemberForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  projectId: number;
  projectMembersListIds: number[];
  canWriteProjectTeam: boolean;
  isCurrentTeam: boolean;
}

export const AddNewMemberModal: FC<Props> = ({
  isOpen,
  close,
  projectId,
  projectMembersListIds,
  canWriteProjectTeam,
  isCurrentTeam,
}) => {
  const { form, handleSubmit, resetForm } = useAddNewMemberForm({
    onSubmitSuccessful: () => close(),
    projectId,
    isCurrentTeam,
  });

  const { data: allUsers } = useFetchUserGlossaryListQuery({
    skip: !canWriteProjectTeam,
    fetchPolicy: 'cache-and-network',
  });

  const { data, loading } = useFetchProjectIntegrationsQuery({
    variables: {
      data: { id: projectId },
      filters: { slackCreatedOnly: true },
    },
    fetchPolicy: 'cache-and-network',
  });

  const outsideProjectTeamUsers = useMemo(
    () =>
      allUsers?.userGlossaryList.results.filter(user => !projectMembersListIds.includes(user.id)),
    [allUsers?.userGlossaryList, projectMembersListIds],
  );

  const usersOptions = useSelectOptions(outsideProjectTeamUsers, {
    value: 'id',
    label: 'fullName',
  });

  const slackChannels = form.watch('slackChannels');

  const handleChangeSlackChannel = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = ev.target;
      if (checked) {
        form.setValue('slackChannels', [...slackChannels, +value]);
      } else {
        form.setValue(
          'slackChannels',
          slackChannels.filter((channelId: number) => channelId !== +value),
        );
      }
    },
    [form, slackChannels],
  );

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      contentClassName="w-[450px]"
      title="New member"
      onAfterClose={resetForm}
    >
      <SelectField name="user" options={usersOptions} control={form.control} label="Select user" />
      {loading && (
        <div className="mt-2 flex h-full items-center">
          <Loader full colorful />
        </div>
      )}
      {!loading &&
        data?.projectIntegrationPage.slackChannels &&
        data?.projectIntegrationPage?.slackChannels.length > 0 && (
          <div className="mt-4">
            <span className="text-p5 text-gray-1">Invite user to Slack channels</span>
            <div className="mt-3 flex flex-col gap-6">
              {data?.projectIntegrationPage.slackChannels.map(channel => (
                <div key={channel.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Icon name="slack" size={24} raw />
                    <span className="text-p5">
                      {channel.template?.label ?? channel.templateName}
                    </span>
                  </div>
                  <Checkbox
                    onChange={handleChangeSlackChannel}
                    value={channel.id}
                    checked={slackChannels.includes(channel.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      <Button
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
        label="Add"
        className="mt-6"
        isLoading={form.formState.isSubmitting}
      />
    </Modal>
  );
};
