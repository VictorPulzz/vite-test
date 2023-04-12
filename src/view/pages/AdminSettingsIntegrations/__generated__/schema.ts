/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchSlackTemplatesListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchSlackTemplatesListQuery = {
  __typename?: 'Query';
  slackTemplateList: Array<{
    __typename?: 'SlackChannelTemplateType';
    id: number;
    label?: string | null;
    prefix: string;
    isPrivate?: boolean | null;
    initialUsers?: Array<{
      __typename?: 'UserType';
      id?: string | null;
      fullName?: string | null;
      photo?: { __typename?: 'ImageType'; url: string } | null;
    }> | null;
  }>;
};

export type FetchSlackTemplateInfoQueryVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type FetchSlackTemplateInfoQuery = {
  __typename?: 'Query';
  slackTemplate: {
    __typename?: 'SlackChannelTemplateType';
    id: number;
    label?: string | null;
    prefix: string;
    isPrivate?: boolean | null;
    initialUsers?: Array<{
      __typename?: 'UserType';
      id?: string | null;
      fullName?: string | null;
      photo?: { __typename?: 'ImageType'; url: string } | null;
    }> | null;
  };
};

export type CreateSlackTemplateMutationVariables = Types.Exact<{
  input: Types.SlackChannelTemplateInput;
}>;

export type CreateSlackTemplateMutation = {
  __typename?: 'Mutation';
  slackTemplateCreate: { __typename?: 'SlackChannelTemplateType'; id: number };
};

export type UpdateSlackTemplateMutationVariables = Types.Exact<{
  input: Types.SlackChannelTemplateInput;
}>;

export type UpdateSlackTemplateMutation = {
  __typename?: 'Mutation';
  slackTemplateUpdate: { __typename?: 'SlackChannelTemplateType'; id: number };
};

export type DeleteSlackTemplateMutationVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type DeleteSlackTemplateMutation = {
  __typename?: 'Mutation';
  slackTemplateDelete: { __typename?: 'MessageType'; message: string };
};

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
