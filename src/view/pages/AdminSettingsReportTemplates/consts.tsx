import { createColumnHelper } from '@tanstack/table-core';

import { ReportTemplateSort } from '~/services/gql/__generated__/globalTypes';

import { MoreCell } from './components/MoreCell';
import { ReportTemplatesResultType } from './types';

const columnHelper = createColumnHelper<ReportTemplatesResultType>();

export const REPORT_TEMPLATES_TABLE_COLUMNS = [
  columnHelper.accessor('name', {
    id: ReportTemplateSort.NAME,
    header: 'Name',
  }),
  columnHelper.accessor('description', {
    id: 'description',
    header: 'Description',
    enableSorting: false,
  }),
  columnHelper.accessor('filledBy.name', {
    id: ReportTemplateSort.FILLED_BY,
    header: 'To be filled by',
  }),
  columnHelper.group({
    id: 'more',
    cell: MoreCell,
    meta: {
      className: 'w-0',
    },
  }),
];
