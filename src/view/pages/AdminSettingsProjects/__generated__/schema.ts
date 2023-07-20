/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchProjectInitialUsersListQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.PaginationInput>;
  sort?: Types.InputMaybe<
    Array<Types.ProjectInitialUserSortFieldInput> | Types.ProjectInitialUserSortFieldInput
  >;
}>;

export type FetchProjectInitialUsersListQuery = {
  projectInitialUserList: {
    count: number;
    results: Array<{
      user: {
        id: number;
        fullName: string;
        email: string;
        photoThumbnail?: { url: string } | null;
        department?: { id: number; name: string } | null;
      };
    }>;
  };
};

export type CreateProjectInitialUserMutationVariables = Types.Exact<{
  input: Types.ProjectInitialUserId;
}>;

export type CreateProjectInitialUserMutation = {
  projectInitialUserCreate: { user: { id: number } };
};

export type RemoveProjectInitialUserMutationVariables = Types.Exact<{
  input: Types.ProjectInitialUserId;
}>;

export type RemoveProjectInitialUserMutation = { projectInitialUserDelete: { message: string } };

export const FetchProjectInitialUsersListDocument = gql`
  query FetchProjectInitialUsersList(
    $pagination: PaginationInput
    $sort: [ProjectInitialUserSortFieldInput!]
  ) {
    projectInitialUserList(pagination: $pagination, sort: $sort) {
      results {
        user {
          id
          fullName
          photoThumbnail {
            url
          }
          department {
            id
            name
          }
          email
        }
      }
      count
    }
  }
`;

/**
 * __useFetchProjectInitialUsersListQuery__
 *
 * To run a query within a React component, call `useFetchProjectInitialUsersListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectInitialUsersListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectInitialUsersListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFetchProjectInitialUsersListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchProjectInitialUsersListQuery,
    FetchProjectInitialUsersListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FetchProjectInitialUsersListQuery,
    FetchProjectInitialUsersListQueryVariables
  >(FetchProjectInitialUsersListDocument, options);
}
export function useFetchProjectInitialUsersListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchProjectInitialUsersListQuery,
    FetchProjectInitialUsersListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchProjectInitialUsersListQuery,
    FetchProjectInitialUsersListQueryVariables
  >(FetchProjectInitialUsersListDocument, options);
}
export type FetchProjectInitialUsersListQueryHookResult = ReturnType<
  typeof useFetchProjectInitialUsersListQuery
>;
export type FetchProjectInitialUsersListLazyQueryHookResult = ReturnType<
  typeof useFetchProjectInitialUsersListLazyQuery
>;
export type FetchProjectInitialUsersListQueryResult = Apollo.QueryResult<
  FetchProjectInitialUsersListQuery,
  FetchProjectInitialUsersListQueryVariables
>;
export const CreateProjectInitialUserDocument = gql`
  mutation CreateProjectInitialUser($input: ProjectInitialUserId!) {
    projectInitialUserCreate(data: $input) {
      user {
        id
      }
    }
  }
`;
export type CreateProjectInitialUserMutationFn = Apollo.MutationFunction<
  CreateProjectInitialUserMutation,
  CreateProjectInitialUserMutationVariables
>;

/**
 * __useCreateProjectInitialUserMutation__
 *
 * To run a mutation, you first call `useCreateProjectInitialUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectInitialUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectInitialUserMutation, { data, loading, error }] = useCreateProjectInitialUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectInitialUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProjectInitialUserMutation,
    CreateProjectInitialUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProjectInitialUserMutation,
    CreateProjectInitialUserMutationVariables
  >(CreateProjectInitialUserDocument, options);
}
export type CreateProjectInitialUserMutationHookResult = ReturnType<
  typeof useCreateProjectInitialUserMutation
>;
export type CreateProjectInitialUserMutationResult =
  Apollo.MutationResult<CreateProjectInitialUserMutation>;
export type CreateProjectInitialUserMutationOptions = Apollo.BaseMutationOptions<
  CreateProjectInitialUserMutation,
  CreateProjectInitialUserMutationVariables
>;
export const RemoveProjectInitialUserDocument = gql`
  mutation RemoveProjectInitialUser($input: ProjectInitialUserId!) {
    projectInitialUserDelete(data: $input) {
      message
    }
  }
`;
export type RemoveProjectInitialUserMutationFn = Apollo.MutationFunction<
  RemoveProjectInitialUserMutation,
  RemoveProjectInitialUserMutationVariables
>;

/**
 * __useRemoveProjectInitialUserMutation__
 *
 * To run a mutation, you first call `useRemoveProjectInitialUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectInitialUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectInitialUserMutation, { data, loading, error }] = useRemoveProjectInitialUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveProjectInitialUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveProjectInitialUserMutation,
    RemoveProjectInitialUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveProjectInitialUserMutation,
    RemoveProjectInitialUserMutationVariables
  >(RemoveProjectInitialUserDocument, options);
}
export type RemoveProjectInitialUserMutationHookResult = ReturnType<
  typeof useRemoveProjectInitialUserMutation
>;
export type RemoveProjectInitialUserMutationResult =
  Apollo.MutationResult<RemoveProjectInitialUserMutation>;
export type RemoveProjectInitialUserMutationOptions = Apollo.BaseMutationOptions<
  RemoveProjectInitialUserMutation,
  RemoveProjectInitialUserMutationVariables
>;
