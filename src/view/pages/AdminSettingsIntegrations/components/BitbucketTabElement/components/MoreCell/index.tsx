import { useSwitchValue } from '@appello/common/lib/hooks';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC } from 'react';

import { GitInitialUsersResultType } from '../../types';
import { CreateOrUpdateGitInitialUserModal } from '../CreateOrUpdateGitInitialUserModal';
import { DeleteGitInitialUserModal } from './components/DeleteGitInitialUserModal';

export const MoreCell: FC<CellContext<GitInitialUsersResultType, unknown>> = ({ row }) => {
  const { user } = row.original;

  const {
    value: isDeleteGitInitialUserModalOpen,
    on: openDeleteGitInitialUserModal,
    off: closeDeleteGitInitialUserModal,
  } = useSwitchValue(false);

  const {
    value: isCreateOrUpdateGitInitialUserModalOpen,
    on: openCreateOrUpdateGitInitialUserModal,
    off: closeCreateOrUpdateGitInitialUserModal,
  } = useSwitchValue(false);

  const options: DropdownItem[] = [
    {
      label: 'Edit',
      iconBefore: <Icon name="pencil" size={16} />,
      onSelect: openCreateOrUpdateGitInitialUserModal,
    },
    {
      label: 'Delete',
      iconBefore: <Icon name="trash" size={16} />,
      className: 'text-red',
      onSelect: openDeleteGitInitialUserModal,
    },
  ];

  return (
    <>
      <Dropdown items={options} containerWidth="14.93rem">
        {({ onClick }) => (
          <button type="button" onClick={onClick}>
            <Icon name="menu" size={16} />
          </button>
        )}
      </Dropdown>
      {isDeleteGitInitialUserModalOpen && (
        <DeleteGitInitialUserModal
          isOpen={isDeleteGitInitialUserModalOpen}
          close={closeDeleteGitInitialUserModal}
          id={user.id}
          name={user.fullName}
        />
      )}

      {isCreateOrUpdateGitInitialUserModalOpen && (
        <CreateOrUpdateGitInitialUserModal
          isOpen={isCreateOrUpdateGitInitialUserModalOpen}
          close={closeCreateOrUpdateGitInitialUserModal}
          gitInitialUserId={user.id}
        />
      )}
    </>
  );
};
