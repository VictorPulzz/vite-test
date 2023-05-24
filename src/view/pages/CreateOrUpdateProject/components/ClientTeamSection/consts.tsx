import { createColumnHelper } from '@tanstack/table-core';
import React from 'react';

import { ClientType } from '~/services/gql/__generated__/globalTypes';

import { MoreCell } from './components/MoreCell';

const columnHelper = createColumnHelper<ClientType>();

export const CLIENT_TEAM_TABLE_COLUMNS = [
  columnHelper.accessor('fullName', {
    id: 'fullName',
    header: 'Name',
    cell: props => {
      const { pointContact } = props.row.original;
      return (
        <div className="flex items-center gap-1">
          <span>{props.getValue()}</span>
          {pointContact && <span className="text-green whitespace-nowrap">point of contact</span>}
        </div>
      );
    },
  }),
  columnHelper.accessor('email', {
    id: 'email',
    header: 'Email',
  }),
  columnHelper.accessor('phone', {
    id: 'phone',
    header: 'Phone',
  }),
  columnHelper.accessor('position', {
    id: 'position',
    header: 'Position',
  }),
  columnHelper.accessor('notes', {
    id: 'notes',
    header: 'Notes',
    meta: {
      className: 'break-all',
    },
  }),

  columnHelper.group({
    id: 'more',
    cell: MoreCell,
    meta: {
      className: 'w-0',
    },
  }),
];
