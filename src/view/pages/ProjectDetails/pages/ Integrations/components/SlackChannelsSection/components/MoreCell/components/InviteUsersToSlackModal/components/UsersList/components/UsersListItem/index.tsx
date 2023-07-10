import { Button, ButtonSize, ButtonVariant } from '@appello/web-ui';
import React, { Dispatch, FC, SetStateAction, useCallback, useMemo } from 'react';
import { useParams } from 'react-router';

import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useInviteUserToSlackMutation } from '~/view/pages/ProjectDetails/__generated__/schema';

import { UserToSlackResultType } from './types';

interface Props {
  slackChannelId: number;
  user: UserToSlackResultType;
  invitedUsersIds: number[];
  setInvitedUsersIds: Dispatch<SetStateAction<number[]>>;
}

export const UsersListItem: FC<Props> = ({
  slackChannelId,
  user,
  invitedUsersIds,
  setInvitedUsersIds,
}) => {
  const params = useParams();
  const projectId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const [inviteToSlack, { loading: isLoadingInviteToSlack }] = useInviteUserToSlackMutation();

  const inviteUserToSlack = useCallback(
    async (userId: number) => {
      await inviteToSlack({
        variables: {
          input: {
            userId,
            projectId,
            slackChannels: [slackChannelId],
          },
        },
      });
      setInvitedUsersIds(state => [...state, userId]);
    },
    [inviteToSlack, projectId, setInvitedUsersIds, slackChannelId],
  );

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <Avatar uri={user.photoThumbnail?.url || photoPlaceholder} size={32} />
        <span className="text-p5">{user.fullName}</span>
        <span className="text-p5 text-gray-2 break-all pr-4">{user.email}</span>
      </div>
      {invitedUsersIds.includes(user.id) ? (
        <span className="text-green text-p5 pr-3">In channel</span>
      ) : (
        <Button
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.SMALL}
          label="Invite"
          className="w-[80px]"
          onClick={() => inviteUserToSlack(user.id)}
          isLoading={isLoadingInviteToSlack}
        />
      )}
    </div>
  );
};
