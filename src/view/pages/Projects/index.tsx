// import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant } from '@ui/components/common/Button';
import { SearchInput } from '@ui/components/common/SearchInput';
// import { EmptyState } from '@ui/components/common/EmptyState';
// import { Table } from '@ui/components/common/Table';
// import { TableLoader } from '@ui/components/common/TableLoader';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

// import { PAGE_SIZE } from '~/constants/pagination';
// import { ROUTES } from '~/constants/routes';
// import { ClientFilter, ClientOrder } from '~/services/gql/__generated__/globalTypes';
// import { Sorting } from '~/types';
// import { isNil } from '~/utils/isNil';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { SelectField } from '~/view/ui/components/form/SelectField';

// import { useFetchClientsQuery } from './__generated__/schema';
// import { ClientsFilterModal } from './components/ClientsFilterModal';
// import { CLIENTS_TABLE_COLUMNS } from './consts';

export const ProjectsPage: FC = () => {
  const { control } = useForm();
  // const [searchValue, setSearchValue] = useState('');
  // const [sorting, setSorting] = useState<Sorting<ClientOrder>>([]);
  // const [filter, setFilter] = useState<Nullable<ClientFilter>>(null);

  // const filtersCount = useMemo(() => {
  //   return Object.values(filter || {}).filter(value => !isNil(value)).length;
  // }, [filter]);

  // const {
  //   value: isFilterModalOpen,
  //   on: openFilterModal,
  //   off: closeFilterModal,
  // } = useSwitchValue(false);

  // const { data, loading, fetchMore } = useFetchClientsQuery({
  //   variables: {
  //     pagination: {
  //       limit: PAGE_SIZE,
  //       offset: 0,
  //     },
  //     ordering: sorting,
  //     search: searchValue,
  //     filters: filter,
  //   },
  //   fetchPolicy: 'cache-and-network',
  // });

  const statusOptions = [
    {
      label: 'Design',
      value: 1,
    },
    {
      label: 'In dev',
      value: 2,
    },
    {
      label: 'On hold',
      value: 3,
    },
    {
      label: 'Complete',
      value: 4,
    },
  ];

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Projects</h1>
          <p className="text-c1 text-gray-2">78 projects in total</p>
        </div>
        <Button
          label="New project"
          withIcon="plus"
          variant={ButtonVariant.PRIMARY}
          className="w-40"
          // to={ROUTES.ADD_CLIENT}
        />
      </div>
      <div className="mt-5 flex gap-3">
        <SearchInput
          // onChange={setSearchValue}
          onChange={() => null}
          placeholder="Search projects"
          className="flex-1"
        />
        <SelectField
          className="w-40"
          name="group"
          options={statusOptions}
          control={control}
          // placeholder="Select status..."
        />
      </div>
      {/* {loading && <TableLoader className="mt-10" />}
      {data && data.clientList.results.length === 0 && (
        <EmptyState iconName="users" label="No clients here yet" />
      )}
      {!loading && data && data.clientList.results.length > 0 && (
        <Table
          className="mt-6"
          data={data.clientList.results}
          columns={CLIENTS_TABLE_COLUMNS}
          sorting={sorting}
          setSorting={setSorting}
          fetchMore={fetchMore}
          totalCount={data.clientList.count}
        />
      )}
      <ClientsFilterModal
        isOpen={isFilterModalOpen}
        close={closeFilterModal}
        filter={filter}
        setFilter={setFilter}
      /> */}
    </SidebarLayout>
  );
};
