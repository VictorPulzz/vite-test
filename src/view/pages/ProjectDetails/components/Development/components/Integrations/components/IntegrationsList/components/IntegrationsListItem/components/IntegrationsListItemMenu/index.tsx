import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC } from 'react';

import { Icon } from '~/view/ui/components/common/Icon';

export const IntegrationsListItemMenu: FC = () => {
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
