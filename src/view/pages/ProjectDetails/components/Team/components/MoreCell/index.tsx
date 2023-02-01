import { CellContext } from '@tanstack/react-table';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC } from 'react';

import { Icon } from '~/view/ui/components/common/Icon';

// TODO ad type
export const MoreCell: FC<CellContext<any, unknown>> = ({ row }) => {
  const { id } = row.original;

  // TODO add mutation
  const options: DropdownItem[] = [
    {
      label: 'Remove',
      onSelect: () => id,
      iconBefore: <Icon name="trash" size={14} />,
      className: 'text-red',
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
