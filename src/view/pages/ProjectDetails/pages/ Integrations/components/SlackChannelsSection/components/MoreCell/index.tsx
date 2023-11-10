import { useSwitchValue } from '@appello/common/lib/hooks';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC } from 'react';

import { ProjectSlackChannelResultType } from '~/view/pages/ProjectDetails/types';

import { InviteUsersToSlackModal } from './components/InviteUsersToSlackModal';

export const MoreCell: FC<CellContext<ProjectSlackChannelResultType, unknown>> = ({ row }) => {
  const { id, template, channelId } = row.original;

  const {
    value: isInviteUsersToSlackModalOpen,
    on: openInviteUsersToSlackModalModal,
    off: closeInviteUsersToSlackModalModal,
  } = useSwitchValue(false);

  const options: DropdownItem[] = [
    {
      label: 'Invite users',
      iconBefore: <Icon name="plus" size={16} />,
      onSelect: openInviteUsersToSlackModalModal,
      disabled: !channelId,
    },
  ];

  return (
    <>
      <Dropdown containerWidth="14.93rem" items={options}>
        {({ onClick }) => (
          <button type="button" onClick={onClick}>
            <Icon name="menu" size={16} />
          </button>
        )}
      </Dropdown>
      {isInviteUsersToSlackModalOpen && (
        <InviteUsersToSlackModal
          close={closeInviteUsersToSlackModalModal}
          isOpen={isInviteUsersToSlackModalOpen}
          slackChannelId={id}
          // TODO template?.label ?? channelName
          templateLabel={template?.label ?? ''}
        />
      )}
    </>
  );
};
