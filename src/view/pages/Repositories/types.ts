import { PaginationItem } from '~/types';

import { FetchRepositoriesQuery } from './__generated__/schema';

export type RepositoriesResultType = PaginationItem<FetchRepositoriesQuery['repositoryList']>;
