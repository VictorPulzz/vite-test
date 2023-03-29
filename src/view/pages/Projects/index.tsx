import { Button, ButtonVariant } from '@ui/components/common/Button';
import { EmptyState } from '@ui/components/common/EmptyState';
import React, { FC } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { ALL_SELECT_OPTION } from '~/constants/select';
import { ProjectFilter, StatusEnum } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { NoAccessMessage } from '~/view/components/NoAccessMessage';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { SearchInput } from '~/view/ui/components/common/SearchInput';
import { Table } from '~/view/ui/components/common/Table';
import { TableLoader } from '~/view/ui/components/common/TableLoader';
import { Select } from '~/view/ui/components/form/Select';
import { useListQueryParams } from '~/view/ui/hooks/useListQueryParams';

import { useFetchProjectsQuery } from './__generated__/schema';
import { PROJECTS_TABLE_COLUMNS, PROJECTS_TABLE_COLUMNS_NO_USER_DETAILS } from './consts';

export const ProjectsPage: FC = () => {
  const canReadProjectsList = useHasAccess(Permission.READ_PROJECTS_LIST);
  const canCreateProject = useHasAccess(Permission.CREATE_PROJECT);
  const canReadUserDetails = useHasAccess(Permission.READ_USER_DETAILS);

  const { searchValue, setSearchValue, offset, setOffset, setFilter, filter } =
    useListQueryParams<ProjectFilter>();

  const { data, loading, fetchMore } = useFetchProjectsQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      search: searchValue,
      filters: filter,
    },
    skip: !canReadProjectsList,
    fetchPolicy: 'cache-and-network',
  });

  const statusOptions = [ALL_SELECT_OPTION, ...enumToSelectOptions(StatusEnum)];

  return (
    <SidebarLayout contentClassName="p-6">
      {canReadProjectsList ? (
        <>
          {' '}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-h4">Projects</h1>
              <p className="text-c1 text-gray-2">
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
              onChange={setSearchValue}
              placeholder="Search projects"
              className="flex-1"
            />
            <Select
              className="w-40"
              options={statusOptions}
              value={filter?.status}
              placeholder="Status"
              onChange={value => setFilter({ status: value })}
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
              columns={
                canReadUserDetails ? PROJECTS_TABLE_COLUMNS : PROJECTS_TABLE_COLUMNS_NO_USER_DETAILS
              }
              setOffset={setOffset}
              offset={offset}
              fetchMore={fetchMore}
              totalCount={data.projectsList.count}
            />
          )}
        </>
      ) : (
        <NoAccessMessage className="flex-auto bg-white" />
      )}
    </SidebarLayout>
  );
};
