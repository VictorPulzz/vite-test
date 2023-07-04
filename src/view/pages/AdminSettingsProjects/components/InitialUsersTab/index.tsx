import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant, useListQueryParams } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import { TableLoader } from '@appello/web-ui';
import React, { FC } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { ProjectInitialUserSort } from '~/services/gql/__generated__/globalTypes';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useSortingState } from '~/view/hooks/useSortingState';

import { useFetchProjectInitialUsersListQuery } from '../../__generated__/schema';
import { CreateProjectInitialUserModal } from './components/CreateProjectInitialUserModal';
import { useProjectInitialUsersTableColumns } from './hooks/useProjectInitialUsersTableColumns';

export const InitialUsersTab: FC = () => {
  const {
    value: isCreateModalOpen,
    on: openCreateModal,
    off: closeCreateModal,
  } = useSwitchValue(false);

  const { sorting, tableSorting, setTableSorting } = useSortingState<ProjectInitialUserSort>();

  const { offset, setOffset } = useListQueryParams();

  const initialUsersTableColumns = useProjectInitialUsersTableColumns();

  const { data, loading, fetchMore } = useFetchProjectInitialUsersListQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      sort: sorting,
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <SectionContainer
      title="Initial users"
      subTitle="These users will be added to every new project"
      titleClassName="leading-none"
      containerClassName="h-full"
    >
      <div className="flex flex-col h-full pb-7">
        {loading && <TableLoader className="mt-3" />}
        {!loading && data && data.projectInitialUserList.results.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <EmptyState iconName="users" label="No initial users here yet" />
          </div>
        )}
        {!loading && data && data.projectInitialUserList.results.length > 0 && (
          <Table
            className="mt-3"
            data={data.projectInitialUserList.results}
            columns={initialUsersTableColumns}
            setOffset={setOffset}
            offset={offset}
            onPageChange={gqlTableFetchMore(fetchMore)}
            totalCount={data.projectInitialUserList.count}
            sorting={tableSorting}
            setSorting={setTableSorting}
          />
        )}
        {!loading && (
          <Button
            variant={ButtonVariant.SECONDARY}
            withIcon="plus"
            label="Add user to list"
            className="w-[150px] mt-3"
            onClick={openCreateModal}
          />
        )}
      </div>
      <CreateProjectInitialUserModal isOpen={isCreateModalOpen} close={closeCreateModal} />
    </SectionContainer>
  );
};
