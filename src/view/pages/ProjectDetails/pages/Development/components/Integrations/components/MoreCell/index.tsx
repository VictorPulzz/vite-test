import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC } from 'react';

// TODO remove any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
