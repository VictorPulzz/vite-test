import { PaginationItem } from '~/types';

import { FetchRequestsQuery } from './__generated__/schema';

export type RequestResultType = PaginationItem<FetchRequestsQuery['requestList']>;
