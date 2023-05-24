import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import React from 'react';

import { UserHistoryListResultType } from './types';

const columnHelper = createColumnHelper<UserHistoryListResultType>();

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
