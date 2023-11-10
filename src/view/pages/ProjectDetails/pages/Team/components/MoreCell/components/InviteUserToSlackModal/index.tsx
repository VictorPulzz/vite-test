import { Button, ButtonVariant, Checkbox, Icon, Loader } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import React, { FC, useCallback } from 'react';

import { useFetchProjectIntegrationsQuery } from '~/view/pages/ProjectDetails/__generated__/schema';
import { ProjectMemberResultType } from '~/view/pages/ProjectDetails/types';

import { useInviteUserToSlackForm } from './hooks/useInviteUserToSlackForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  user: ProjectMemberResultType['user'];
  isCurrentTeam: boolean;
  projectId: number;
}

export const InviteUserToSlackModal: FC<Props> = ({
  isOpen,
  close,
  user,
  isCurrentTeam,
  projectId,
}) => {
  const { form, handleSubmit, resetForm } = useInviteUserToSlackForm({
    onSubmitSuccessful: () => close(),
    userId: user.id,
    isCurrentTeam,
    projectId,
  });

  const { data, loading } = useFetchProjectIntegrationsQuery({
    variables: {
      data: { id: projectId },
      filters: { slackCreatedOnly: true },
    },
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
      close={close}
      contentClassName="w-[450px]"
      isOpen={isOpen}
      title={`Invite ${user.fullName} to Slack`}
      onAfterClose={resetForm}
    >
      <div className="mt-4 flex flex-col gap-6">
        {loading && (
          <div className="mt-2 flex h-full items-center">
            <Loader colorful full />
          </div>
        )}
        {!loading &&
          data?.projectIntegrationPage.slackChannels?.map(channel => (
            <div className="flex items-center justify-between" key={channel.id}>
              <div className="flex items-center gap-4">
                <Icon raw name="slack" size={24} />
                <span className="text-p5">{channel.template?.label ?? channel.templateName}</span>
              </div>
              <Checkbox
                checked={slackChannels.includes(channel.id)}
                value={channel.id}
                onChange={handleChangeSlackChannel}
              />
            </div>
          ))}
      </div>
      <Button
        className="mt-6"
        isLoading={form.formState.isSubmitting}
        label="Invite"
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
      />
    </Modal>
  );
};
