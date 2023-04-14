import { Button, ButtonVariant } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { SelectOption } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { useSelectOptions } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';

import { RepositoryAccessLevelChoice } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { useFetchAllUsersQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { useAddParticipantForm } from './hooks/useAddParticipantForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  repositoryId: number;
  repositoryParticipantsIds: string[];
}

export const AddParticipantModal: FC<Props> = ({
  isOpen,
  close,
  repositoryId,
  repositoryParticipantsIds,
}) => {
  const { form, handleSubmit, resetForm } = useAddParticipantForm({
    onSubmitSuccessful: () => close(),
    repositoryId,
  });

  const { data: allUsers } = useFetchAllUsersQuery({
    variables: {
      pagination: {
        limit: 0,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const outsideRepositoryUsers = useMemo(
    () =>
      allUsers?.usersList.results.filter(
        user => !repositoryParticipantsIds?.includes(user.id ?? ''),
      ),
    [allUsers?.usersList.results, repositoryParticipantsIds],
  );

  const usersOptions = useSelectOptions(outsideRepositoryUsers, {
    value: 'id',
    label: 'fullName',
  }) as SelectOption<string>[];

  const accessLevelOptions = enumToSelectOptions(RepositoryAccessLevelChoice);

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      onAfterClose={resetForm}
      contentClassName="w-[22.18rem]"
      title="Add participant"
    >
      <div className="flex flex-col items-center">
        <SelectField name="user" options={usersOptions} control={form.control} label="User" />
        <SelectField
          name="accessLevel"
          options={accessLevelOptions}
          control={form.control}
          label="Access level"
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
