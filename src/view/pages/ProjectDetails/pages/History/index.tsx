import { useSelectOptions } from '@appello/common';
import { useListQueryParams } from '@appello/web-kit';
import { EmptyState, Select, Table, TableLoader, useAppelloKit } from '@appello/web-ui';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { PAGE_SIZE } from '~/constants/pagination';
import { ALL_SELECT_OPTION } from '~/constants/select';
import { LogFilter } from '~/services/gql/__generated__/globalTypes';
import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useFetchHistoryLogsQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { useHistoryTableColumns } from './hooks/useHistoryTableColumns';

export const History: FC = () => {
  const { pageSize } = useAppelloKit();
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;

  const historyTableColumns = useHistoryTableColumns();

  const { offset, setOffset, filter, setFilter } = useListQueryParams<LogFilter>(pageSize);

  const { data: allUsers } = useFetchUserGlossaryListQuery({
    fetchPolicy: 'cache-and-network',
  });

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

  const usersOptions = [
    ALL_SELECT_OPTION,
    ...useSelectOptions(allUsers?.userGlossaryList.results, {
      value: 'id',
      label: 'fullName',
    }),
  ];

  return (
    <div className="flex flex-col gap-5">
      <SectionContainer title="History">
        <Select
          className="w-40"
          options={usersOptions}
          placeholder="Filter by user"
          value={filter?.createdById}
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
            columns={historyTableColumns}
            data={tableData.logList.results}
            offset={offset}
            setOffset={setOffset}
            totalCount={tableData.logList.count}
            onPageChange={gqlTableFetchMore(fetchMore)}
          />
        )}
      </SectionContainer>
    </div>
  );
};
