import { EmptyState } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import { TableLoader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';

import { PermissionType } from '~/services/gql/__generated__/globalTypes';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useFetchPermissionsListQuery } from './__generated__/schema';
import { ROLES_AND_PERMISSIONS_TABLE_COLUMNS } from './consts';

export const RolesAndPermissionsPage: FC = () => {
  const { data, loading } = useFetchPermissionsListQuery({
    fetchPolicy: 'cache-and-network',
  });

  const tableData = useMemo(
    () =>
      data?.permissionsList.map(({ id, title, roles }) => ({
        id,
        title,
        roles,
      })),
    [data?.permissionsList],
  );

  return (
    <SidebarLayout contentClassName="p-6">
      <h1 className="text-h4">Roles & Permissions</h1>
      {loading && <TableLoader className="mt-6" />}
      {data && data.permissionsList.length === 0 && (
        <EmptyState iconName="key" label="No roles & permissions here yet" />
      )}
      {!loading && data && data.permissionsList.length > 0 && (
        <Table
          className="mt-6"
          columns={ROLES_AND_PERMISSIONS_TABLE_COLUMNS}
          data={tableData as PermissionType[]}
        />
      )}
    </SidebarLayout>
  );
};
