import { useSwitchValue } from '@appello/common';
import { getGqlError } from '@appello/services';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { RepositoryAccessLevelChoice, UserType } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { ConfirmActionModal } from '~/view/components/ConfirmActionModal';
import {
  FetchRepositoryParticipantsDocument,
  useAddOrUpdateRepositoryParticipantMutation,
  useRemoveRepositoryParticipantMutation,
} from '~/view/pages/RepositoryDetails/__generated__/schema';

interface Props {
  participant: Pick<UserType, 'id' | 'fullName'>;
  repositoryId: number;
  accessLevel: RepositoryAccessLevelChoice;
}

export const ParticipantMenu: FC<Props> = ({ participant, repositoryId, accessLevel }) => {
  const { id } = participant;

  const {
    value: isConfirmActionModal,
    on: openConfirmActionModal,
    off: closeConfirmActionModal,
  } = useSwitchValue(false);

  const [changeParticipantAccessLevel] = useAddOrUpdateRepositoryParticipantMutation();
  const [removeRepositoryParticipant] = useRemoveRepositoryParticipantMutation();

  const setRepositoryParticipantAccessLevel = useCallback(
    (accessLevel: RepositoryAccessLevelChoice) => {
      toast.promise(
        changeParticipantAccessLevel({
          variables: {
            input: { userId: id, accessLevel, repositoryId },
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

  const removeCurrentRepositoryParticipant = useCallback(() => {
    return toast.promise(
      removeRepositoryParticipant({
        variables: {
          input: { userId: id, repositoryId },
        },
        refetchQueries: [FetchRepositoryParticipantsDocument],
      }),
      {
        loading: 'Deleting participant...',
        success: 'Participant deleted',
        error: e => {
          const errors = getGqlError(e?.graphQLErrors);
          return `Error while deleting participant: ${JSON.stringify(errors)}`;
        },
      },
    );
  }, [id, removeRepositoryParticipant, repositoryId]);

  const options: DropdownItem[] = [
    {
      label: 'Delete participant',
      iconBefore: <Icon name="trash" size={12} />,
      onSelect: openConfirmActionModal,
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
          <Icon className="text-green" name="check" size={18} />
        ),
      })),
    },
  ];

  return (
    <>
      <Dropdown containerWidth="14.93rem" items={options}>
        {({ onClick }) => (
          <button className="flex-shrink-1" type="button" onClick={onClick}>
            <Icon name="menu" size={16} />
          </button>
        )}
      </Dropdown>
      {isConfirmActionModal && (
        <ConfirmActionModal
          action="delete"
          close={closeConfirmActionModal}
          isOpen={isConfirmActionModal}
          name={participant.fullName}
          onAccept={removeCurrentRepositoryParticipant}
        />
      )}
    </>
  );
};
