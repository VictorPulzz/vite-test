import { useSwitchValue } from '@appello/common/lib/hooks';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC } from 'react';

import { Icon } from '~/view/ui/components/common/Icon';

import { DeleteParticipantModal } from '../DeleteParticipantModal';

// TODO remove UserAccessLevel and Participant when backend will be ready
interface Participant {
  id: string;
  fullName: string;
  photo: string;
  position: string;
}

export enum UserAccessLevel {
  ADMIN = 'ADMIN',
  MAINTAINER = 'MAINTAINER',
  GUEST = 'GUEST',
}

interface Props {
  participant: Participant;
}

export const ParticipantMenu: FC<Props> = ({ participant }) => {
  const {
    value: isDeleteParticipantModalOpen,
    on: openDeleteParticipantModal,
    off: closeDeleteParticipantModal,
  } = useSwitchValue(false);

  const options: DropdownItem[] = [
    {
      label: 'Delete participant',
      iconBefore: <Icon name="trash" size={12} />,
      onSelect: openDeleteParticipantModal,
    },
    {
      label: 'Change access level',
      iconBefore: <Icon name="connection" size={16} />,
      items: [
        {
          label: 'Admin',
          onSelect: () => participant.id,
        },
        {
          label: 'Maintainer',
          onSelect: () => participant.id,
        },
        {
          label: 'Guest',
          onSelect: () => participant.id,
        },
      ],
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
      <DeleteParticipantModal
        isOpen={isDeleteParticipantModalOpen}
        close={closeDeleteParticipantModal}
        participantName={participant.fullName}
      />
    </>
  );
};
