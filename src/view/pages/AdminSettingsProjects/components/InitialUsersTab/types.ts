import { PaginationItem } from '~/types';

import { FetchProjectInitialUsersListQuery } from '../../__generated__/schema';

export type ProjectInitialUsersResultType = PaginationItem<
  FetchProjectInitialUsersListQuery['projectInitialUserList']
>;
