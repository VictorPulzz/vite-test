import React, { FC, useMemo } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { ALL_SELECT_OPTION } from '~/constants/select';
import { LogFilter } from '~/services/gql/__generated__/globalTypes';
import { SectionContainer } from '~/view/components/SectionContainer';
import {
  useFetchAllUsersQuery,
  useFetchHistoryLogsQuery,
} from '~/view/pages/ProjectDetails/__generated__/schema';
import { Table } from '~/view/ui/components/common/Table';
import { TableLoader } from '~/view/ui/components/common/TableLoader';
import { Select } from '~/view/ui/components/form/Select';
import { useListQueryParams } from '~/view/ui/hooks/useListQueryParams';

import { HISTORY_TABLE_COLUMNS } from './consts';

export const History: FC = () => {
  const { offset, setOffset, filter, setFilter } = useListQueryParams<LogFilter>();

  const { data } = useFetchAllUsersQuery({
    variables: {
      pagination: {},
    },
    fetchPolicy: 'cache-and-network',
  });

  const usersOptions = useMemo(() => {
    if (data?.usersList.results) {
      return data?.usersList.results.map(({ id, fullName }) => ({
        value: Number(id),
        label: fullName ?? '',
      }));
    }
    return [];
  }, [data?.usersList.results]);

  const {
    data: tableData,
    loading,
    fetchMore,
  } = useFetchHistoryLogsQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      filters: filter,
    },
    fetchPolicy: 'cache-and-network',
  });

  const filterByUserOptions = [ALL_SELECT_OPTION, ...usersOptions];

  return (
    <div className="flex flex-col gap-5">
      <SectionContainer title="History">
        <Select
          className="w-40"
          options={filterByUserOptions}
          value={filter?.userId}
          placeholder="Status"
          onChange={value => setFilter({ userId: value })}
        />
        {loading && <TableLoader className="mt-10" />}
        {!loading && tableData && tableData.logList.results.length > 0 && (
          <Table
            className="mt-4"
            data={tableData.logList.results}
            columns={HISTORY_TABLE_COLUMNS}
            setOffset={setOffset}
            offset={offset}
            fetchMore={fetchMore}
          />
        )}
      </SectionContainer>
    </div>
  );
};
