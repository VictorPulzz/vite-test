import { useSwitchValue } from '@appello/common/lib/hooks';
import { CellContext } from '@tanstack/table-core';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC } from 'react';

import { Icon } from '~/view/ui/components/common/Icon';

import { DeleteRepositoryModal } from '../DeleteRepositoryModal';

// TODO remove any
export const MoreCell: FC<CellContext<any, unknown>> = ({ row }) => {
  // TODO remove console.log
  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: index.tsx:13 ~ row', row);

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
        repositoryName={row.original.repositoryName}
      />
    </>
  );
};
