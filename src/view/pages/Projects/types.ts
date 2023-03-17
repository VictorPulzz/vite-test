import { PaginationItem } from '~/types';

import { FetchProjectsQuery } from './__generated__/schema';

export type ProjectResultType = PaginationItem<FetchProjectsQuery['projectsList']>;
