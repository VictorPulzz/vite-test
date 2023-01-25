import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import React, { FC } from 'react';
import toast from 'react-hot-toast';

import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { useAddRepositoryForm } from '~/view/pages/ProjectDetails/hooks/useAddRepositoryForm';
import { SelectField } from '~/view/ui/components/form/SelectField';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

// TODO move ProjectPlatfrom and RepositoryType later
export enum ProjectPlatfrom {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
}
export enum RepositoryType {
  FRONT_END = 'FRONTEND',
  BACK_END = 'BACKEND',
}

export const AddRepositoryModal: FC<Props> = ({ isOpen, close }) => {
  const { form, handleSubmit } = useAddRepositoryForm({
    onSubmitSuccessful: () => {
      toast.success(
        `Your request for ${form.getValues().platform.toLowerCase()} ${form
          .getValues()
          .type.toLowerCase()} repository is in progress`,
      );
      close();
    },
  });

  const projectPlatfromOptions = enumToSelectOptions(ProjectPlatfrom);
  const repositoryTypeOptions = enumToSelectOptions(RepositoryType);

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-[22.18rem]"
      title="Request new repository"
    >
      <div className="flex flex-col items-center">
        <SelectField
          name="platform"
          options={projectPlatfromOptions}
          control={form.control}
          label="Platform"
        />
        <SelectField
          name="type"
          options={repositoryTypeOptions}
          control={form.control}
          label="Type"
        />
      </div>
      <Button
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
        label="Send"
        className="mt-6"
      />
    </Modal>
  );
};
