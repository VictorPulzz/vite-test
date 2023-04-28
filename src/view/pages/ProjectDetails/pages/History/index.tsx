import { EmptyState, Table, useSelectOptions } from '@appello/web-ui';
import { TableLoader } from '@appello/web-ui';
import { Select } from '@appello/web-ui';
import { useListQueryParams } from '@appello/web-ui';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { PAGE_SIZE } from '~/constants/pagination';
import { Permission } from '~/constants/permissions';
import { ALL_SELECT_OPTION } from '~/constants/select';
import { LogFilter } from '~/services/gql/__generated__/globalTypes';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import {
  useFetchAllUsersQuery,
  useFetchHistoryLogsQuery,
} from '~/view/pages/ProjectDetails/__generated__/schema';

import { HISTORY_TABLE_COLUMNS, HISTORY_TABLE_COLUMNS_NO_USER_DETAILS } from './consts';

export const History: FC = () => {
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;
  const canReadUserDetails = useHasAccess(Permission.READ_USER_DETAILS);

  const { offset, setOffset, filter, setFilter } = useListQueryParams<LogFilter>();

  const { data } = useFetchAllUsersQuery({
    variables: {
      pagination: { limit: 0 },
    },
    fetchPolicy: 'cache-and-network',
  });

  const usersOptions = useSelectOptions(data?.usersList.results, {
    value: 'id',
    label: 'fullName',
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

  const filterByUserOptions = [ALL_SELECT_OPTION, ...usersOptions];

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
            columns={
              canReadUserDetails ? HISTORY_TABLE_COLUMNS : HISTORY_TABLE_COLUMNS_NO_USER_DETAILS
            }
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
