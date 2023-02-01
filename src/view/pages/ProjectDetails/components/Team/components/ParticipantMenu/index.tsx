import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC } from 'react';

import { Icon } from '~/view/ui/components/common/Icon';

interface Props {
  participantId: number;
  isOtherParticipant: boolean;
}

export const ParticipantMenu: FC<Props> = ({ participantId, isOtherParticipant }) => {
  // TODO add mutation
  const options: DropdownItem[] = [
    {
      label: isOtherParticipant ? 'Set as current' : 'Remove',
      onSelect: () => (isOtherParticipant ? participantId : participantId),
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
