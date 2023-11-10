import { Button, ButtonVariant } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import React, { FC, useCallback, useState } from 'react';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  description?: string;
  icon?: string;
  name?: string;
  action: string;
  onAccept(): unknown;
}

export const ConfirmActionModal: FC<Props> = ({
  isOpen,
  close,
  description,
  icon = 'trash',
  action,
  name,
  onAccept,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleConfirmAction = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await onAccept();
      close();
    } finally {
      setIsSubmitting(false);
    }
  }, [close, onAccept]);

  return (
    <Modal close={close} contentClassName="w-[22.18rem]" isOpen={isOpen} withCloseButton={false}>
      <div className="flex flex-col items-center">
        <div className="p-10 rounded-full bg-gray-7 mb-2">
          <Icon className="text-primary m-auto" name={icon} size={31} />
        </div>
        <h1 className="text-h4 mb-4 text-center">
          Are you sure you want to {action} <span className="break-all">{name}</span>?
        </h1>
        {description && (
          <p className="mb-6 text-center text-p5 text-gray-2 font-medium">{description}</p>
        )}

        <div className="flex w-full gap-4">
          <Button
            className="text-red"
            label="No"
            variant={ButtonVariant.SECONDARY}
            onClick={close}
          />
          <Button
            isLoading={isSubmitting}
            label="Yes"
            variant={ButtonVariant.PRIMARY}
            onClick={handleConfirmAction}
          />
        </div>
      </div>
    </Modal>
  );
};
