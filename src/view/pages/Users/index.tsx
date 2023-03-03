import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant } from '@ui/components/common/Button';
import { EmptyState } from '@ui/components/common/EmptyState';
import { Table } from '@ui/components/common/Table';
import { TableLoader } from '@ui/components/common/TableLoader';
import React, { FC } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { ROUTES } from '~/constants/routes';
import { UserFilter } from '~/services/gql/__generated__/globalTypes';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { SearchInput } from '~/view/ui/components/common/SearchInput';
import { useListQueryParams } from '~/view/ui/hooks/useListQueryParams';

import { useFetchUsersQuery } from './__generated__/schema';
import { UsersFilterModal } from './components/UsersFilterModal';
import { USERS_TABLE_COLUMNS } from './consts';

export const UsersPage: FC = () => {
  const { searchValue, setSearchValue, offset, setOffset, setFilter, filter, filtersCount } =
    useListQueryParams<UserFilter>();
  const {
    value: isFilterModalOpen,
    on: openFilterModal,
    off: closeFilterModal,
  } = useSwitchValue(false);

  const { data, loading, fetchMore } = useFetchUsersQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      search: searchValue,
      filters: filter,
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Users</h1>
          <p className="text-c1 text-gray-2">
            {(data && data.usersList.count) ?? 0} users in total
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
        <SearchInput onChange={setSearchValue} placeholder="Search users" className="flex-1" />
        <Button
          variant={ButtonVariant.SECONDARY}
          label="Filter"
          className="w-28"
          onClick={openFilterModal}
          count={filtersCount || undefined}
        />
      </div>
      {loading && <TableLoader className="mt-10" />}
      {data && data.usersList.results.length === 0 && (
        <EmptyState iconName="users" label="No users here yet" />
      )}
      {!loading && data && data.usersList.results.length > 0 && (
        <Table
          className="mt-6"
          data={data.usersList.results}
          columns={USERS_TABLE_COLUMNS}
          setOffset={setOffset}
          offset={offset}
          fetchMore={fetchMore}
          totalCount={data.usersList.count}
        />
      )}
      <UsersFilterModal isOpen={isFilterModalOpen} close={closeFilterModal} setFilter={setFilter} />
    </SidebarLayout>
  );
};
