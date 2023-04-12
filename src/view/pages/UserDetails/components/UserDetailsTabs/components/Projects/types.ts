import { PaginationItem } from '~/types';

import { FetchUserProjectsListQuery } from '../../../../__generated__/schema';

export type UserProjectsListResultType = PaginationItem<FetchUserProjectsListQuery['userProjects']>;
