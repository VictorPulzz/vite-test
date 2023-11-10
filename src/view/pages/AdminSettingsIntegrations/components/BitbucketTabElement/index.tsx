import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant, useListQueryParams } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import { TableLoader } from '@appello/web-ui';
import React, { FC } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { GitInitialUserSort } from '~/services/gql/__generated__/globalTypes';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useSortingState } from '~/view/hooks/useSortingState';

import { useFetchGitInitialUsersListQuery } from '../../__generated__/schema';
import { CreateOrUpdateGitInitialUserModal } from './components/CreateOrUpdateGitInitialUserModal';
import { useGitInitialUsersTableColumns } from './hooks/useGitInitialUsersTableColumns';

export const BitbucketTabElement: FC = () => {
  const {
    value: isCreateOrUpdateGitInitialUserModal,
    on: openCreateOrUpdateGitInitialUserModal,
    off: closeCreateOrUpdateGitInitialUserModal,
  } = useSwitchValue(false);

  const { sorting, tableSorting, setTableSorting } = useSortingState<GitInitialUserSort>();

  const { offset, setOffset } = useListQueryParams();

  const initialUsersTableColumns = useGitInitialUsersTableColumns();

  const { data, loading, fetchMore } = useFetchGitInitialUsersListQuery({
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
      containerClassName="h-full"
      subTitle="These users will be added to every repository in every project"
      title="Initial users for every repository"
      titleClassName="leading-none"
    >
      <div className="flex flex-col h-full pb-7">
        {loading && <TableLoader className="mt-3" />}
        {data && data.gitInitialUserList.results.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <EmptyState iconName="users" label="No initial users here yet" />
          </div>
        )}
        {!loading && data && data.gitInitialUserList.results.length > 0 && (
          <Table
            className="mt-3"
            columns={initialUsersTableColumns}
            data={data.gitInitialUserList.results}
            offset={offset}
            setOffset={setOffset}
            setSorting={setTableSorting}
            sorting={tableSorting}
            totalCount={data.gitInitialUserList.count}
            onPageChange={gqlTableFetchMore(fetchMore)}
          />
        )}
        {!loading && (
          <Button
            className="w-[150px] mt-3"
            label="Add user to list"
            variant={ButtonVariant.SECONDARY}
            withIcon="plus"
            onClick={openCreateOrUpdateGitInitialUserModal}
          />
        )}
      </div>
      <CreateOrUpdateGitInitialUserModal
        close={closeCreateOrUpdateGitInitialUserModal}
        isOpen={isCreateOrUpdateGitInitialUserModal}
      />
    </SectionContainer>
  );
};
