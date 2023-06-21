import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import React from 'react';

import { DateFormat } from '~/constants/dates';
import { MessagesResponse } from '~/services/rtk/lead/types';

const columnHelper = createColumnHelper<MessagesResponse>();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export function useLeadMessagesTableColumns() {
  return [
    columnHelper.accessor('promptText', {
      id: 'promptText',
      header: 'Prompt',
    }),
    columnHelper.accessor('generatedText', {
      id: 'generatedText',
      header: 'Generated text',
      cell: ctx => {
        return (
          <div contentEditable suppressContentEditableWarning>
            {ctx.getValue()?.replace('\\n', '<br>')}
          </div>
        );
      },
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: 'Date',
      cell: ctx => format(new Date(ctx.getValue() ?? ''), DateFormat.D_MMM_Y),
      meta: {
        className: 'whitespace-nowrap',
      },
    }),
  ];
}
