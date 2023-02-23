import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import React from 'react';

// import { UserUserHistoryListResultType } from './types';

// TODO add UserUserHistoryListResultType  type
const columnHelper = createColumnHelper<any>();

export const USERS_HISTORY_TABLE_COLUMNS = [
  columnHelper.accessor('message', {
    id: 'message',
    header: 'Action',
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    header: 'Date & time',
    cell: props => <span>{format(new Date(props.getValue()), 'PPp')}</span>,
  }),
];
