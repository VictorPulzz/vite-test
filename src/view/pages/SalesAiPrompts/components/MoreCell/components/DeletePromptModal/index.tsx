import { getGqlError } from '@appello/common/lib/services/gql/utils/getGqlError';
import { Button, ButtonVariant } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { useRemovePromptMutation } from '~/services/rtk/lead';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  id: string;
  name: string;
}

export const DeletePromptModal: FC<Props> = ({ isOpen, close, id, name }) => {
  const [removePrompt] = useRemovePromptMutation();

  const removeCurrentPrompt = useCallback(() => {
    toast.promise(removePrompt(id), {
      loading: 'Deleting prompt...',
      success: 'Prompt deleted',
      error: e => {
        const errors = getGqlError(e?.graphQLErrors);
        return `Error while deleting prompt: ${JSON.stringify(errors)}`;
      },
    });
  }, [id, removePrompt]);

  return (
    <Modal withCloseButton={false} isOpen={isOpen} close={close} contentClassName="w-[22.18rem]">
      <div className="flex flex-col items-center">
        <div className="p-10 rounded-full bg-gray-7 mb-2">
          <Icon name="trash" size={31} className="text-primary m-auto" />
        </div>
        <h1 className="text-h4 mb-2 ">Delete prompt</h1>
        <p className="mb-6 text-center leading-6">Are you sure you want to delete {name}?</p>
        <div className="flex w-full">
          <Button
            variant={ButtonVariant.SECONDARY}
            onClick={removeCurrentPrompt}
            label="Yes, delete"
            className="mr-2 text-red"
          />
          <Button variant={ButtonVariant.PRIMARY} onClick={close} label="No" className="ml-2" />
        </div>
      </div>
    </Modal>
  );
};
