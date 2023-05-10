import { PaginationItem } from '~/types';

import { FetchRequestDetailsQuery, FetchRequestsListQuery } from './__generated__/schema';

export type RequestResultType = PaginationItem<FetchRequestsListQuery['requestList']>;

export type AssignedToType =
  | FetchRequestDetailsQuery['requestDetails']['assignedTo']
  | RequestResultType['assignedTo'];
