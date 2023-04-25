import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import { TableLoader } from '@appello/web-ui';
import { useListQueryParams } from '@appello/web-ui';
import React, { FC } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { RequestFilter, RequestSort } from '~/services/gql/__generated__/globalTypes';
import { useAppSelector } from '~/store/hooks';
import { NewRequestModal } from '~/view/components/NewRequestModal';
import { useSortingState } from '~/view/hooks/useSortingState';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useFetchAllUsersQuery } from '../ProjectDetails/__generated__/schema';
import { useFetchRequestsListQuery } from './__generated__/schema';
import { RequestsFilterModal } from './components/RequestsFilterModal';
import { useRequestsTableColumns } from './hooks/useRequestsTableColumns';

export const RequestsPage: FC = () => {
  const roleId = useAppSelector(state => state.user.profile?.role?.id);

  const { sorting, tableSorting, setTableSorting } = useSortingState<RequestSort>();

  const { offset, setOffset, filter, setFilter, filtersCount } =
    useListQueryParams<RequestFilter>();

  const requestsTableColumns = useRequestsTableColumns();

  const {
    value: isNewRequestModalOpen,
    on: openNewRequestModal,
    off: closeNewRequestModal,
  } = useSwitchValue(false);

  const {
    value: isRequestsFilterModalOpen,
    on: openRequestsFilterModal,
    off: closeRequestsFilterModal,
  } = useSwitchValue(false);

  const { data, loading, fetchMore } = useFetchRequestsListQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      filters: { ...filter, assignedRole: roleId },
      sort: sorting,
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: allUsers } = useFetchAllUsersQuery({
    variables: {
      pagination: {
        limit: 0,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Requests</h1>
          <p className="text-p5 text-gray-2">{data?.requestList.count ?? 0} requests in total</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={ButtonVariant.SECONDARY}
            label="Filter"
            className="w-40"
            onClick={openRequestsFilterModal}
            count={filtersCount || undefined}
          />
          <Button
            label="New request"
            withIcon="plus"
            variant={ButtonVariant.PRIMARY}
            className="w-40"
            onClick={openNewRequestModal}
          />
        </div>
      </div>

      {loading && <TableLoader className="mt-6" />}
      {data && data.requestList.results.length === 0 && (
        <EmptyState iconName="requests" label="No requests here yet" />
      )}
      {!loading && data && data.requestList.results.length > 0 && (
        <Table
          className="mt-6"
          data={data.requestList.results}
          columns={requestsTableColumns}
          setOffset={setOffset}
          offset={offset}
          fetchMore={fetchMore}
          totalCount={data.requestList.count}
          sorting={tableSorting}
          setSorting={setTableSorting}
        />
      )}
      <NewRequestModal isOpen={isNewRequestModalOpen} close={closeNewRequestModal} />
      <RequestsFilterModal
        isOpen={isRequestsFilterModalOpen}
        close={closeRequestsFilterModal}
        setFilter={setFilter}
        users={allUsers?.usersList.results ?? []}
      />
    </SidebarLayout>
  );
};
