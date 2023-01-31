/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchUsersQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.UserFilter>;
  pagination: Types.PaginationInput;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type FetchUsersQuery = {
  __typename?: 'Query';
  usersList: {
    __typename?: 'UserTypePagination';
    results: Array<{
      __typename?: 'UserType';
      id?: string | null;
      fullName: string;
      email: string;
      isActive?: boolean | null;
      photo?: { __typename?: 'ImageType'; url: string } | null;
      department?: { __typename?: 'DepartmentType'; name: string } | null;
    }>;
  };
};

export const FetchUsersDocument = gql`
  query FetchUsers($filters: UserFilter, $pagination: PaginationInput!, $search: String) {
    usersList(filters: $filters, pagination: $pagination, search: $search) {
      results {
        id
        fullName
        photo {
          url
        }
        email
        isActive
        department {
          name
        }
      }
    }
  }
`;

/**
 * __useFetchUsersQuery__
 *
 * To run a query within a React component, call `useFetchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUsersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useFetchUsersQuery(
  baseOptions: Apollo.QueryHookOptions<FetchUsersQuery, FetchUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchUsersQuery, FetchUsersQueryVariables>(FetchUsersDocument, options);
}
export function useFetchUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchUsersQuery, FetchUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchUsersQuery, FetchUsersQueryVariables>(
    FetchUsersDocument,
    options,
  );
}
export type FetchUsersQueryHookResult = ReturnType<typeof useFetchUsersQuery>;
export type FetchUsersLazyQueryHookResult = ReturnType<typeof useFetchUsersLazyQuery>;
export type FetchUsersQueryResult = Apollo.QueryResult<FetchUsersQuery, FetchUsersQueryVariables>;
