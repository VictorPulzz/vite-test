import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { SearchInput } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import { TableLoader } from '@appello/web-ui';
import { Select } from '@appello/web-ui';
import { useSelectOptions } from '@appello/web-ui';
import { useListQueryParams } from '@appello/web-ui';
import React, { FC } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { ROUTES } from '~/constants/routes';
import { ALL_SELECT_OPTION } from '~/constants/select';
import { ProjectFilter, ProjectSort } from '~/services/gql/__generated__/globalTypes';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';
import { useSortingState } from '~/view/hooks/useSortingState';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useFetchProjectStatusesListQuery } from '../CreateOrUpdateProject/__generated__/schema';
import { useFetchProjectsQuery } from './__generated__/schema';
import { useProjectsTableColumns } from './hooks/useProjectsTableColumns';

export const ProjectsPage: FC = () => {
  const { canReadProjectsList, canCreateProject } = useUserPermissions();

  const projectsListColumns = useProjectsTableColumns();

  const { sorting, tableSorting, setTableSorting } = useSortingState<ProjectSort>();

  const { searchValue, setSearchValue, offset, setOffset, filter, setFilter } =
    useListQueryParams<ProjectFilter>();

  const { data, loading, fetchMore } = useFetchProjectsQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      search: searchValue,
      filters: filter,
      sort: sorting,
    },
    skip: !canReadProjectsList,
    fetchPolicy: 'cache-and-network',
  });

  const { data: statuses } = useFetchProjectStatusesListQuery({
    fetchPolicy: 'cache-and-network',
  });

  const statusOptions = [
    ALL_SELECT_OPTION,
    ...useSelectOptions(statuses?.projectStatusesList.results, {
      value: 'value',
      label: 'label',
    }),
  ];

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Projects</h1>
          <p className="text-p5 text-gray-2">
            {(data && data.projectsList.count) ?? 0} projects in total
          </p>
        </div>
        {canCreateProject && (
          <Button
            label="New project"
            withIcon="plus"
            variant={ButtonVariant.PRIMARY}
            className="w-40"
            to={ROUTES.ADD_PROJECT}
          />
        )}
      </div>
      <div className="mt-5 flex gap-3">
        <SearchInput
          defaultValue={searchValue}
          onChange={setSearchValue}
          placeholder="Search projects"
          className="flex-1"
        />
        <Select
          className="w-40"
          options={statusOptions}
          value={filter?.statusId}
          placeholder="Status"
          onChange={value => setFilter({ statusId: value })}
        />
      </div>
      {loading && <TableLoader className="mt-10" />}
      {data && data.projectsList.results.length === 0 && (
        <EmptyState iconName="projects" label="No projects here yet" />
      )}
      {!loading && data && data.projectsList.results.length > 0 && (
        <Table
          className="mt-6"
          data={data.projectsList.results}
          columns={projectsListColumns}
          setOffset={setOffset}
          offset={offset}
          onPageChange={gqlTableFetchMore(fetchMore)}
          totalCount={data.projectsList.count}
          sorting={tableSorting}
          setSorting={setTableSorting}
        />
      )}
    </SidebarLayout>
  );
};
