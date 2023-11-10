import { useListQueryParams } from '@appello/web-kit';
import { EmptyState, Table, TableLoader, useAppelloKit } from '@appello/web-ui';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { PAGE_SIZE } from '~/constants/pagination';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';

import { useFetchUserProjectsListQuery } from '../../../../__generated__/schema';
import { USERS_PROJECTS_TABLE_COLUMNS } from './consts';

export const Projects: FC = () => {
  const { pageSize } = useAppelloKit();

  const { offset, setOffset } = useListQueryParams(pageSize);
  const params = useParams();
  const userId = params.id ? Number(params.id) : 0;

  const { data, loading, fetchMore } = useFetchUserProjectsListQuery({
    variables: {
      input: { id: userId },
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <>
      {loading && <TableLoader className="mt-10" />}
      {data && data.userProjects.results.length === 0 && (
        <div className="flex h-full items-center">
          <EmptyState iconName="projects" label="No projects here yet" />
        </div>
      )}
      {!loading && data && data.userProjects.results.length > 0 && (
        <Table
          className="mt-6"
          columns={USERS_PROJECTS_TABLE_COLUMNS}
          data={data.userProjects.results}
          offset={offset}
          setOffset={setOffset}
          totalCount={data.userProjects.count}
          onPageChange={gqlTableFetchMore(fetchMore)}
        />
      )}
    </>
  );
};
