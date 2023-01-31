// import { useUpdateEffect } from '@appello/common/lib/hooks';
import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import { SelectField } from '@ui/components/form/SelectField';
import React, { FC, useCallback, useMemo } from 'react';

import { UserFilter } from '~/services/gql/__generated__/globalTypes';

import { useFetchDepartmentsListQuery, useFetchRolesListQuery } from '../../__generated__/schema';
import { useUserFilterForm } from './hooks/useUserFilterForm';

export interface UsersFilterModalProps extends Pick<ModalProps, 'isOpen' | 'close'> {
  setFilter: (filter: Nullable<UserFilter>) => void;
}

export const UsersFilterModal: FC<UsersFilterModalProps> = ({
  isOpen,
  close,

  setFilter,
}) => {
  const { data: rolesList } = useFetchRolesListQuery();
  const { data: departmentsList } = useFetchDepartmentsListQuery();

  const { form, handleSubmit, resetForm } = useUserFilterForm({
    setFilter,
    onSubmitSuccessful: () => {
      close();
    },
  });

  const rolesOptions = useMemo(() => {
    if (rolesList?.rolesList) {
      return rolesList?.rolesList.map(({ id, name }) => ({
        value: String(id),
        label: name,
      }));
    }
    return [];
  }, [rolesList?.rolesList]);

  const departmentsOptions = useMemo(() => {
    if (departmentsList?.departmentsList) {
      return departmentsList?.departmentsList.map(({ id, name }) => ({
        value: String(id),
        label: name,
      }));
    }
    return [];
  }, [departmentsList?.departmentsList]);

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
    <Modal isOpen={isOpen} close={close} title="Filter" contentClassName="w-[26rem]">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <SelectField name="role" options={rolesOptions} control={form.control} label="Role" />
        <SelectField
          name="department"
          options={departmentsOptions}
          control={form.control}
          label="Department"
        />
        <SelectField name="status" options={statusOptions} control={form.control} label="Status" />
        <div className="flex mt-7 gap-4">
          <Button variant={ButtonVariant.SECONDARY} label="Reset filters" type="reset" />
          <Button variant={ButtonVariant.PRIMARY} label="Apply filter" type="submit" />
        </div>
      </form>
    </Modal>
  );
};
