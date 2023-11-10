import { Button, ButtonVariant, useSelectOptions } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import React, { FC, useCallback } from 'react';

import { ALL_SELECT_OPTION } from '~/constants/select';
import { RequestFilter, RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { FetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';

import { useRequestsFilterForm } from './hooks/useRequestsFilterForm';

export interface RequestsFilterModalProps extends Pick<ModalProps, 'isOpen' | 'close'> {
  setFilter: (filter: Nullable<RequestFilter>) => void;
  allUsers: FetchUserGlossaryListQuery['userGlossaryList']['results'];
  usersByRole: FetchUserGlossaryListQuery['userGlossaryList']['results'];
}

export const RequestsFilterModal: FC<RequestsFilterModalProps> = ({
  isOpen,
  close,
  setFilter,
  allUsers,
  usersByRole,
}) => {
  const { form, handleSubmit, resetForm } = useRequestsFilterForm({
    setFilter,
    onSubmitSuccessful: () => {
      close();
    },
  });

  const usersOptions = [
    ALL_SELECT_OPTION,
    ...useSelectOptions(allUsers, {
      value: 'id',
      label: 'fullName',
    }),
  ];

  const usersByRoleOptions = [
    ALL_SELECT_OPTION,
    ...useSelectOptions(usersByRole, {
      value: 'id',
      label: 'fullName',
    }),
  ];

  const requestTypesOptions = [ALL_SELECT_OPTION, ...enumToSelectOptions(RequestTypeChoice)];

  const handleReset = useCallback(() => {
    resetForm();
    setFilter(null);
    close();
  }, [resetForm, setFilter, close]);

  return (
    <Modal close={close} contentClassName="w-[26rem]" isOpen={isOpen} title="Filter">
      <form onReset={handleReset} onSubmit={handleSubmit}>
        <SelectField
          control={form.control}
          label="Type"
          name="type"
          options={requestTypesOptions}
        />
        <SelectField
          control={form.control}
          label="Created By"
          name="createdBy"
          options={usersOptions}
        />
        <SelectField
          control={form.control}
          label="Assigned To"
          name="assignedTo"
          options={usersByRoleOptions}
        />
        <div className="flex mt-7 gap-4">
          <Button label="Reset filters" type="reset" variant={ButtonVariant.SECONDARY} />
          <Button label="Apply filter" type="submit" variant={ButtonVariant.PRIMARY} />
        </div>
      </form>
    </Modal>
  );
};
