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
            className="w-40"
            label="Add repository"
            to={ROUTES.ADD_REPOSITORY}
            variant={ButtonVariant.PRIMARY}
            withIcon="plus"
          />
        )}
      </div>
      <div className="mt-5 flex gap-3 items-start">
        <SearchInput
          className="flex-1"
          defaultValue={searchValue}
          placeholder="Search repositories"
          onChange={setSearchValue}
        />
        <Button
          className="w-28"
          count={filtersCount || undefined}
          label="Filter"
          variant={ButtonVariant.SECONDARY}
          onClick={openFilterModal}
        />
      </div>
      {loading && <TableLoader className="mt-10" />}
      {data && data.repositoryList.results.length === 0 && (
        <EmptyState iconName="repositories" label="No repositories here yet" />
      )}
      {!loading && data && data.repositoryList.results?.length > 0 && (
        <Table
          className="mt-6"
          columns={repositoriesTableColumns}
          data={data?.repositoryList.results}
          offset={offset}
          setOffset={setOffset}
          totalCount={data.repositoryList.count}
          onPageChange={gqlTableFetchMore(fetchMore)}
        />
      )}
      <RepositoriesFilterModal
        close={closeFilterModal}
        isOpen={isFilterModalOpen}
        setFilter={setFilter}
      />
    </SidebarLayout>
  );
};
