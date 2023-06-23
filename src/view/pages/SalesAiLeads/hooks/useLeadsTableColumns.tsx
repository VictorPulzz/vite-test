import { TextLink } from '@appello/web-ui';
import { ColumnDef, createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { LeadListResponse } from '~/services/rtk/lead/types';

const columnHelper = createColumnHelper<LeadListResponse>();

export function useLeadsTableColumns(): ColumnDef<LeadListResponse, string>[] {
  return [
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Lead name',
      cell: ctx => {
        const { id } = ctx.row.original;
        return (
          <div className="flex gap-3 items-center">
            <TextLink to={generatePath(ROUTES.SALES_AI_LEAD_DETAILS, { id })} className="underline">
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
