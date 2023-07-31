import { Modal, ModalProps, SearchInput, useListQueryParams } from '@appello/web-ui';
import React, { FC } from 'react';

import { UserFilter } from '~/services/gql/__generated__/globalTypes';

import { UsersList } from './components/UsersList';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  slackChannelId: number;
  templateLabel: string;
}

export const InviteUsersToSlackModal: FC<Props> = ({
  isOpen,
  close,
  slackChannelId,
  templateLabel,
}) => {
  const { searchValue, setSearchValue, offset } = useListQueryParams<UserFilter>();

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      contentClassName="w-[500px]"
      title="Invite users"
      description={templateLabel}
    >
      <SearchInput
        onChange={setSearchValue}
        defaultValue={searchValue}
        placeholder="Search users"
        className="mt-3"
      />
      <UsersList slackChannelId={slackChannelId} searchValue={searchValue} offset={offset} />
    </Modal>
  );
};
