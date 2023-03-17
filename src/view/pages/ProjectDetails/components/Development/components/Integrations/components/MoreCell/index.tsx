import { CellContext } from '@tanstack/table-core';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC } from 'react';

import { Icon } from '~/view/ui/components/common/Icon';

// TODO remove any
export const MoreCell: FC<CellContext<any, unknown>> = ({ row }) => {
  const options: DropdownItem[] = [
    {
      label: 'Action 1',
      onSelect: () => row,
    },
    {
      label: 'Action 2',
      onSelect: () => row,
    },
  ];

  return (
    <Dropdown items={options} containerWidth="14.93rem">
      {({ onClick }) => (
        <button type="button" onClick={onClick}>
          <Icon name="menu" size={16} />
        </button>
      )}
    </Dropdown>
  );
};
