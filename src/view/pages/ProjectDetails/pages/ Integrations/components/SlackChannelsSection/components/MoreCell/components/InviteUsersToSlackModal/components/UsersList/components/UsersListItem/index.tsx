import { Button, ButtonSize, ButtonVariant } from '@appello/web-ui';
import React, { Dispatch, FC, SetStateAction, useCallback } from 'react';

import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useInviteUserToSlackChannelMutation } from '~/view/pages/ProjectDetails/__generated__/schema';

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
  const [inviteToSlack, { loading: isLoadingInviteToSlack }] =
    useInviteUserToSlackChannelMutation();

  const inviteUserToSlack = useCallback(
    async (userId: number) => {
      await inviteToSlack({
        variables: {
          input: {
            userId,
            slackChannel: slackChannelId,
          },
        },
      });
      setInvitedUsersIds(state => [...state, userId]);
    },
    [inviteToSlack, setInvitedUsersIds, slackChannelId],
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
