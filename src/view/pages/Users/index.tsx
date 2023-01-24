// import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant } from '@ui/components/common/Button';
import { EmptyState } from '@ui/components/common/EmptyState';
import { Table } from '@ui/components/common/Table';
import { TableLoader } from '@ui/components/common/TableLoader';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

// import { PAGE_SIZE } from '~/constants/pagination';
import { ROUTES } from '~/constants/routes';
// import { Sorting } from '~/types';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
// import { ClientFilter, ClientOrder } from '~/services/gql/__generated__/globalTypes';
// import { isNil } from '~/utils/isNil';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { SearchInput } from '~/view/ui/components/common/SearchInput';
import { SelectField } from '~/view/ui/components/form/SelectField';

// import { useFetchUsersQuery } from './__generated__/schema';
import { EMPLOYEES_TABLE_COLUMNS } from './consts';

// import { useFetchClientsQuery } from './__generated__/schema';
// import { ClientsFilterModal } from './components/ClientsFilterModal';
// import { CLIENTS_TABLE_COLUMNS } from './consts';

// TODO remove usersTestData when backend will be ready
export enum UsersPageFilterEnum {
  FRONT_END = 'FRONTEND',
  BACK_END = 'BACKEND',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

// TODO remove usersTestData when backend will be ready
const usersTestData = [
  {
    id: 1,
    fullName: 'Jhon Snow',
    photo: null,
    department: 'Frontend',
    email: 'snow@com',
    isActive: true,
  },
  {
    id: 2,
    fullName: 'Adam Grey',
    photo: 'https://picsum.photos/26/26?random=2',
    department: 'Backend',
    email: 'grey@com',
    isActive: false,
  },
  {
    id: 3,
    fullName: 'Bob Black',
    photo: 'https://picsum.photos/26/26?random=3',
    department: 'Backend',
    email: 'black@com',
    isActive: true,
  },
  {
    id: 4,
    fullName: 'Jack Green',
    photo: 'https://picsum.photos/26/26?random=4',
    department: 'Backend',
    email: 'green@com',
    isActive: false,
  },
];

export const UsersPage: FC = () => {
  const { control } = useForm();
  // const [searchValue, setSearchValue] = useState('');
  // TODO remove any
  // const [sorting, setSorting] = useState<Sorting<any>>([]);
  // const [filter, setFilter] = useState<Nullable<ClientFilter>>(null);

  // const filtersCount = useMemo(() => {
  //   return Object.values(filter || {}).filter(value => !isNil(value)).length;
  // }, [filter]);

  // const {
  //   value: isFilterModalOpen,
  //   on: openFilterModal,
  //   off: closeFilterModal,
  // } = useSwitchValue(false);

  // const { data, loading, fetchMore } = useFetchUsersQuery();

  const usersFilterOptions = enumToSelectOptions(UsersPageFilterEnum);

  // TODO remove usersTestData later
  const data = {
    loading: false,
    employeesList: usersTestData,
  };

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Users</h1>
          <p className="text-c1 text-gray-2">
            {(data && data.employeesList.length) ?? 0} users in total
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
      {data.loading && <TableLoader className="mt-10" />}
      {data && data.employeesList.length === 0 && (
        <EmptyState iconName="users" label="No users here yet" />
      )}
      {!data.loading && data && data.employeesList.length > 0 && (
        <Table
          className="mt-6"
          data={data.employeesList}
          columns={EMPLOYEES_TABLE_COLUMNS}
          // sorting={sorting}
          // setSorting={setSorting}
          // fetchMore={fetchMore}
          totalCount={data.employeesList.length}
        />
      )}
    </SidebarLayout>
  );
};
