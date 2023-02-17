import { PaginationItem } from '~/types';

import { FetchHistoryLogsQuery } from './__generated__/schema';

export type LogsResultType = PaginationItem<FetchHistoryLogsQuery['logList']>;
