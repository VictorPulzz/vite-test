import { PaginationItem } from '~/types';

import { FetchGitInitialUsersListQuery } from '../../__generated__/schema';

export type GitInitialUsersResultType = PaginationItem<
  FetchGitInitialUsersListQuery['gitInitialUserList']
>;
