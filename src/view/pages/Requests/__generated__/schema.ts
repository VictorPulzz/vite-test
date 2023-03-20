/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchRequestsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.RequestFilter>;
  pagination: Types.PaginationInput;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type FetchRequestsQuery = {
  __typename?: 'Query';
  requestList: {
    __typename?: 'RequestTypePagination';
    count: number;
    results: Array<{
      __typename?: 'RequestType';
      createdAt: string;
      createdBy: { __typename?: 'UserType'; fullName?: string | null };
      type: string;
    }>;
  };
};

export const FetchRequestsDocument = gql`
  query FetchRequests($filters: RequestFilter, $pagination: PaginationInput!, $search: String) {
    requestList(filters: $filters, pagination: $pagination, search: $search) {
      results {
        createdAt
        createdBy
        type
      }
      count
    }
  }
`;

/**
 * __useFetchRequestsQuery__
 *
 * To run a query within a React component, call `useFetchRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchRequestsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useFetchRequestsQuery(
  baseOptions: Apollo.QueryHookOptions<FetchRequestsQuery, FetchRequestsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchRequestsQuery, FetchRequestsQueryVariables>(
    FetchRequestsDocument,
    options,
  );
}
export function useFetchRequestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchRequestsQuery, FetchRequestsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchRequestsQuery, FetchRequestsQueryVariables>(
    FetchRequestsDocument,
    options,
  );
}
export type FetchRequestsQueryHookResult = ReturnType<typeof useFetchRequestsQuery>;
export type FetchRequestsLazyQueryHookResult = ReturnType<typeof useFetchRequestsLazyQuery>;
export type FetchRequestsQueryResult = Apollo.QueryResult<
  FetchRequestsQuery,
  FetchRequestsQueryVariables
>;
