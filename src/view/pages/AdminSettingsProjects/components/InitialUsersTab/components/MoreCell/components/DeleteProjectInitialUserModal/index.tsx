import { getGqlError } from '@appello/common/lib/services/gql/utils/getGqlError';
import { Button, ButtonVariant } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import {
  FetchProjectInitialUsersListDocument,
  useRemoveProjectInitialUserMutation,
} from '../../../../../../__generated__/schema';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  id: number;
}

export const DeleteProjectInitialUserModal: FC<Props> = ({ isOpen, close, id }) => {
  const [removeUser] = useRemoveProjectInitialUserMutation();

  const remove = useCallback(() => {
    toast.promise(
      removeUser({
        variables: {
          input: { userId: id },
        },
        refetchQueries: [FetchProjectInitialUsersListDocument],
      }),
      {
        loading: 'Deleting user from list...',
        success: 'User deleted from list',
        error: e => {
          const errors = getGqlError(e?.graphQLErrors);
          return `Error while deleting user: ${JSON.stringify(errors)}`;
        },
      },
    );
  }, [id, removeUser]);

  return (
    <Modal withCloseButton={false} isOpen={isOpen} close={close} contentClassName="w-[22.18rem]">
      <div className="flex flex-col items-center">
        <div className="p-10 rounded-full bg-gray-7 mb-2">
          <Icon name="trash" size={31} className="text-primary m-auto" />
        </div>
        <h1 className="text-h4 mb-2 ">Delete from list</h1>
        <p className="mb-6 text-center leading-6">
          This user won't be deleted from existing projects
        </p>
        <div className="flex w-full">
          <Button
            variant={ButtonVariant.SECONDARY}
            onClick={remove}
            label="Delete"
            className="mr-2 text-red"
          />
          <Button variant={ButtonVariant.PRIMARY} onClick={close} label="No" className="ml-2" />
        </div>
      </div>
    </Modal>
  );
};
