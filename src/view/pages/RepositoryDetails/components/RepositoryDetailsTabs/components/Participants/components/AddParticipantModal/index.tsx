import { useSelectOptions } from '@appello/common';
import { Button, ButtonVariant } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';

import { RepositoryAccessLevelChoice } from '~/services/gql/__generated__/globalTypes';
import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';

import { useAddParticipantForm } from './hooks/useAddParticipantForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  repositoryId: number;
  repositoryParticipantsIds: number[];
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

  const { data: allUsers } = useFetchUserGlossaryListQuery();

  const outsideRepositoryUsers = useMemo(
    () =>
      allUsers?.userGlossaryList.results.filter(
        user => !repositoryParticipantsIds?.includes(user.id),
      ),
    [allUsers?.userGlossaryList, repositoryParticipantsIds],
  );

  const usersOptions = useSelectOptions(outsideRepositoryUsers, {
    value: 'id',
    label: 'fullName',
  });

  const accessLevelOptions = enumToSelectOptions(RepositoryAccessLevelChoice);

  return (
    <Modal
      close={close}
      contentClassName="w-[22.18rem]"
      isOpen={isOpen}
      title="Add participant"
      onAfterClose={resetForm}
    >
      <div className="flex flex-col items-center">
        <SelectField control={form.control} label="User" name="user" options={usersOptions} />
        <SelectField
          control={form.control}
          label="Access level"
          name="accessLevel"
          options={accessLevelOptions}
        />
      </div>
      <Button
        className="mt-6"
        isLoading={form.formState.isSubmitting}
        label="Add"
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
      />
    </Modal>
  );
};
