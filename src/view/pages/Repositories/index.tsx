import { Button, ButtonVariant } from '@ui/components/common/Button';
import { EmptyState } from '@ui/components/common/EmptyState';
import React, { FC } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { ROUTES } from '~/constants/routes';
import { ALL_SELECT_OPTION } from '~/constants/select';
import {
  RepositoryFilter,
  RepositoryPlatformChoice,
} from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { SearchInput } from '~/view/ui/components/common/SearchInput';
import { Table } from '~/view/ui/components/common/Table';
import { TableLoader } from '~/view/ui/components/common/TableLoader';
import { Select } from '~/view/ui/components/form/Select';
import { useListQueryParams } from '~/view/ui/hooks/useListQueryParams';

import { useFetchRepositoriesQuery } from './__generated__/schema';
import { REPOSITORIES_TABLE_COLUMNS } from './consts';

export const RepositoriesPage: FC = () => {
  const { searchValue, setSearchValue, offset, setOffset, setFilter, filter } =
    useListQueryParams<RepositoryFilter>();

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

  const platformOptions = [ALL_SELECT_OPTION, ...enumToSelectOptions(RepositoryPlatformChoice)];

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Repositories</h1>
          <p className="text-c1 text-gray-2">
            {(data && data.repositoryList.count) ?? 0} repositories in total
          </p>
        </div>
        <Button
          label="Add repository"
          withIcon="plus"
          variant={ButtonVariant.PRIMARY}
          className="w-40"
          to={ROUTES.ADD_REPOSITORY}
        />
      </div>
      <div className="mt-5 flex gap-3">
        <SearchInput
          onChange={setSearchValue}
          placeholder="Search repositories"
          className="flex-1"
        />
        <Select
          className="w-40"
          options={platformOptions}
          value={filter?.platform}
          placeholder="Platform"
          onChange={value => setFilter({ platform: value })}
        />
      </div>
      {loading && <TableLoader className="mt-10" />}
      {data && data.repositoryList.results.length === 0 && (
        <EmptyState iconName="repositories" label="No repositories here yet" />
      )}
      {!loading && data && data.repositoryList.results.length > 0 && (
        <Table
          className="mt-6"
          data={data.repositoryList.results.slice().reverse()}
          columns={REPOSITORIES_TABLE_COLUMNS}
          setOffset={setOffset}
          offset={offset}
          fetchMore={fetchMore}
          totalCount={data.repositoryList.count}
        />
      )}
    </SidebarLayout>
  );
};
