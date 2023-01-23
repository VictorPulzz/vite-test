import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC } from 'react';

import { Icon } from '~/view/ui/components/common/Icon';

export enum UserAccessLevel {
  ADMIN = 'ADMIN',
  MAINTAINER = 'MAINTAINER',
  GUEST = 'GUEST',
}

interface Props {
  id: string;
}

export const ParticipantMenu: FC<Props> = ({ id }) => {
  const options: DropdownItem[] = [
    {
      label: 'Delete participant',
      iconBefore: <Icon name="trash" size={12} />,
      onSelect: () => id,
    },
    {
      label: 'Change access level',
      iconBefore: <Icon name="connection" size={16} />,
      items: [
        {
          label: 'Admin',
          onSelect: () => id,
        },
        {
          label: 'Maintainer',
          onSelect: () => id,
        },
        {
          label: 'Guest',
          onSelect: () => id,
        },
      ],
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
