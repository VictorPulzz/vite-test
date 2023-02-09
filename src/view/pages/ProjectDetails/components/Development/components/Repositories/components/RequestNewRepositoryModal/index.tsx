import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import { SelectField } from '@ui/components/form/SelectField';
import React, { FC } from 'react';
import toast from 'react-hot-toast';

import {
  RepositoryPlatformChoice,
  RepositoryTypeChoice,
} from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { useRequestNewRepositoryForm } from '~/view/pages/ProjectDetails/hooks/useRequestNewRepositoryForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

export const RequestNewRepositoryModal: FC<Props> = ({ isOpen, close }) => {
  const { form, handleSubmit, resetForm } = useRequestNewRepositoryForm({
    onSubmitSuccessful: () => {
      toast.success(
        `Your request for ${form.getValues('platform')?.toLowerCase()} ${form
          .getValues('type')
          ?.toLowerCase()} repository is in progress`,
      );
      close();
    },
  });

  const projectPlatformOptions = enumToSelectOptions(RepositoryPlatformChoice);
  const repositoryTypeOptions = enumToSelectOptions(RepositoryTypeChoice);

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-[22.18rem]"
      title="Request new repository"
      onAfterClose={resetForm}
    >
      <div className="flex flex-col items-center">
        <SelectField
          name="platform"
          options={projectPlatformOptions}
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
        isLoading={form.formState.isSubmitting}
      />
    </Modal>
  );
};
