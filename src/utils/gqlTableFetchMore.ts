/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApolloQueryResult, FetchMoreQueryOptions } from '@apollo/client';

export function gqlTableFetchMore<TData>(
  fetchMore: (
    options: FetchMoreQueryOptions<any> & {
      updateQuery?: (
        previousQueryResult: any,
        options: {
          fetchMoreResult: any;
          variables: any;
        },
      ) => any;
    },
  ) => Promise<ApolloQueryResult<TData>>,
): (options: { limit: number; offset: number }) => Promise<unknown> {
  return ({ limit, offset }) =>
    fetchMore({
      variables: { pagination: { limit, offset } },
      updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult,
    });
}
