import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Icon } from '@ui/components/common/Icon';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import React, { FC } from 'react';

import { useAppDispatch } from '~/store/hooks';
import { signOut } from '~/store/modules/user';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}
export const LogoutModal: FC<Props> = ({ isOpen, close }) => {
  const dispatch = useAppDispatch();

  return (
    <Modal withCloseButton={false} isOpen={isOpen} close={close} contentClassName="w-[22.18rem]">
      <div className="flex flex-col items-center">
        <div className="p-10 rounded-full bg-gray-7 mb-2">
          <Icon name="logout" size={31} className="text-primary m-auto" />
        </div>
        <h1 className="text-h4 mb-2">Log out</h1>
        <p className="mb-6">Are you sure you want to log out?</p>
        <div className="flex w-full">
          <Button
            variant={ButtonVariant.SECONDARY}
            onClick={() => dispatch(signOut())}
            label="Yes, log out"
            className="mr-2 text-red"
          />
          <Button variant={ButtonVariant.PRIMARY} onClick={close} label="No" className="ml-2" />
        </div>
      </div>
    </Modal>
  );
};
