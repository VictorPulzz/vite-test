/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchPermissionsListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchPermissionsListQuery = {
  __typename?: 'Query';
  permissionsList: Array<{
    __typename?: 'PermissionType';
    id: number;
    name: string;
    rolesList?: Array<string> | null;
    title?: string | null;
    roles?: Array<{
      __typename?: 'RoleType';
      id: number;
      name: string;
      color?: string | null;
    }> | null;
  }>;
};

export type UpdatePermissionsListMutationVariables = Types.Exact<{
  input: Array<Types.PermissionInput> | Types.PermissionInput;
}>;

export type UpdatePermissionsListMutation = {
  __typename?: 'Mutation';
  permissionsUpdate: Array<{ __typename?: 'PermissionType'; name: string }>;
};

export const FetchPermissionsListDocument = gql`
  query FetchPermissionsList {
    permissionsList {
      id
      name
      roles {
        id
        name
        color
      }
      rolesList
      title
    }
  }
`;

/**
 * __useFetchPermissionsListQuery__
 *
 * To run a query within a React component, call `useFetchPermissionsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPermissionsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPermissionsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchPermissionsListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchPermissionsListQuery,
    FetchPermissionsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchPermissionsListQuery, FetchPermissionsListQueryVariables>(
    FetchPermissionsListDocument,
    options,
  );
}
export function useFetchPermissionsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchPermissionsListQuery,
    FetchPermissionsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchPermissionsListQuery, FetchPermissionsListQueryVariables>(
    FetchPermissionsListDocument,
    options,
  );
}
export type FetchPermissionsListQueryHookResult = ReturnType<typeof useFetchPermissionsListQuery>;
export type FetchPermissionsListLazyQueryHookResult = ReturnType<
  typeof useFetchPermissionsListLazyQuery
>;
export type FetchPermissionsListQueryResult = Apollo.QueryResult<
  FetchPermissionsListQuery,
  FetchPermissionsListQueryVariables
>;
export const UpdatePermissionsListDocument = gql`
  mutation UpdatePermissionsList($input: [PermissionInput!]!) {
    permissionsUpdate(data: $input) {
      name
    }
  }
`;
export type UpdatePermissionsListMutationFn = Apollo.MutationFunction<
  UpdatePermissionsListMutation,
  UpdatePermissionsListMutationVariables
>;

/**
 * __useUpdatePermissionsListMutation__
 *
 * To run a mutation, you first call `useUpdatePermissionsListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePermissionsListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePermissionsListMutation, { data, loading, error }] = useUpdatePermissionsListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePermissionsListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePermissionsListMutation,
    UpdatePermissionsListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePermissionsListMutation, UpdatePermissionsListMutationVariables>(
    UpdatePermissionsListDocument,
    options,
  );
}
export type UpdatePermissionsListMutationHookResult = ReturnType<
  typeof useUpdatePermissionsListMutation
>;
export type UpdatePermissionsListMutationResult =
  Apollo.MutationResult<UpdatePermissionsListMutation>;
export type UpdatePermissionsListMutationOptions = Apollo.BaseMutationOptions<
  UpdatePermissionsListMutation,
  UpdatePermissionsListMutationVariables
>;
