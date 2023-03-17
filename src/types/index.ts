/* common types */

export type PaginationItem<T extends { results: unknown[] }> = T['results'][number];

export type Sorting<T> = {
  field: T;
  direction: 'asc' | 'desc';
}[];
