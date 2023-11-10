import { useListQueryParams } from '@appello/web-kit';
import { EmptyState, Table, TableLoader, useAppelloKit } from '@appello/web-ui';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { PAGE_SIZE } from '~/constants/pagination';
import { LogFilter } from '~/services/gql/__generated__/globalTypes';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';

import { useFetchUserHistoryListQuery } from '../../../../__generated__/schema';
import { USERS_HISTORY_TABLE_COLUMNS } from './consts';

export const UserHistory: FC = () => {
  const { pageSize } = useAppelloKit();
  const { offset, setOffset } = useListQueryParams<LogFilter>(pageSize);
  const params = useParams();
  const userId = Number(params.id);

  const { data, loading, fetchMore } = useFetchUserHistoryListQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      filters: {
        userId,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <>
      <h2 className="text-p1 font-bold">History</h2>
      {loading && <TableLoader className="mt-10" />}
      {data && data.logList.results.length === 0 && (
        <div className="flex h-full items-center">
          <EmptyState iconName="list" label="No history here yet" />
        </div>
      )}
      {!loading && data && data.logList.results.length > 0 && (
        <Table
          className="mt-6"
          columns={USERS_HISTORY_TABLE_COLUMNS}
          data={data.logList.results}
          offset={offset}
          setOffset={setOffset}
          totalCount={data.logList.count}
          onPageChange={gqlTableFetchMore(fetchMore)}
        />
      )}
    </>
  );
};
