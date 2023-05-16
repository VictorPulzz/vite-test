import { Button, ButtonVariant } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { useSelectOptions } from '@appello/web-ui';
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
