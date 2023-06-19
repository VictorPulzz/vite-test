import { Button, ButtonVariant } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { MessagesResponse } from '~/services/rtk/lead/types';

const columnHelper = createColumnHelper<MessagesResponse>();

export enum TeamTableType {
  CURRENT_TEAM = 'CURRENT_TEAM',
  OTHER_CONTRIBUTORS = 'OTHER_CONTRIBUTORS',
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export function useLeadMessagesTableColumns() {
  const navigate = useNavigate();
  return [
    columnHelper.accessor('generatedText', {
      id: 'generatedText',
      header: 'Generated text',
      cell: ctx => {
        return <p className="pre-wrapp">{ctx.getValue()?.replace('\\n', '<br>')}</p>;
      },
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: 'Date',
      cell: ctx => format(new Date(ctx.getValue() ?? ''), DateFormat.D_MMM_Y),
    }),
    columnHelper.accessor('id', {
      id: 'actions',
      header: 'Actions',
      cell: ctx => {
        const { id, leadId } = ctx.row.original;

        return (
          <Button
            variant={ButtonVariant.SECONDARY}
            withIcon="edit"
            onClick={() =>
              navigate(generatePath(ROUTES.EDIT_LEAD_MESSAGE, { id: leadId, messageId: id }))
            }
            className="w-[140px]"
          />
        );
      },
    }),
  ];
}
