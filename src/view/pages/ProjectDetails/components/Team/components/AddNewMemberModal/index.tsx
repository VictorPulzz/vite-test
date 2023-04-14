import { Button, ButtonVariant } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { SelectField, SelectOption } from '@appello/web-ui';
import { useSelectOptions } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';

import { useFetchAllUsersQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { useAddNewMemberForm } from './hooks/useAddNewMemberForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  projectId: number;
  projectMembersListIds: string[];
  canEditProjectTeam: boolean;
}

export const AddNewMemberModal: FC<Props> = ({
  isOpen,
  close,
  projectId,
  projectMembersListIds,
  canEditProjectTeam,
}) => {
  const { form, handleSubmit, resetForm } = useAddNewMemberForm({
    onSubmitSuccessful: () => close(),
    projectId,
  });

  const { data } = useFetchAllUsersQuery({
    variables: {
      pagination: { limit: 0 },
    },
    skip: !canEditProjectTeam,
    fetchPolicy: 'cache-and-network',
  });

  const outsideProjectTeamUsers = useMemo(
    () => data?.usersList.results.filter(user => !projectMembersListIds.includes(user.id ?? '')),
    [data?.usersList.results, projectMembersListIds],
  );

  const usersOptions = useSelectOptions(outsideProjectTeamUsers, {
    value: 'id',
    label: 'fullName',
  }) as SelectOption<string>[];

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-[22.18rem]"
      title="New member"
      onAfterClose={resetForm}
    >
      <div className="flex flex-col items-center">
        <SelectField
          name="user"
          options={usersOptions}
          control={form.control}
          label="Select user"
        />
      </div>
      <Button
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
        label="Add"
        className="mt-6"
        isLoading={form.formState.isSubmitting}
      />
    </Modal>
  );
};
