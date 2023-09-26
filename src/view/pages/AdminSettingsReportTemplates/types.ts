import { PaginationItem } from '~/types';

import { FetchReportTemplatesListQuery } from './__generated__/schema';

export type ReportTemplatesResultType = PaginationItem<
  FetchReportTemplatesListQuery['reportTemplateList']
>;
