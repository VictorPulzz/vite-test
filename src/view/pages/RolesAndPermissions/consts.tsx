import { createColumnHelper } from '@tanstack/table-core';
import React from 'react';

import { PermissionType } from '~/services/gql/__generated__/globalTypes';

import { RolesList } from './components/RolesList';

const columnHelper = createColumnHelper<PermissionType>();

export const ROLES_AND_PERMISSIONS_TABLE_COLUMNS = [
  columnHelper.accessor('title', {
    id: 'title',
    header: 'Feature',
    meta: {
      className: 'w-[280px]',
    },
  }),
  columnHelper.accessor('roles', {
    id: 'role',
    header: 'Roles',
    cell: props => {
      const roles = props.getValue();
      return <RolesList roles={roles ?? []} featureRow={props.row.original} />;
    },
  }),
];
