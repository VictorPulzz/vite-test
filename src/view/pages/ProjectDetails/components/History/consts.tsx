import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { TextLink } from '~/view/ui/components/common/TextLink';

import { HistoryUsersType } from '.';

const columnHelper = createColumnHelper<HistoryUsersType>();

export const HISTORY_TABLE_COLUMNS = [
  columnHelper.accessor('action', {
    id: 'action',
    header: 'Action',
  }),
  columnHelper.accessor('madeBy', {
    id: 'madeBy',
    header: 'Made by',
    cell: ({
      row: {
        original: { id, madeBy },
      },
    }) => {
      return (
        <div className="flex gap-3 items-center">
          <TextLink to={generatePath(ROUTES.USER_DETAILS, { id })} className="underline">
            {madeBy}
          </TextLink>
        </div>
      );
    },
  }),
  columnHelper.accessor('dateAndTime', {
    id: 'dateAndTime',
    header: 'Date & time',
  }),
];
