import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import { TableLoader } from '@appello/web-ui';
import { SearchInput } from '@appello/web-ui';
import { useListQueryParams } from '@appello/web-ui';
import React, { FC } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { UserFilter } from '~/services/gql/__generated__/globalTypes';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useFetchUsersQuery } from './__generated__/schema';
import { UsersFilterModal } from './components/UsersFilterModal';
import { useUsersTableColumns } from './hooks/useUsersTableColumns';

export const UsersPage: FC = () => {
  const canReadUsersList = useHasAccess(Permission.READ_USERS_LIST);
  const canCreateUser = useHasAccess(Permission.CREATE_USER);

  const usersTableColumns = useUsersTableColumns();

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
    skip: !canReadUsersList,
    fetchPolicy: 'cache-and-network',
  });

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Users</h1>
          <p className="text-p5 text-gray-2">
            {(data && data.usersList.count) ?? 0} users in total
          </p>
        </div>
        {canCreateUser && (
          <Button
            label="Add user"
            withIcon="plus"
            variant={ButtonVariant.PRIMARY}
            className="w-40"
            to={ROUTES.ADD_USER}
          />
        )}
      </div>
      <div className="mt-5 flex gap-3">
        <SearchInput
          defaultValue={searchValue}
          onChange={setSearchValue}
          placeholder="Search users"
          className="flex-1"
        />
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
          columns={usersTableColumns}
          setOffset={setOffset}
          offset={offset}
          onPageChange={gqlTableFetchMore(fetchMore)}
          totalCount={data.usersList.count}
        />
      )}
      <UsersFilterModal isOpen={isFilterModalOpen} close={closeFilterModal} setFilter={setFilter} />
    </SidebarLayout>
  );
};
