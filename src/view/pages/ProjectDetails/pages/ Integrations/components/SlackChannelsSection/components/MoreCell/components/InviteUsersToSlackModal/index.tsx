import { useListQueryParams } from '@appello/web-kit';
import { Modal, ModalProps, SearchInput, useAppelloKit } from '@appello/web-ui';
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
  const { pageSize } = useAppelloKit();
  const { searchValue, setSearchValue, offset } = useListQueryParams<UserFilter>(pageSize);

  return (
    <Modal
      close={close}
      contentClassName="w-[500px]"
      description={templateLabel}
      isOpen={isOpen}
      title="Invite users"
    >
      <SearchInput
        className="mt-3"
        defaultValue={searchValue}
        placeholder="Search users"
        onChange={setSearchValue}
      />
      <UsersList offset={offset} searchValue={searchValue} slackChannelId={slackChannelId} />
    </Modal>
  );
};
