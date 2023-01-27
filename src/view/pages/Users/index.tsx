import { Button, ButtonVariant } from '@ui/components/common/Button';
import { EmptyState } from '@ui/components/common/EmptyState';
import { Table } from '@ui/components/common/Table';
import { TableLoader } from '@ui/components/common/TableLoader';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ROUTES } from '~/constants/routes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { SearchInput } from '~/view/ui/components/common/SearchInput';
import { SelectField } from '~/view/ui/components/form/SelectField';

import { useFetchUsersQuery } from './__generated__/schema';
import { USERS_TABLE_COLUMNS } from './consts';

// TODO remove usersTestData when backend will be ready
export enum UsersPageFilterEnum {
  FRONT_END = 'FRONTEND',
  BACK_END = 'BACKEND',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const UsersPage: FC = () => {
  const { control } = useForm();
  // TODO fix when backend will be ready
  // const [searchValue, setSearchValue] = useState('');

  // const [sorting, setSorting] = useState<Sorting<any>>([]);
  // const [filter, setFilter] = useState<Nullable<ClientFilter>>(null);

  // const filtersCount = useMemo(() => {
  //   return Object.values(filter || {}).filter(value => !isNil(value)).length;
  // }, [filter]);

  const { data, loading } = useFetchUsersQuery();

  const usersFilterOptions = enumToSelectOptions(UsersPageFilterEnum);

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Users</h1>
          <p className="text-c1 text-gray-2">
            {(data && data.usersList.length) ?? 0} users in total
          </p>
        </div>
        <Button
          label="Add user"
          withIcon="plus"
          variant={ButtonVariant.PRIMARY}
          className="w-40"
          to={ROUTES.ADD_USER}
        />
      </div>
      <div className="mt-5 flex gap-3">
        <SearchInput
          // onChange={setSearchValue}
          onChange={() => null}
          placeholder="Search users"
          className="flex-1"
        />
        <SelectField className="w-40" name="group" options={usersFilterOptions} control={control} />
      </div>
      {loading && <TableLoader className="mt-10" />}
      {data && data.usersList.length === 0 && (
        <EmptyState iconName="users" label="No users here yet" />
      )}
      {!loading && data && data.usersList.length > 0 && (
        <Table
          className="mt-6"
          data={data.usersList}
          columns={USERS_TABLE_COLUMNS}
          // sorting={sorting}
          // setSorting={setSorting}
          // fetchMore={fetchMore}
          totalCount={data.usersList.length}
        />
      )}
    </SidebarLayout>
  );
};
