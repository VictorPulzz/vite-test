/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchProjectDetailsQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectDetailsQuery = {
  __typename?: 'Query';
  project: {
    __typename?: 'ProjectType';
    id: number;
    name: string;
    phase: Types.ProjectPhaseChoice;
  };
};

export type FetchAllUsersQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.UserFilter>;
  pagination: Types.PaginationInput;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type FetchAllUsersQuery = {
  __typename?: 'Query';
  usersList: {
    __typename?: 'UserTypePagination';
    results: Array<{ __typename?: 'UserType'; id?: string | null; fullName: string }>;
  };
};

export const FetchProjectDetailsDocument = gql`
  query FetchProjectDetails($data: IDInput!) {
    project(data: $data) {
      id
      name
      phase
    }
  }
`;

/**
 * __useFetchProjectDetailsQuery__
 *
 * To run a query within a React component, call `useFetchProjectDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectDetailsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFetchProjectDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<FetchProjectDetailsQuery, FetchProjectDetailsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchProjectDetailsQuery, FetchProjectDetailsQueryVariables>(
    FetchProjectDetailsDocument,
    options,
  );
}
export function useFetchProjectDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchProjectDetailsQuery,
    FetchProjectDetailsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchProjectDetailsQuery, FetchProjectDetailsQueryVariables>(
    FetchProjectDetailsDocument,
    options,
  );
}
export type FetchProjectDetailsQueryHookResult = ReturnType<typeof useFetchProjectDetailsQuery>;
export type FetchProjectDetailsLazyQueryHookResult = ReturnType<
  typeof useFetchProjectDetailsLazyQuery
>;
export type FetchProjectDetailsQueryResult = Apollo.QueryResult<
  FetchProjectDetailsQuery,
  FetchProjectDetailsQueryVariables
>;
export const FetchAllUsersDocument = gql`
  query FetchAllUsers($filters: UserFilter, $pagination: PaginationInput!, $search: String) {
    usersList(filters: $filters, pagination: $pagination, search: $search) {
      results {
        id
        fullName
      }
    }
  }
`;

/**
 * __useFetchAllUsersQuery__
 *
 * To run a query within a React component, call `useFetchAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllUsersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useFetchAllUsersQuery(
  baseOptions: Apollo.QueryHookOptions<FetchAllUsersQuery, FetchAllUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchAllUsersQuery, FetchAllUsersQueryVariables>(
    FetchAllUsersDocument,
    options,
  );
}
export function useFetchAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchAllUsersQuery, FetchAllUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchAllUsersQuery, FetchAllUsersQueryVariables>(
    FetchAllUsersDocument,
    options,
  );
}
export type FetchAllUsersQueryHookResult = ReturnType<typeof useFetchAllUsersQuery>;
export type FetchAllUsersLazyQueryHookResult = ReturnType<typeof useFetchAllUsersLazyQuery>;
export type FetchAllUsersQueryResult = Apollo.QueryResult<
  FetchAllUsersQuery,
  FetchAllUsersQueryVariables
>;
