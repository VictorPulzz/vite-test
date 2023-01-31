import { PaginationItem } from '~/types';

import { FetchUsersQuery } from './__generated__/schema';

export type UserResultType = PaginationItem<FetchUsersQuery['usersList']>;
