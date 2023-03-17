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
    count: number;
    results: Array<{
      __typename?: 'UserType';
      id?: string | null;
      fullName?: string | null;
      email: string;
      isActive?: boolean | null;
      photo?: { __typename?: 'ImageType'; url: string } | null;
      department?: { __typename?: 'DepartmentType'; id: number; name: string } | null;
      role?: { __typename?: 'RoleType'; id: number; name: string } | null;
    }>;
  };
};

export type FetchRolesListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchRolesListQuery = {
  __typename?: 'Query';
  rolesList: Array<{ __typename?: 'RoleType'; value: number; label: string }>;
};

export type FetchDepartmentsListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchDepartmentsListQuery = {
  __typename?: 'Query';
  departmentsList: Array<{ __typename?: 'DepartmentType'; value: number; label: string }>;
};

export type ChangeUserStatusMutationVariables = Types.Exact<{
  input: Types.ActiveInput;
}>;

export type ChangeUserStatusMutation = {
  __typename?: 'Mutation';
  userChangeStatus: { __typename?: 'UserType'; id?: string | null; isActive?: boolean | null };
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
          id
          name
        }
        role {
          id
          name
        }
      }
      count
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
export const FetchRolesListDocument = gql`
  query FetchRolesList {
    rolesList {
      value: id
      label: name
    }
  }
`;

/**
 * __useFetchRolesListQuery__
 *
 * To run a query within a React component, call `useFetchRolesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchRolesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchRolesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchRolesListQuery(
  baseOptions?: Apollo.QueryHookOptions<FetchRolesListQuery, FetchRolesListQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchRolesListQuery, FetchRolesListQueryVariables>(
    FetchRolesListDocument,
    options,
  );
}
export function useFetchRolesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchRolesListQuery, FetchRolesListQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchRolesListQuery, FetchRolesListQueryVariables>(
    FetchRolesListDocument,
    options,
  );
}
export type FetchRolesListQueryHookResult = ReturnType<typeof useFetchRolesListQuery>;
export type FetchRolesListLazyQueryHookResult = ReturnType<typeof useFetchRolesListLazyQuery>;
export type FetchRolesListQueryResult = Apollo.QueryResult<
  FetchRolesListQuery,
  FetchRolesListQueryVariables
>;
export const FetchDepartmentsListDocument = gql`
  query FetchDepartmentsList {
    departmentsList {
      value: id
      label: name
    }
  }
`;

/**
 * __useFetchDepartmentsListQuery__
 *
 * To run a query within a React component, call `useFetchDepartmentsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchDepartmentsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchDepartmentsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchDepartmentsListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchDepartmentsListQuery,
    FetchDepartmentsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchDepartmentsListQuery, FetchDepartmentsListQueryVariables>(
    FetchDepartmentsListDocument,
    options,
  );
}
export function useFetchDepartmentsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchDepartmentsListQuery,
    FetchDepartmentsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchDepartmentsListQuery, FetchDepartmentsListQueryVariables>(
    FetchDepartmentsListDocument,
    options,
  );
}
export type FetchDepartmentsListQueryHookResult = ReturnType<typeof useFetchDepartmentsListQuery>;
export type FetchDepartmentsListLazyQueryHookResult = ReturnType<
  typeof useFetchDepartmentsListLazyQuery
>;
export type FetchDepartmentsListQueryResult = Apollo.QueryResult<
  FetchDepartmentsListQuery,
  FetchDepartmentsListQueryVariables
>;
export const ChangeUserStatusDocument = gql`
  mutation ChangeUserStatus($input: ActiveInput!) {
    userChangeStatus(data: $input) {
      id
      isActive
    }
  }
`;
export type ChangeUserStatusMutationFn = Apollo.MutationFunction<
  ChangeUserStatusMutation,
  ChangeUserStatusMutationVariables
>;

/**
 * __useChangeUserStatusMutation__
 *
 * To run a mutation, you first call `useChangeUserStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserStatusMutation, { data, loading, error }] = useChangeUserStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeUserStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeUserStatusMutation,
    ChangeUserStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ChangeUserStatusMutation, ChangeUserStatusMutationVariables>(
    ChangeUserStatusDocument,
    options,
  );
}
export type ChangeUserStatusMutationHookResult = ReturnType<typeof useChangeUserStatusMutation>;
export type ChangeUserStatusMutationResult = Apollo.MutationResult<ChangeUserStatusMutation>;
export type ChangeUserStatusMutationOptions = Apollo.BaseMutationOptions<
  ChangeUserStatusMutation,
  ChangeUserStatusMutationVariables
>;
