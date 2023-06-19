import { TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { LeadListResponse } from '~/services/rtk/lead/types';

const columnHelper = createColumnHelper<LeadListResponse>();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export function useLeadsTableColumns() {
  return [
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Lead name',
      cell: ctx => {
        const { id } = ctx.row.original;
        return (
          <div className="flex gap-3 items-center">
            <TextLink to={generatePath(ROUTES.LEAD_DETAILS, { id })} className="underline">
              {ctx.getValue()}
            </TextLink>
          </div>
        );
      },
      meta: {
        className: 'w-[400px]',
      },
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: 'Date',
      cell: ctx => format(new Date(ctx.getValue() ?? ''), DateFormat.D_MMM_Y),
    }),
  ];
}
