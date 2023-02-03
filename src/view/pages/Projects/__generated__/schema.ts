/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchProjectsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ProjectFilter>;
  pagination: Types.PaginationInput;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type FetchProjectsQuery = {
  __typename?: 'Query';
  projectsList: {
    __typename?: 'ProjectTypePagination';
    count: number;
    results: Array<{
      __typename?: 'ProjectType';
      id: number;
      name: string;
      status?: Types.StatusEnum | null;
      PM?: Array<{ __typename?: 'UserType'; fullName: string }> | null;
    }>;
  };
};

export const FetchProjectsDocument = gql`
  query FetchProjects($filters: ProjectFilter, $pagination: PaginationInput!, $search: String) {
    projectsList(filters: $filters, pagination: $pagination, search: $search) {
      results {
        id
        name
        PM {
          fullName
        }
        status
      }
      count
    }
  }
`;

/**
 * __useFetchProjectsQuery__
 *
 * To run a query within a React component, call `useFetchProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useFetchProjectsQuery(
  baseOptions: Apollo.QueryHookOptions<FetchProjectsQuery, FetchProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchProjectsQuery, FetchProjectsQueryVariables>(
    FetchProjectsDocument,
    options,
  );
}
export function useFetchProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchProjectsQuery, FetchProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchProjectsQuery, FetchProjectsQueryVariables>(
    FetchProjectsDocument,
    options,
  );
}
export type FetchProjectsQueryHookResult = ReturnType<typeof useFetchProjectsQuery>;
export type FetchProjectsLazyQueryHookResult = ReturnType<typeof useFetchProjectsLazyQuery>;
export type FetchProjectsQueryResult = Apollo.QueryResult<
  FetchProjectsQuery,
  FetchProjectsQueryVariables
>;
