import { PaginationItem } from '~/types';

import { FetchRequestsListQuery } from './__generated__/schema';

export type RequestResultType = PaginationItem<FetchRequestsListQuery['requestList']>;
