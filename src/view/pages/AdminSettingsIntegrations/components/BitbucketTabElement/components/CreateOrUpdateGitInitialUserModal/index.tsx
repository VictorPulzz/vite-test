import { Button, ButtonVariant, Loader, useSelectOptions } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import React, { FC } from 'react';

import { RepositoryAccessLevelChoice } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { useFetchGitInitialUserDetailsQuery } from '~/view/pages/AdminSettingsIntegrations/__generated__/schema';
import { useFetchAllUsersQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { useGitInitialUserForm } from './hooks/useGitInitialUserForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  gitInitialUserId?: number;
}

export const CreateOrUpdateGitInitialUserModal: FC<Props> = ({
  isOpen,
  close,
  gitInitialUserId,
}) => {
  const isEditMode = !!gitInitialUserId;

  const { data: gitInitialUserDetails, loading: isLoadingGitInitialUserDetails } =
    useFetchGitInitialUserDetailsQuery({
      variables: {
        input: { userId: Number(gitInitialUserId) },
      },
      skip: !gitInitialUserId,
      fetchPolicy: 'cache-and-network',
    });

  const { form, handleSubmit, resetForm, isLoading } = useGitInitialUserForm({
    onSubmitSuccessful: () => close(),
    prefilledData: gitInitialUserDetails?.gitInitialUserDetails,
  });

  const { data: allUsers, loading: isLoadingAllUsers } = useFetchAllUsersQuery({
    variables: {
      pagination: {
        limit: 0,
      },
    },
  });

  const usersOptions = useSelectOptions(allUsers?.usersList.results, {
    value: 'id',
    label: 'fullName',
  });

  const repositoryAccessLevelOptions = enumToSelectOptions(RepositoryAccessLevelChoice);

  const isLoadingQueries = isLoadingGitInitialUserDetails || isLoadingAllUsers;

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-[470px]"
      title={`${isEditMode ? 'Edit' : 'Add'} user`}
      onAfterClose={resetForm}
    >
      {isLoadingQueries && (
        <div className="flex items-center h-[200px]">
          <Loader full colorful />
        </div>
      )}
      {!isLoadingQueries && (
        <>
          <SelectField
            name="userId"
            options={usersOptions}
            control={form.control}
            label="User"
            required
          />
          <SelectField
            name="accessLevel"
            options={repositoryAccessLevelOptions}
            control={form.control}
            label="Access level"
            required
          />
          <Button
            variant={ButtonVariant.PRIMARY}
            onClick={handleSubmit}
            label={`${isEditMode ? 'Save' : 'Add user'}`}
            className="mt-6"
            isLoading={isLoading}
          />
        </>
      )}
    </Modal>
  );
};
