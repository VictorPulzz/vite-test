import { Button, ButtonVariant, useSelectOptions } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import React, { FC, useCallback } from 'react';

import { UserFilter } from '~/services/gql/__generated__/globalTypes';

import { useFetchDepartmentsListQuery, useFetchRolesListQuery } from '../../__generated__/schema';
import { useUserFilterForm } from './hooks/useUserFilterForm';

export interface UsersFilterModalProps extends Pick<ModalProps, 'isOpen' | 'close'> {
  setFilter: (filter: Nullable<UserFilter>) => void;
}

export const UsersFilterModal: FC<UsersFilterModalProps> = ({ isOpen, close, setFilter }) => {
  const { data: rolesList } = useFetchRolesListQuery();
  const { data: departmentsList } = useFetchDepartmentsListQuery();

  const { form, handleSubmit, resetForm } = useUserFilterForm({
    setFilter,
    onSubmitSuccessful: () => {
      close();
    },
  });

  const departmentsOptions = useSelectOptions(departmentsList?.departmentsList, {
    value: 'value',
    label: 'label',
  });

  const rolesOptions = useSelectOptions(rolesList?.rolesList, {
    value: 'value',
    label: 'label',
  });

  const statusOptions = [
    {
      label: 'Active',
      value: true,
    },
    {
      label: 'Inactive',
      value: false,
    },
  ];

  const handleReset = useCallback(() => {
    resetForm();
    setFilter(null);
    close();
  }, [resetForm, setFilter, close]);

  return (
    <Modal close={close} contentClassName="w-[26rem]" isOpen={isOpen} title="Filter">
      <form onReset={handleReset} onSubmit={handleSubmit}>
        <SelectField control={form.control} label="Role" name="role" options={rolesOptions} />
        <SelectField
          control={form.control}
          label="Department"
          name="department"
          options={departmentsOptions}
        />
        <SelectField control={form.control} label="Status" name="status" options={statusOptions} />
        <div className="flex mt-7 gap-4">
          <Button label="Reset filters" type="reset" variant={ButtonVariant.SECONDARY} />
          <Button label="Apply filter" type="submit" variant={ButtonVariant.PRIMARY} />
        </div>
      </form>
    </Modal>
  );
};
