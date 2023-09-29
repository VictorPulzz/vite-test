import { TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

import { LogsResultType } from '../../../types';

const columnHelper = createColumnHelper<LogsResultType>();

export function useHistoryTableColumns() {
  const { canReadUserDetails } = useUserPermissions();

  return [
    columnHelper.accessor('message', {
      id: 'message',
      header: 'Action',
      meta: {
        className: 'max-w-[300px] break-all',
      },
    }),
    columnHelper.accessor('createdBy', {
      id: 'createdBy',
      header: 'Made by',
      cell: ctx => {
        const { createdBy } = ctx.row.original;

        return (
          <div className="flex gap-3 items-center">
            {canReadUserDetails ? (
              <TextLink
                to={generatePath(ROUTES.USER_DETAILS, { id: createdBy.id })}
                className="underline"
              >
                <span>{createdBy.fullName}</span>
              </TextLink>
            ) : (
              <span>{createdBy.fullName}</span>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: 'Date & time',
      cell: ctx => <span>{format(new Date(ctx.getValue()), DateFormat.PP_P)}</span>,
    }),
  ];
}
