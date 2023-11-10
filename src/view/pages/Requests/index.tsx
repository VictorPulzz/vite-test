import { useSwitchValue } from '@appello/common';
import { useListQueryParams } from '@appello/web-kit';
import {
  Button,
  ButtonVariant,
  EmptyState,
  Table,
  TableLoader,
  useAppelloKit,
} from '@appello/web-ui';
import React, { FC } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { RequestFilter, RequestSort } from '~/services/gql/__generated__/globalTypes';
import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import { useAppSelector } from '~/store/hooks';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';
import { NewRequestModal } from '~/view/components/NewRequestModal';
import { useSortingState } from '~/view/hooks/useSortingState';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useFetchRequestsListQuery } from './__generated__/schema';
import { RequestsFilterModal } from './components/RequestsFilterModal';
import { useRequestsTableColumns } from './hooks/useRequestsTableColumns';

export const RequestsPage: FC = () => {
  const roleId = useAppSelector(state => state.user.profile?.role?.id);
  const { pageSize } = useAppelloKit();

  const { sorting, tableSorting, setTableSorting } = useSortingState<RequestSort>();

  const { offset, setOffset, filter, setFilter, filtersCount } =
    useListQueryParams<RequestFilter>(pageSize);

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

  const { data: allUsers } = useFetchUserGlossaryListQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: usersByRole } = useFetchUserGlossaryListQuery({
    variables: {
      filters: { roleId: [Number(roleId)] },
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Requests</h1>
          <p className="text-p5 text-gray-2">Your department’s incoming requests</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="w-40"
            count={filtersCount || undefined}
            label="Filter"
            variant={ButtonVariant.SECONDARY}
            onClick={openRequestsFilterModal}
          />
          <Button
            className="w-40"
            label="New request"
            variant={ButtonVariant.PRIMARY}
            withIcon="plus"
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
          columns={requestsTableColumns}
          data={data.requestList.results}
          offset={offset}
          setOffset={setOffset}
          setSorting={setTableSorting}
          sorting={tableSorting}
          totalCount={data.requestList.count}
          onPageChange={gqlTableFetchMore(fetchMore)}
        />
      )}
      <NewRequestModal close={closeNewRequestModal} isOpen={isNewRequestModalOpen} />
      <RequestsFilterModal
        allUsers={allUsers?.userGlossaryList.results ?? []}
        close={closeRequestsFilterModal}
        isOpen={isRequestsFilterModalOpen}
        setFilter={setFilter}
        usersByRole={usersByRole?.userGlossaryList.results ?? []}
      />
    </SidebarLayout>
  );
};
