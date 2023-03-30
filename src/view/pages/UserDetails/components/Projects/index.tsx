import React, { FC, useEffect } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Table } from '~/view/ui/components/common/Table';
import { TableLoader } from '~/view/ui/components/common/TableLoader';
import { useListQueryParams } from '~/view/ui/hooks/useListQueryParams';

import { useFetchUserProjectsListQuery } from '../../__generated__/schema';
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

  useEffect(() => {
    setOffset(0);
  }, []);

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
