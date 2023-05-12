/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchSlackTemplatesListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchSlackTemplatesListQuery = {
  slackTemplateList: Array<{
    id: number;
    label?: string | null;
    prefix: string;
    isPrivate?: boolean | null;
    initialUsers?: Array<{ id: number; fullName: string; photo?: { url: string } | null }> | null;
  }>;
};

export type FetchSlackTemplateInfoQueryVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type FetchSlackTemplateInfoQuery = {
  slackTemplate: {
    id: number;
    label?: string | null;
    prefix: string;
    isPrivate?: boolean | null;
    initialUsers?: Array<{ id: number; fullName: string; photo?: { url: string } | null }> | null;
  };
};

export type CreateSlackTemplateMutationVariables = Types.Exact<{
  input: Types.SlackChannelTemplateInput;
}>;

export type CreateSlackTemplateMutation = { slackTemplateCreate: { id: number } };

export type UpdateSlackTemplateMutationVariables = Types.Exact<{
  input: Types.SlackChannelTemplateInput;
}>;

export type UpdateSlackTemplateMutation = { slackTemplateUpdate: { id: number } };

export type DeleteSlackTemplateMutationVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type DeleteSlackTemplateMutation = { slackTemplateDelete: { message: string } };

export type FetchGitInitialUsersListQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.PaginationInput>;
  sort?: Types.InputMaybe<
    Array<Types.GitInitialUserSortFieldInput> | Types.GitInitialUserSortFieldInput
  >;
}>;

export type FetchGitInitialUsersListQuery = {
  gitInitialUserList: {
    count: number;
    results: Array<{
      accessLevel: Types.RepositoryAccessLevelChoice;
      user: {
        id: number;
        fullName: string;
        email: string;
        photo?: { url: string } | null;
        department?: { id: number; name: string } | null;
      };
    }>;
  };
};

export type FetchGitInitialUserDetailsQueryVariables = Types.Exact<{
  input: Types.GitInitialUserId;
}>;

export type FetchGitInitialUserDetailsQuery = {
  gitInitialUserDetails: { accessLevel: Types.RepositoryAccessLevelChoice; user: { id: number } };
};

export type CreateOrUpdateGitInitialUserMutationVariables = Types.Exact<{
  input: Types.GitInitialUserInput;
}>;

export type CreateOrUpdateGitInitialUserMutation = {
  gitInitialUserCreateUpdate: { accessLevel: Types.RepositoryAccessLevelChoice };
};

export type RemoveGitInitialUserMutationVariables = Types.Exact<{
  input: Types.GitInitialUserId;
}>;

export type RemoveGitInitialUserMutation = { gitInitialUserDelete: { message: string } };

export const FetchSlackTemplatesListDocument = gql`
  query FetchSlackTemplatesList {
    slackTemplateList {
      id
      label
      prefix
      initialUsers {
        id
        photo {
          url
        }
        fullName
      }
      isPrivate
    }
  }
`;

