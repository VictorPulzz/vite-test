import { useSwitchValue } from '@appello/common/lib/hooks';
import { getGqlError } from '@appello/common/lib/services/gql/utils/getGqlError';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { RepositoryAccessLevelChoice, UserType } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import {
  FetchRepositoryParticipantsDocument,
  useAddOrUpdateRepositoryParticipantMutation,
} from '~/view/pages/RepositoryDetails/__generated__/schema';
import { Icon } from '~/view/ui/components/common/Icon';

import { DeleteParticipantModal } from './components/DeleteParticipantModal';

interface Props {
  participant: Pick<UserType, 'id' | 'fullName'>;
  repositoryId: number;
  accessLevel: RepositoryAccessLevelChoice;
}

export const ParticipantMenu: FC<Props> = ({ participant, repositoryId, accessLevel }) => {
  const { id } = participant;

  const {
    value: isDeleteParticipantModalOpen,
    on: openDeleteParticipantModal,
    off: closeDeleteParticipantModal,
  } = useSwitchValue(false);

  const [changeParticipantAccessLevel] = useAddOrUpdateRepositoryParticipantMutation();

  const setRepositoryParticipantAccessLevel = useCallback(
    (accessLevel: RepositoryAccessLevelChoice) => {
      toast.promise(
        changeParticipantAccessLevel({
          variables: {
            input: { userId: Number(id), accessLevel, repositoryId },
          },
          refetchQueries: [FetchRepositoryParticipantsDocument],
        }),
        {
          loading: 'Changing access level...',
          success: 'Access level changed',
          error: e => {
            const errors = getGqlError(e?.graphQLErrors);
            return `Error while changing access level: ${JSON.stringify(errors)}`;
          },
        },
      );
    },
    [changeParticipantAccessLevel, id, repositoryId],
  );

  const options: DropdownItem[] = [
    {
      label: 'Delete participant',
      iconBefore: <Icon name="trash" size={12} />,
      onSelect: openDeleteParticipantModal,
    },
    {
      label: 'Change access level',
      iconBefore: <Icon name="connection" size={16} />,
      items: Object.keys(RepositoryAccessLevelChoice).map(participantAccessLevel => ({
        label: convertUppercaseToReadable(participantAccessLevel),
        onSelect: () =>
          setRepositoryParticipantAccessLevel(
            participantAccessLevel as RepositoryAccessLevelChoice,
          ),
        iconAfter: accessLevel === participantAccessLevel && (
          <Icon name="check" className="text-green" size={18} />
        ),
      })),
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
