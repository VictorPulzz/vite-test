import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { SearchInput } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import { TableLoader } from '@appello/web-ui';
import { useListQueryParams } from '@appello/web-ui';
import React, { FC } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { ROUTES } from '~/constants/routes';
import { RepositoryFilter } from '~/services/gql/__generated__/globalTypes';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useFetchRepositoriesQuery } from './__generated__/schema';
import { RepositoriesFilterModal } from './components/RepositoriesFilterModal';
import { useRepositoriesTableColumns } from './hooks/useRepositoriesTableColumns';

export const RepositoriesPage: FC = () => {
  const { canReadReposList, canCreateRepository } = useUserPermissions();

  const { searchValue, setSearchValue, offset, setOffset, filter, setFilter, filtersCount } =
    useListQueryParams<RepositoryFilter>();

  const repositoriesTableColumns = useRepositoriesTableColumns();

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
    skip: !canReadReposList,
    fetchPolicy: 'cache-and-network',
  });

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Repositories</h1>
          <p className="text-p5 text-gray-2">
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
          defaultValue={searchValue}
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
          columns={repositoriesTableColumns}
          setOffset={setOffset}
          offset={offset}
          onPageChange={gqlTableFetchMore(fetchMore)}
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