/**
 * __useFetchSlackTemplatesListQuery__
 *
 * To run a query within a React component, call `useFetchSlackTemplatesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchSlackTemplatesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchSlackTemplatesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchSlackTemplatesListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchSlackTemplatesListQuery,
    FetchSlackTemplatesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchSlackTemplatesListQuery, FetchSlackTemplatesListQueryVariables>(
    FetchSlackTemplatesListDocument,
    options,
  );
}
export function useFetchSlackTemplatesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchSlackTemplatesListQuery,
    FetchSlackTemplatesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchSlackTemplatesListQuery, FetchSlackTemplatesListQueryVariables>(
    FetchSlackTemplatesListDocument,
    options,
  );
}
export type FetchSlackTemplatesListQueryHookResult = ReturnType<
  typeof useFetchSlackTemplatesListQuery
>;
export type FetchSlackTemplatesListLazyQueryHookResult = ReturnType<
  typeof useFetchSlackTemplatesListLazyQuery
>;
export type FetchSlackTemplatesListQueryResult = Apollo.QueryResult<
  FetchSlackTemplatesListQuery,
  FetchSlackTemplatesListQueryVariables
>;
export const FetchSlackTemplateInfoDocument = gql`
  query FetchSlackTemplateInfo($input: IDInput!) {
    slackTemplate(data: $input) {
      id
      label
      prefix
      initialUsers {
        id
        photo {
          url
        }
        fullName
      }
      isPrivate
    }
  }
`;

/**
 * __useFetchSlackTemplateInfoQuery__
 *
 * To run a query within a React component, call `useFetchSlackTemplateInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchSlackTemplateInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchSlackTemplateInfoQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchSlackTemplateInfoQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchSlackTemplateInfoQuery,
    FetchSlackTemplateInfoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchSlackTemplateInfoQuery, FetchSlackTemplateInfoQueryVariables>(
    FetchSlackTemplateInfoDocument,
    options,
  );
}
export function useFetchSlackTemplateInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchSlackTemplateInfoQuery,
    FetchSlackTemplateInfoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchSlackTemplateInfoQuery, FetchSlackTemplateInfoQueryVariables>(
    FetchSlackTemplateInfoDocument,
    options,
  );
}
export type FetchSlackTemplateInfoQueryHookResult = ReturnType<
  typeof useFetchSlackTemplateInfoQuery
>;
export type FetchSlackTemplateInfoLazyQueryHookResult = ReturnType<
  typeof useFetchSlackTemplateInfoLazyQuery
>;
export type FetchSlackTemplateInfoQueryResult = Apollo.QueryResult<
  FetchSlackTemplateInfoQuery,
  FetchSlackTemplateInfoQueryVariables
>;
export const CreateSlackTemplateDocument = gql`
  mutation CreateSlackTemplate($input: SlackChannelTemplateInput!) {
    slackTemplateCreate(data: $input) {
      id
    }
  }
`;
export type CreateSlackTemplateMutationFn = Apollo.MutationFunction<
  CreateSlackTemplateMutation,
  CreateSlackTemplateMutationVariables
>;

/**
 * __useCreateSlackTemplateMutation__
 *
 * To run a mutation, you first call `useCreateSlackTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSlackTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSlackTemplateMutation, { data, loading, error }] = useCreateSlackTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSlackTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSlackTemplateMutation,
    CreateSlackTemplateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateSlackTemplateMutation, CreateSlackTemplateMutationVariables>(
    CreateSlackTemplateDocument,
    options,
  );
}
export type CreateSlackTemplateMutationHookResult = ReturnType<
  typeof useCreateSlackTemplateMutation
>;
export type CreateSlackTemplateMutationResult = Apollo.MutationResult<CreateSlackTemplateMutation>;
export type CreateSlackTemplateMutationOptions = Apollo.BaseMutationOptions<
  CreateSlackTemplateMutation,
  CreateSlackTemplateMutationVariables
>;
export const UpdateSlackTemplateDocument = gql`
  mutation UpdateSlackTemplate($input: SlackChannelTemplateInput!) {
    slackTemplateUpdate(data: $input) {
      id
    }
  }
`;
export type UpdateSlackTemplateMutationFn = Apollo.MutationFunction<
  UpdateSlackTemplateMutation,
  UpdateSlackTemplateMutationVariables
>;

/**
 * __useUpdateSlackTemplateMutation__
 *
 * To run a mutation, you first call `useUpdateSlackTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSlackTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSlackTemplateMutation, { data, loading, error }] = useUpdateSlackTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSlackTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSlackTemplateMutation,
    UpdateSlackTemplateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateSlackTemplateMutation, UpdateSlackTemplateMutationVariables>(
    UpdateSlackTemplateDocument,
    options,
  );
}
export type UpdateSlackTemplateMutationHookResult = ReturnType<
  typeof useUpdateSlackTemplateMutation
>;
export type UpdateSlackTemplateMutationResult = Apollo.MutationResult<UpdateSlackTemplateMutation>;
export type UpdateSlackTemplateMutationOptions = Apollo.BaseMutationOptions<
  UpdateSlackTemplateMutation,
  UpdateSlackTemplateMutationVariables
>;
export const DeleteSlackTemplateDocument = gql`
  mutation DeleteSlackTemplate($input: IDInput!) {
    slackTemplateDelete(data: $input) {
      message
    }
  }
`;
export type DeleteSlackTemplateMutationFn = Apollo.MutationFunction<
  DeleteSlackTemplateMutation,
  DeleteSlackTemplateMutationVariables
>;

/**
 * __useDeleteSlackTemplateMutation__
 *
 * To run a mutation, you first call `useDeleteSlackTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSlackTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSlackTemplateMutation, { data, loading, error }] = useDeleteSlackTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteSlackTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteSlackTemplateMutation,
    DeleteSlackTemplateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteSlackTemplateMutation, DeleteSlackTemplateMutationVariables>(
    DeleteSlackTemplateDocument,
    options,
  );
}
export type DeleteSlackTemplateMutationHookResult = ReturnType<
  typeof useDeleteSlackTemplateMutation
>;
export type DeleteSlackTemplateMutationResult = Apollo.MutationResult<DeleteSlackTemplateMutation>;
export type DeleteSlackTemplateMutationOptions = Apollo.BaseMutationOptions<
  DeleteSlackTemplateMutation,
  DeleteSlackTemplateMutationVariables
>;
export const FetchGitInitialUsersListDocument = gql`
  query FetchGitInitialUsersList(
    $pagination: PaginationInput
    $sort: [GitInitialUserSortFieldInput!]
  ) {
    gitInitialUserList(pagination: $pagination, sort: $sort) {
      results {
        user {
          id
          fullName
          photo {
            url
          }
          department {
            id
            name
          }
          email
        }
        accessLevel
      }
      count
    }
  }
`;

/**
 * __useFetchGitInitialUsersListQuery__
 *
 * To run a query within a React component, call `useFetchGitInitialUsersListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchGitInitialUsersListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchGitInitialUsersListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFetchGitInitialUsersListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchGitInitialUsersListQuery,
    FetchGitInitialUsersListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchGitInitialUsersListQuery, FetchGitInitialUsersListQueryVariables>(
    FetchGitInitialUsersListDocument,
    options,
  );
}
export function useFetchGitInitialUsersListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchGitInitialUsersListQuery,
    FetchGitInitialUsersListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchGitInitialUsersListQuery, FetchGitInitialUsersListQueryVariables>(
    FetchGitInitialUsersListDocument,
    options,
  );
}
export type FetchGitInitialUsersListQueryHookResult = ReturnType<
  typeof useFetchGitInitialUsersListQuery
>;
export type FetchGitInitialUsersListLazyQueryHookResult = ReturnType<
  typeof useFetchGitInitialUsersListLazyQuery
>;
export type FetchGitInitialUsersListQueryResult = Apollo.QueryResult<
  FetchGitInitialUsersListQuery,
  FetchGitInitialUsersListQueryVariables
>;
export const FetchGitInitialUserDetailsDocument = gql`
  query FetchGitInitialUserDetails($input: GitInitialUserId!) {
    gitInitialUserDetails(data: $input) {
      user {
        id
      }
      accessLevel
    }
  }
`;

/**
 * __useFetchGitInitialUserDetailsQuery__
 *
 * To run a query within a React component, call `useFetchGitInitialUserDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchGitInitialUserDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchGitInitialUserDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchGitInitialUserDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchGitInitialUserDetailsQuery,
    FetchGitInitialUserDetailsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchGitInitialUserDetailsQuery, FetchGitInitialUserDetailsQueryVariables>(
    FetchGitInitialUserDetailsDocument,
    options,
  );
}
export function useFetchGitInitialUserDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchGitInitialUserDetailsQuery,
    FetchGitInitialUserDetailsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchGitInitialUserDetailsQuery,
    FetchGitInitialUserDetailsQueryVariables
  >(FetchGitInitialUserDetailsDocument, options);
}
export type FetchGitInitialUserDetailsQueryHookResult = ReturnType<
  typeof useFetchGitInitialUserDetailsQuery
>;
export type FetchGitInitialUserDetailsLazyQueryHookResult = ReturnType<
  typeof useFetchGitInitialUserDetailsLazyQuery
>;
export type FetchGitInitialUserDetailsQueryResult = Apollo.QueryResult<
  FetchGitInitialUserDetailsQuery,
  FetchGitInitialUserDetailsQueryVariables
>;
export const CreateOrUpdateGitInitialUserDocument = gql`
  mutation CreateOrUpdateGitInitialUser($input: GitInitialUserInput!) {
    gitInitialUserCreateUpdate(data: $input) {
      accessLevel
    }
  }
`;
export type CreateOrUpdateGitInitialUserMutationFn = Apollo.MutationFunction<
  CreateOrUpdateGitInitialUserMutation,
  CreateOrUpdateGitInitialUserMutationVariables
>;

/**
 * __useCreateOrUpdateGitInitialUserMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateGitInitialUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateGitInitialUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateGitInitialUserMutation, { data, loading, error }] = useCreateOrUpdateGitInitialUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateGitInitialUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrUpdateGitInitialUserMutation,
    CreateOrUpdateGitInitialUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateOrUpdateGitInitialUserMutation,
    CreateOrUpdateGitInitialUserMutationVariables
  >(CreateOrUpdateGitInitialUserDocument, options);
}
export type CreateOrUpdateGitInitialUserMutationHookResult = ReturnType<
  typeof useCreateOrUpdateGitInitialUserMutation
>;
export type CreateOrUpdateGitInitialUserMutationResult =
  Apollo.MutationResult<CreateOrUpdateGitInitialUserMutation>;
export type CreateOrUpdateGitInitialUserMutationOptions = Apollo.BaseMutationOptions<
  CreateOrUpdateGitInitialUserMutation,
  CreateOrUpdateGitInitialUserMutationVariables
>;
export const RemoveGitInitialUserDocument = gql`
  mutation RemoveGitInitialUser($input: GitInitialUserId!) {
    gitInitialUserDelete(data: $input) {
      message
    }
  }
`;
export type RemoveGitInitialUserMutationFn = Apollo.MutationFunction<
  RemoveGitInitialUserMutation,
  RemoveGitInitialUserMutationVariables
>;

/**
 * __useRemoveGitInitialUserMutation__
 *
 * To run a mutation, you first call `useRemoveGitInitialUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveGitInitialUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeGitInitialUserMutation, { data, loading, error }] = useRemoveGitInitialUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveGitInitialUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveGitInitialUserMutation,
    RemoveGitInitialUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveGitInitialUserMutation, RemoveGitInitialUserMutationVariables>(
    RemoveGitInitialUserDocument,
    options,
  );
}
export type RemoveGitInitialUserMutationHookResult = ReturnType<
  typeof useRemoveGitInitialUserMutation
>;
export type RemoveGitInitialUserMutationResult =
  Apollo.MutationResult<RemoveGitInitialUserMutation>;
export type RemoveGitInitialUserMutationOptions = Apollo.BaseMutationOptions<
  RemoveGitInitialUserMutation,
  RemoveGitInitialUserMutationVariables
>;
