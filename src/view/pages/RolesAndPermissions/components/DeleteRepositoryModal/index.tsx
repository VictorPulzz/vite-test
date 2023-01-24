import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Icon } from '@ui/components/common/Icon';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import React, { FC } from 'react';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  repositoryName: string;
}

export const DeleteRepositoryModal: FC<Props> = ({ isOpen, close, repositoryName }) => {
  return (
    <Modal withCloseButton={false} isOpen={isOpen} close={close} contentClassName="w-[22.18rem]">
      <div className="flex flex-col items-center">
        <div className="p-10 rounded-full bg-gray-7 mb-2">
          <Icon name="trash" size={31} className="text-primary m-auto" />
        </div>
        <h1 className="text-h4 mb-2 ">Delete repository</h1>
        <p className="mb-6 text-center leading-6">
          Are you sure you want to delete {repositoryName}?
        </p>
        <div className="flex w-full">
          <Button
            variant={ButtonVariant.SECONDARY}
            onClick={() => null}
            label="Yes, delete"
            className="mr-2 text-red"
          />
          <Button variant={ButtonVariant.PRIMARY} onClick={close} label="No" className="ml-2" />
        </div>
      </div>
    </Modal>
  );
};
