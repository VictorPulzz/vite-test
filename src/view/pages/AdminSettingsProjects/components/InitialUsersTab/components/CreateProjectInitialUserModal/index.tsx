import { Button, ButtonVariant, Loader, useSelectOptions } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';

import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';

import { useProjectInitialUserForm } from './hooks/useProjectInitialUserForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  projectInitialUsersIds: number[];
}

export const CreateProjectInitialUserModal: FC<Props> = ({
  isOpen,
  close,
  projectInitialUsersIds,
}) => {
  const { form, handleSubmit, resetForm, isLoading } = useProjectInitialUserForm({
    onSubmitSuccessful: close,
  });

  const { data: allUsers, loading: isLoadingAllUsers } = useFetchUserGlossaryListQuery();

  const excludedAlreadyAddedUsers = useMemo(
    () =>
      allUsers?.userGlossaryList.results.filter(user => !projectInitialUsersIds.includes(user.id)),
    [allUsers?.userGlossaryList.results, projectInitialUsersIds],
  );

  const usersOptions = useSelectOptions(excludedAlreadyAddedUsers, {
    value: 'id',
    label: 'fullName',
  });

  return (
    <Modal
      close={close}
      contentClassName="w-[470px]"
      isOpen={isOpen}
      title="Add user"
      onAfterClose={resetForm}
    >
      {isLoadingAllUsers && (
        <div className="flex items-center h-[200px]">
          <Loader colorful full />
        </div>
      )}
      {!isLoadingAllUsers && (
        <>
          <SelectField
            required
            control={form.control}
            label="User"
            name="userId"
            options={usersOptions}
          />
          <Button
            className="mt-6"
            isLoading={isLoading}
            label="Add user"
            variant={ButtonVariant.PRIMARY}
            onClick={handleSubmit}
          />
        </>
      )}
    </Modal>
  );
};
