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
  users: FetchUserGlossaryListQuery['userGlossaryList']['results'];
}

export const RequestsFilterModal: FC<RequestsFilterModalProps> = ({
  isOpen,
  close,
  setFilter,
  users,
}) => {
  const { form, handleSubmit, resetForm } = useRequestsFilterForm({
    setFilter,
    onSubmitSuccessful: () => {
      close();
    },
  });

  const usersOptions = [
    ALL_SELECT_OPTION,
    ...useSelectOptions(users, {
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
    <Modal isOpen={isOpen} close={close} title="Filter" contentClassName="w-[26rem]">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <SelectField
          name="type"
          options={requestTypesOptions}
          control={form.control}
          label="Type"
        />
        <SelectField
          name="createdBy"
          options={usersOptions}
          control={form.control}
          label="Created By"
        />
        <SelectField
          name="assignedTo"
          options={usersOptions}
          control={form.control}
          label="Assigned To"
        />
        <div className="flex mt-7 gap-4">
          <Button variant={ButtonVariant.SECONDARY} label="Reset filters" type="reset" />
          <Button variant={ButtonVariant.PRIMARY} label="Apply filter" type="submit" />
        </div>
      </form>
    </Modal>
  );
};
