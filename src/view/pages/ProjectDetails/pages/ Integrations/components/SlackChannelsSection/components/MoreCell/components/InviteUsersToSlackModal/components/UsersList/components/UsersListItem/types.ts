import { FetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import { PaginationItem } from '~/types';

export type UserToSlackResultType = PaginationItem<FetchUserGlossaryListQuery['userGlossaryList']>;
