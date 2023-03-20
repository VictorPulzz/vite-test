import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { LogsResultType } from '~/view/pages/ProjectDetails/types';
import { TextLink } from '~/view/ui/components/common/TextLink';

const columnHelper = createColumnHelper<LogsResultType>();

export const HISTORY_TABLE_COLUMNS = [
  columnHelper.accessor('message', {
    id: 'message',
    header: 'Action',
  }),
  columnHelper.accessor('id', {
    id: 'id',
    header: 'Made by',
    cell: props => {
      const { createdBy } = props.row.original;
      const { id } = createdBy;
      return (
        <div className="flex gap-3 items-center">
          <TextLink to={generatePath(ROUTES.USER_DETAILS, { id })} className="underline">
            <p>{createdBy.fullName}</p>
          </TextLink>
        </div>
      );
    },
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    header: 'Date & time',
    cell: props => <span>{format(new Date(props.getValue()), DateFormat.PP_P)}</span>,
  }),
];
