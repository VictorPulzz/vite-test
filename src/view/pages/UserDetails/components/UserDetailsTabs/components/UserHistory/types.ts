import { PaginationItem } from '~/types';

import { FetchUserHistoryListQuery } from '../../../../__generated__/schema';

export type UserHistoryListResultType = PaginationItem<FetchUserHistoryListQuery['logList']>;
