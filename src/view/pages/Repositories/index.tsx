import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { Button, ButtonVariant } from '@ui/components/common/Button';
import { EmptyState } from '@ui/components/common/EmptyState';
import React, { FC } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { RepositoryFilter } from '~/services/gql/__generated__/globalTypes';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { SearchInput } from '~/view/ui/components/common/SearchInput';
import { Table } from '~/view/ui/components/common/Table';
import { TableLoader } from '~/view/ui/components/common/TableLoader';
import { useListQueryParams } from '~/view/ui/hooks/useListQueryParams';

import { useFetchRepositoriesQuery } from './__generated__/schema';
import { RepositoriesFilterModal } from './components/RepositoriesFilterModal';
import { REPOSITORIES_TABLE_COLUMNS, REPOSITORIES_TABLE_COLUMNS_NO_DETAILS } from './consts';

export const RepositoriesPage: FC = () => {
  const canCreateRepository = useHasAccess(Permission.CREATE_REPOSITORY);
  const canReadRepoDetails = useHasAccess(Permission.READ_REPO_DETAILS);

  const { searchValue, setSearchValue, offset, setOffset, filter, setFilter, filtersCount } =
    useListQueryParams<RepositoryFilter>();

  const {
    value: isFilterModalOpen,
    on: openFilterModal,
    off: closeFilterModal,
  } = useSwitchValue(false);

  const { data, loading, fetchMore } = useFetchRepositoriesQuery({
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
          <h1 className="text-h4">Repositories</h1>
          <p className="text-c1 text-gray-2">
            {(data && data.repositoryList.count) ?? 0} repositories in total
          </p>
        </div>
        {canCreateRepository && (
          <Button
            label="Add repository"
            withIcon="plus"
            variant={ButtonVariant.PRIMARY}
            className="w-40"
            to={ROUTES.ADD_REPOSITORY}
          />
        )}
      </div>
      <div className="mt-5 flex gap-3 items-start">
        <SearchInput
          onChange={setSearchValue}
          placeholder="Search repositories"
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
      {data && data.repositoryList.results.length === 0 && (
        <EmptyState iconName="repositories" label="No repositories here yet" />
      )}
      {!loading && data && data.repositoryList.results?.length > 0 && (
        <Table
          className="mt-6"
          data={data?.repositoryList.results}
          columns={
            canReadRepoDetails ? REPOSITORIES_TABLE_COLUMNS : REPOSITORIES_TABLE_COLUMNS_NO_DETAILS
          }
          setOffset={setOffset}
          offset={offset}
          fetchMore={fetchMore}
          totalCount={data.repositoryList.count}
        />
      )}
      <RepositoriesFilterModal
        isOpen={isFilterModalOpen}
        close={closeFilterModal}
        setFilter={setFilter}
      />
    </SidebarLayout>
  );
};
