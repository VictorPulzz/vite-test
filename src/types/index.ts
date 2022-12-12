/* common types */

import { OrderDirectionChoice } from '~/services/gql/__generated__/globalTypes';

export type PaginationItem<T extends { results: unknown[] }> = T['results'][number];

export type Sorting<T> = {
  field: T;
  direction: OrderDirectionChoice;
}[];
