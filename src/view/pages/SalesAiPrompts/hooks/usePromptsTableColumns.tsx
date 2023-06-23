import { ColumnDef, createColumnHelper } from '@tanstack/table-core';

import { PropmtsListResponse } from '~/services/rtk/lead/types';

import { MoreCell } from '../components/MoreCell';

const columnHelper = createColumnHelper<PropmtsListResponse>();

export function usePromptsTableColumns(): ColumnDef<PropmtsListResponse, string>[] {
  return [
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Prompt name',

      meta: {
        className: 'w-[400px]',
      },
    }),
    columnHelper.accessor('promptText', {
      id: 'promptText',
      header: 'Prompt text',
    }),
    columnHelper.group({
      id: 'more',
      cell: MoreCell,
      meta: {
        className: 'w-0',
      },
    }),
  ];
}
