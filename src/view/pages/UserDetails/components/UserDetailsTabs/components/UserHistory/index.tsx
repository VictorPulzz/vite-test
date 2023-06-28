import { Table } from '@appello/web-ui';
import { TableLoader } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { useListQueryParams } from '@appello/web-ui';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { PAGE_SIZE } from '~/constants/pagination';
import { LogFilter } from '~/services/gql/__generated__/globalTypes';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';

import { useFetchUserHistoryListQuery } from '../../../../__generated__/schema';
import { USERS_HISTORY_TABLE_COLUMNS } from './consts';

export const UserHistory: FC = () => {
  const { offset, setOffset } = useListQueryParams<LogFilter>();
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
          data={data.logList.results}
          columns={USERS_HISTORY_TABLE_COLUMNS}
          setOffset={setOffset}
          offset={offset}
          onPageChange={gqlTableFetchMore(fetchMore)}
          totalCount={data.logList.count}
        />
      )}
    </>
  );
};
