import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant, useListQueryParams } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import { TableLoader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';

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

  const projectInitialUsersIds = useMemo(
    () => data?.projectInitialUserList.results.map(user => user.user.id) ?? [],
    [data?.projectInitialUserList.results],
  );

  return (
    <SectionContainer
      containerClassName="h-full"
      subTitle="These users will be added to every new project"
      title="Initial users"
      titleClassName="leading-none"
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
            columns={initialUsersTableColumns}
            data={data.projectInitialUserList.results}
            offset={offset}
            setOffset={setOffset}
            setSorting={setTableSorting}
            sorting={tableSorting}
            totalCount={data.projectInitialUserList.count}
            onPageChange={gqlTableFetchMore(fetchMore)}
          />
        )}
        {!loading && (
          <Button
            className="w-[150px] mt-3"
            label="Add user to list"
            variant={ButtonVariant.SECONDARY}
            withIcon="plus"
            onClick={openCreateModal}
          />
        )}
      </div>
      <CreateProjectInitialUserModal
        close={closeCreateModal}
        isOpen={isCreateModalOpen}
        projectInitialUsersIds={projectInitialUsersIds}
      />
    </SectionContainer>
  );
};
