import { Button, ButtonVariant } from '@ui/components/common/Button';
import { EmptyState } from '@ui/components/common/EmptyState';
import { Table } from '@ui/components/common/Table';
import { TableLoader } from '@ui/components/common/TableLoader';
import React, { FC } from 'react';

import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { REPOSITORIES_TABLE_COLUMNS } from './consts';

// TODO remove repositoriesTestData when backend will be ready
const repositoriesTestData = [
  {
    projectId: 2,
    repositoryId: 1,
    repositoryName: 'Pic-up-web-frontend',
    projectName: 'PicUp',
    gitUrl: 'https://bitbucket.org/appello/pic-up-web-frontend',
    createdAt: '28/10/2022',
    platform: 'Web',
  },
  {
    projectId: 4,
    repositoryId: 2,
    repositoryName: 'Pic-up-customer-mobile',
    projectName: 'PicUp',
    gitUrl: 'https://bitbucket.org/appello/pic-up-customer-mobile',
    createdAt: '29/10/2022',
    platform: 'Mobile',
  },
];

export const RolesAndPermissionsPage: FC = () => {
  // const { data, loading, fetchMore } = useFetchRepositoriesQuery();

  // TODO remove test data later
  const data = {
    loading: false,
    repositoriesList: repositoriesTestData,
  };

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-h4">Roles & Pemissions</h1>
      </div>

      {data.loading && <TableLoader className="mt-10" />}
      {data && data.repositoriesList.length === 0 && (
        <EmptyState iconName="repositories" label="No repositories here yet" />
      )}
      {!data.loading && data && data.repositoriesList.length > 0 && (
        <Table
          className="mt-6"
          data={data.repositoriesList}
          columns={REPOSITORIES_TABLE_COLUMNS}
          // sorting={sorting}
          // setSorting={setSorting}
          // fetchMore={fetchMore}
          totalCount={data.repositoriesList.length}
        />
      )}
      <div className="flex items-center gap-3">
        <Button label="Save" variant={ButtonVariant.PRIMARY} className="w-[100px]" />
        <Button label="Discard" variant={ButtonVariant.SECONDARY} className="w-[100px]" />
      </div>
    </SidebarLayout>
  );
};
