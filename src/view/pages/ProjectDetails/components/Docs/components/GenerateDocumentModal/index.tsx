import { Button, ButtonVariant } from '@ui/components/common/Button';
import React, { FC } from 'react';

import { Modal, ModalProps } from '~/view/ui/components/common/Modal';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

export const GenerateDocumentModal: FC<Props> = ({ isOpen, close }) => {
  //   const {
  //     form: { control, formState },
  //     handleSubmit,
  //     resetForm,
  //   } = useUpdateRepositoryForm({
  //     onSubmitSuccessful: () => close(),
  //     repository,
  //   });

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-[400px]"
      title="Generate document"
      //   onAfterClose={resetForm}
    >
      <Button
        variant={ButtonVariant.PRIMARY}
        label="Save"
        className="mt-6"
        // onClick={handleSubmit}
        // isLoading={formState.isSubmitting}
      />
    </Modal>
  );
};
