import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import React, { FC, useMemo } from 'react';

import { useFetchAllUsersQuery } from '~/view/pages/ProjectDetails/__generated__/schema';
import { useAddNewMemberForm } from '~/view/pages/ProjectDetails/hooks/useAddNewMemberForm';
import { SelectField } from '~/view/ui/components/form/SelectField';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

export const AddNewMemberModal: FC<Props> = ({ isOpen, close }) => {
  const { form, handleSubmit } = useAddNewMemberForm({
    onSubmitSuccessful: () => close(),
  });

  const { data } = useFetchAllUsersQuery({
    variables: {
      pagination: {},
    },
    fetchPolicy: 'cache-and-network',
  });

  const usersOptions = useMemo(() => {
    if (data?.usersList.results) {
      return data?.usersList.results.map(({ id, fullName }) => ({
        value: String(id),
        label: fullName,
      }));
    }
    return [];
  }, [data?.usersList.results]);

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-[22.18rem]"
      title="New member"
    >
      <div className="flex flex-col items-center">
        <SelectField
          name="user"
          options={usersOptions}
          control={form.control}
          label="Select user"
        />
      </div>
      <Button variant={ButtonVariant.PRIMARY} onClick={handleSubmit} label="Add" className="mt-6" />
    </Modal>
  );
};
