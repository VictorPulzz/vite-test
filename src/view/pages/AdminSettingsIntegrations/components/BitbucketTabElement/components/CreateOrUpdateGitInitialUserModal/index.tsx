import { useSelectOptions } from '@appello/common';
import { Button, ButtonVariant, Loader, Modal, ModalProps, SelectField } from '@appello/web-ui';
import React, { FC } from 'react';

import { RepositoryAccessLevelChoice } from '~/services/gql/__generated__/globalTypes';
import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { useFetchGitInitialUserDetailsQuery } from '~/view/pages/AdminSettingsIntegrations/__generated__/schema';

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

  const { data: allUsers, loading: isLoadingAllUsers } = useFetchUserGlossaryListQuery();

  const usersOptions = useSelectOptions(allUsers?.userGlossaryList.results, {
    value: 'id',
    label: 'fullName',
  });

  const userIdField = form.watch('userId');

  const repositoryAccessLevelOptions = enumToSelectOptions(RepositoryAccessLevelChoice);

  const isLoadingQueries = isLoadingGitInitialUserDetails || isLoadingAllUsers;

  return (
    <Modal
      close={close}
      contentClassName="w-[470px]"
      isOpen={isOpen}
      title={isEditMode ? 'Edit access level' : 'Add user'}
      onAfterClose={resetForm}
    >
      {isLoadingQueries && (
        <div className="flex items-center h-[200px]">
          <Loader colorful full />
        </div>
      )}
      {!isLoadingQueries && (
        <>
          <SelectField
            required
            control={form.control}
            disabled={isEditMode && !!userIdField}
            label="User"
            name="userId"
            options={usersOptions}
          />
          <SelectField
            required
            control={form.control}
            label="Access level"
            name="accessLevel"
            options={repositoryAccessLevelOptions}
          />
          <Button
            className="mt-6"
            isLoading={isLoading}
            label={`${isEditMode ? 'Save' : 'Add user'}`}
            variant={ButtonVariant.PRIMARY}
            onClick={handleSubmit}
          />
        </>
      )}
    </Modal>
  );
};
