import { Table } from '@ui/components/common/Table';
import { TableLoader } from '@ui/components/common/TableLoader';
import React, { FC, useEffect } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { Permission } from '~/constants/permissions';
import { LogFilter } from '~/services/gql/__generated__/globalTypes';
import { NoAccessMessage } from '~/view/components/NoAccessMessage';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { useListQueryParams } from '~/view/ui/hooks/useListQueryParams';

import { useFetchUserHistoryListQuery } from '../../__generated__/schema';
import { USERS_HISTORY_TABLE_COLUMNS } from './consts';

interface Props {
  userId: number;
}

export const UserHistory: FC<Props> = ({ userId }) => {
  const canReadUserHistory = useHasAccess(Permission.READ_USER_HISTORY);

  const { offset, setOffset } = useListQueryParams<LogFilter>();

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

  useEffect(() => {
    setOffset(0);
  }, []);

  return (
    <div>
      {canReadUserHistory ? (
        <>
          <h2 className="text-p1 font-bold">History</h2>
          {loading && <TableLoader className="mt-10" />}
          {data && data.logList.results.length === 0 && (
            <div className="flex h-[70vh]">
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
              fetchMore={fetchMore}
              totalCount={data.logList.count}
            />
          )}
        </>
      ) : (
        <NoAccessMessage className="h-[70vh]" />
      )}
    </div>
  );
};
