import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import React, { FC } from 'react';

export const EnvironmentsListItemMenu: FC = () => {
  const options: DropdownItem[] = [
    {
      label: 'Action 1',
      onSelect: () => null,
    },
    {
      label: 'Action 2',
      onSelect: () => null,
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
