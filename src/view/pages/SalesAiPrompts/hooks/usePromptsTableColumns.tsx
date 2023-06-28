import { createColumnHelper } from '@tanstack/table-core';

import { MoreCell } from '../components/MoreCell';
import { PropmtResultType } from '../types';

const columnHelper = createColumnHelper<PropmtResultType>();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export function usePromptsTableColumns() {
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
