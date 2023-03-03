import { useSwitchValue } from '@appello/common/lib/hooks';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC } from 'react';

import { UserType } from '~/services/gql/__generated__/globalTypes';
import { Icon } from '~/view/ui/components/common/Icon';

import { DeleteParticipantModal } from '../DeleteParticipantModal';

interface Props {
  participant: Pick<UserType, 'id' | 'fullName'>;
  repositoryId: number;
}

export const ParticipantMenu: FC<Props> = ({ participant, repositoryId }) => {
  const { id } = participant;
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
        participant={participant}
        repositoryId={repositoryId}
      />
    </>
  );
};
