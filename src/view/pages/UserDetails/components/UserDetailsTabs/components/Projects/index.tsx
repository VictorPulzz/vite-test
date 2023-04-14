import { useMountEffect } from '@appello/common/lib/hooks';
import { EmptyState } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import { TableLoader } from '@appello/web-ui';
import { useListQueryParams } from '@appello/web-ui';
import React, { FC } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';

import { useFetchUserProjectsListQuery } from '../../../../__generated__/schema';
import { USERS_PROJECTS_TABLE_COLUMNS } from './consts';

interface Props {
  userId: number;
}

export const Projects: FC<Props> = ({ userId }) => {
  const { offset, setOffset } = useListQueryParams();

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

  useMountEffect(() => {
    setOffset(0);
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
          data={data.userProjects.results}
          columns={USERS_PROJECTS_TABLE_COLUMNS}
          setOffset={setOffset}
          offset={offset}
          fetchMore={fetchMore}
          totalCount={data.userProjects.count}
        />
      )}
    </>
  );
};
