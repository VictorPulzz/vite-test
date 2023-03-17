import React, { FC, useEffect, useMemo } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { ALL_SELECT_OPTION } from '~/constants/select';
import { LogFilter } from '~/services/gql/__generated__/globalTypes';
import { SectionContainer } from '~/view/components/SectionContainer';
import {
  useFetchAllUsersQuery,
  useFetchHistoryLogsQuery,
} from '~/view/pages/ProjectDetails/__generated__/schema';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Table } from '~/view/ui/components/common/Table';
import { TableLoader } from '~/view/ui/components/common/TableLoader';
import { Select } from '~/view/ui/components/form/Select';
import { useListQueryParams } from '~/view/ui/hooks/useListQueryParams';

import { HISTORY_TABLE_COLUMNS } from './consts';

interface Props {
  projectId: number;
}

export const History: FC<Props> = ({ projectId }) => {
  const { offset, setOffset, filter, setFilter } = useListQueryParams<LogFilter>();

  const { data } = useFetchAllUsersQuery({
    variables: {
      pagination: { limit: 0 },
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
      filters: { ...filter, projectId },
    },
    fetchPolicy: 'cache-and-network',
  });

  const filterByUserOptions = [ALL_SELECT_OPTION, ...usersOptions];

  useEffect(() => {
    setOffset(0);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <SectionContainer title="History">
        <Select
          className="w-40"
          options={filterByUserOptions}
          value={filter?.createdById}
          placeholder="Filter by user"
          onChange={value => setFilter({ createdById: value })}
        />
        {loading && <TableLoader className="mt-10" />}
        {tableData && tableData.logList.results.length === 0 && (
          <div className="flex h-[67vh]">
            <EmptyState iconName="list" label="No history here yet" />
          </div>
        )}
        {!loading && tableData && tableData.logList.results.length > 0 && (
          <Table
            className="mt-4"
            data={tableData.logList.results}
            columns={HISTORY_TABLE_COLUMNS}
            setOffset={setOffset}
            offset={offset}
            fetchMore={fetchMore}
            totalCount={tableData.logList.count}
          />
        )}
      </SectionContainer>
    </div>
  );
};