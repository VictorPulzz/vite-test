import { getGqlError } from '@appello/common/lib/services/gql/utils/getGqlError';
import { Button, ButtonVariant } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { UserType } from '~/services/gql/__generated__/globalTypes';
import {
  FetchRepositoryParticipantsDocument,
  useRemoveRepositoryParticipantMutation,
} from '~/view/pages/RepositoryDetails/__generated__/schema';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  participant: Pick<UserType, 'id' | 'fullName'>;
  repositoryId: number;
}

export const DeleteParticipantModal: FC<Props> = ({
  isOpen,
  close,
  participant: { id, fullName },
  repositoryId,
}) => {
  const [removeRepositoryParticipant] = useRemoveRepositoryParticipantMutation();

  const removeCurrentRepositoryParticipant = useCallback(() => {
    toast.promise(
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

  return (
    <Modal withCloseButton={false} isOpen={isOpen} close={close} contentClassName="w-[22.18rem]">
      <div className="flex flex-col items-center">
        <div className="p-10 rounded-full bg-gray-7 mb-2">
          <Icon name="trash" size={31} className="text-primary m-auto" />
        </div>
        <h1 className="text-h4 mb-2 ">Delete participant</h1>
        <p className="mb-6 text-center leading-6">
          Are you sure you want to delete {fullName} from this repository?
        </p>
        <div className="flex w-full">
          <Button
            variant={ButtonVariant.SECONDARY}
            onClick={removeCurrentRepositoryParticipant}
            label="Yes, delete"
            className="mr-2 text-red"
          />
          <Button variant={ButtonVariant.PRIMARY} onClick={close} label="No" className="ml-2" />
        </div>
      </div>
    </Modal>
  );
};
