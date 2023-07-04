import { useSwitchValue } from '@appello/common/lib/hooks';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC } from 'react';

import { ProjectInitialUsersResultType } from '../../types';
import { DeleteProjectInitialUserModal } from './components/DeleteProjectInitialUserModal';

export const MoreCell: FC<CellContext<ProjectInitialUsersResultType, unknown>> = ({ row }) => {
  const { user } = row.original;

  const {
    value: isDeleteModalOpen,
    on: openDeleteModal,
    off: closeDeleteModal,
  } = useSwitchValue(false);

  const options: DropdownItem[] = [
    {
      label: 'Delete',
      iconBefore: <Icon name="trash" size={16} />,
      className: 'text-red',
      onSelect: openDeleteModal,
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
      {isDeleteModalOpen && (
        <DeleteProjectInitialUserModal
          isOpen={isDeleteModalOpen}
          close={closeDeleteModal}
          id={user.id}
        />
      )}
    </>
  );
};
