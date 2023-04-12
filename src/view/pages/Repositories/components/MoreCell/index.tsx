import { useSwitchValue } from '@appello/common/lib/hooks';
import { CellContext } from '@tanstack/table-core';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC } from 'react';

import { Icon } from '~/view/ui/components/common/Icon';

import { RepositoryResultType } from '../../types';
import { DeleteRepositoryModal } from './components/DeleteRepositoryModal';

export const MoreCell: FC<CellContext<RepositoryResultType, unknown>> = ({ row }) => {
  const { id, name } = row.original;
  const {
    value: isDeleteRepositoryModalOpen,
    on: openDeleteRepositoryModal,
    off: closeDeleteRepositoryModal,
  } = useSwitchValue(false);

  const options: DropdownItem[] = [
    {
      label: 'Delete repository',
      iconBefore: <Icon name="trash" size={14} />,
      onSelect: openDeleteRepositoryModal,
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
      <DeleteRepositoryModal
        isOpen={isDeleteRepositoryModalOpen}
        close={closeDeleteRepositoryModal}
        id={id as number}
        // TODO fix this later
        name={name ?? 'Requested'}
      />
    </>
  );
};
