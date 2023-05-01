import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

import { ClientType } from '~/services/gql/__generated__/globalTypes';

const columnHelper = createColumnHelper<Omit<ClientType, 'id' | '__typename'>>();

export const CLIENT_TEAM_TABLE_COLUMNS = [
  columnHelper.accessor('fullName', {
    id: 'fullName',
    header: 'Name',
    cell: props => {
      const { pointContact } = props.row.original;
      return (
        <div className="flex items-center gap-1">
          <span>{props.getValue()}</span>
          {pointContact && <span className="text-green">point of contact</span>}
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
  }),
];
