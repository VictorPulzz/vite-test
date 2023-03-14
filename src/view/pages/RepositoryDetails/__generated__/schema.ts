/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchRepositoryDetailsQueryVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type FetchRepositoryDetailsQuery = {
  __typename?: 'Query';
  repository: {
    __typename?: 'RepositoryType';
    id?: number | null;
    name?: string | null;
    createdAt: string;
    gitUrl?: string | null;
    gitTerraformUrl?: string | null;
    project: { __typename?: 'ProjectType'; name: string };
    technologies?: Array<{ __typename?: 'TechnologyType'; id: number; name: string }> | null;
  };
};

export type UpdateRepositoryMutationVariables = Types.Exact<{
  input: Types.RepositoryUpdateInput;
}>;

export type UpdateRepositoryMutation = {
  __typename?: 'Mutation';
  repositoryUpdate: { __typename?: 'RepositoryType'; name?: string | null };
};

export type FetchRepositoryParticipantsQueryVariables = Types.Exact<{
  pagination: Types.PaginationInput;
  filters?: Types.InputMaybe<Types.RepositoryParticipantFilter>;
}>;

export type FetchRepositoryParticipantsQuery = {
  __typename?: 'Query';
  repositoryParticipantList: {
    __typename?: 'RepositoryParticipantTypePagination';
    count: number;
    results: Array<{
      __typename?: 'RepositoryParticipantType';
      accessLevel: Types.RepositoryAccessLevelChoice;
      user: {
        __typename?: 'UserType';
        id?: string | null;
        fullName?: string | null;
        photo?: { __typename?: 'ImageType'; url: string } | null;
      };
    }>;
  };
};

export type AddOrUpdateRepositoryParticipantMutationVariables = Types.Exact<{
  input: Types.RepositoryParticipantInput;
}>;

export type AddOrUpdateRepositoryParticipantMutation = {
  __typename?: 'Mutation';
  repositoryParticipantCreateUpdate: {
    __typename?: 'RepositoryParticipantType';
    user: { __typename?: 'UserType'; fullName?: string | null };
  };
};

export type RemoveRepositoryParticipantMutationVariables = Types.Exact<{
  input: Types.RepositoryParticipantInput;
}>;

export type RemoveRepositoryParticipantMutation = {
  __typename?: 'Mutation';
  repositoryParticipantDelete: { __typename?: 'MessageType'; message: string };
};

export const FetchRepositoryDetailsDocument = gql`
  query FetchRepositoryDetails($input: IDInput!) {
    repository(data: $input) {
      id
      name
      project {
        name
      }
      createdAt
      gitUrl
      gitTerraformUrl
      technologies {
        id
        name
      }
    }
  }
`;

/**
 * __useFetchRepositoryDetailsQuery__
 *
 * To run a query within a React component, call `useFetchRepositoryDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchRepositoryDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchRepositoryDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchRepositoryDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchRepositoryDetailsQuery,
    FetchRepositoryDetailsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchRepositoryDetailsQuery, FetchRepositoryDetailsQueryVariables>(
    FetchRepositoryDetailsDocument,
    options,
  );
}
export function useFetchRepositoryDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchRepositoryDetailsQuery,
    FetchRepositoryDetailsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchRepositoryDetailsQuery, FetchRepositoryDetailsQueryVariables>(
    FetchRepositoryDetailsDocument,
    options,
  );
}
export type FetchRepositoryDetailsQueryHookResult = ReturnType<
  typeof useFetchRepositoryDetailsQuery
>;
export type FetchRepositoryDetailsLazyQueryHookResult = ReturnType<
  typeof useFetchRepositoryDetailsLazyQuery
>;
export type FetchRepositoryDetailsQueryResult = Apollo.QueryResult<
  FetchRepositoryDetailsQuery,
  FetchRepositoryDetailsQueryVariables
>;
export const UpdateRepositoryDocument = gql`
  mutation UpdateRepository($input: RepositoryUpdateInput!) {
    repositoryUpdate(data: $input) {
      name
    }
  }
`;
export type UpdateRepositoryMutationFn = Apollo.MutationFunction<
  UpdateRepositoryMutation,
  UpdateRepositoryMutationVariables
>;

/**
 * __useUpdateRepositoryMutation__
 *
 * To run a mutation, you first call `useUpdateRepositoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRepositoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRepositoryMutation, { data, loading, error }] = useUpdateRepositoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRepositoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateRepositoryMutation,
    UpdateRepositoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateRepositoryMutation, UpdateRepositoryMutationVariables>(
    UpdateRepositoryDocument,
    options,
  );
}
export type UpdateRepositoryMutationHookResult = ReturnType<typeof useUpdateRepositoryMutation>;
export type UpdateRepositoryMutationResult = Apollo.MutationResult<UpdateRepositoryMutation>;
export type UpdateRepositoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateRepositoryMutation,
  UpdateRepositoryMutationVariables
>;
export const FetchRepositoryParticipantsDocument = gql`
  query FetchRepositoryParticipants(
    $pagination: PaginationInput!
    $filters: RepositoryParticipantFilter
  ) {
    repositoryParticipantList(pagination: $pagination, filters: $filters) {
      results {
        user {
          id
          photo {
            url
          }
          fullName
        }
        accessLevel
      }
      count
    }
  }
`;

/**
 * __useFetchRepositoryParticipantsQuery__
 *
 * To run a query within a React component, call `useFetchRepositoryParticipantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchRepositoryParticipantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchRepositoryParticipantsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useFetchRepositoryParticipantsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchRepositoryParticipantsQuery,
    FetchRepositoryParticipantsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FetchRepositoryParticipantsQuery,
    FetchRepositoryParticipantsQueryVariables
  >(FetchRepositoryParticipantsDocument, options);
}
export function useFetchRepositoryParticipantsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchRepositoryParticipantsQuery,
    FetchRepositoryParticipantsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchRepositoryParticipantsQuery,
    FetchRepositoryParticipantsQueryVariables
  >(FetchRepositoryParticipantsDocument, options);
}
export type FetchRepositoryParticipantsQueryHookResult = ReturnType<
  typeof useFetchRepositoryParticipantsQuery
>;
export type FetchRepositoryParticipantsLazyQueryHookResult = ReturnType<
  typeof useFetchRepositoryParticipantsLazyQuery
>;
export type FetchRepositoryParticipantsQueryResult = Apollo.QueryResult<
  FetchRepositoryParticipantsQuery,
  FetchRepositoryParticipantsQueryVariables
>;
export const AddOrUpdateRepositoryParticipantDocument = gql`
  mutation AddOrUpdateRepositoryParticipant($input: RepositoryParticipantInput!) {
    repositoryParticipantCreateUpdate(data: $input) {
      user {
        fullName
      }
    }
  }
`;
export type AddOrUpdateRepositoryParticipantMutationFn = Apollo.MutationFunction<
  AddOrUpdateRepositoryParticipantMutation,
  AddOrUpdateRepositoryParticipantMutationVariables
>;

/**
 * __useAddOrUpdateRepositoryParticipantMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateRepositoryParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateRepositoryParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateRepositoryParticipantMutation, { data, loading, error }] = useAddOrUpdateRepositoryParticipantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddOrUpdateRepositoryParticipantMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddOrUpdateRepositoryParticipantMutation,
    AddOrUpdateRepositoryParticipantMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddOrUpdateRepositoryParticipantMutation,
    AddOrUpdateRepositoryParticipantMutationVariables
  >(AddOrUpdateRepositoryParticipantDocument, options);
}
export type AddOrUpdateRepositoryParticipantMutationHookResult = ReturnType<
  typeof useAddOrUpdateRepositoryParticipantMutation
>;
export type AddOrUpdateRepositoryParticipantMutationResult =
  Apollo.MutationResult<AddOrUpdateRepositoryParticipantMutation>;
export type AddOrUpdateRepositoryParticipantMutationOptions = Apollo.BaseMutationOptions<
  AddOrUpdateRepositoryParticipantMutation,
  AddOrUpdateRepositoryParticipantMutationVariables
>;
export const RemoveRepositoryParticipantDocument = gql`
  mutation RemoveRepositoryParticipant($input: RepositoryParticipantInput!) {
    repositoryParticipantDelete(data: $input) {
      message
    }
  }
`;
export type RemoveRepositoryParticipantMutationFn = Apollo.MutationFunction<
  RemoveRepositoryParticipantMutation,
  RemoveRepositoryParticipantMutationVariables
>;

/**
 * __useRemoveRepositoryParticipantMutation__
 *
 * To run a mutation, you first call `useRemoveRepositoryParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveRepositoryParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeRepositoryParticipantMutation, { data, loading, error }] = useRemoveRepositoryParticipantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveRepositoryParticipantMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveRepositoryParticipantMutation,
    RemoveRepositoryParticipantMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveRepositoryParticipantMutation,
    RemoveRepositoryParticipantMutationVariables
  >(RemoveRepositoryParticipantDocument, options);
}
export type RemoveRepositoryParticipantMutationHookResult = ReturnType<
  typeof useRemoveRepositoryParticipantMutation
>;
export type RemoveRepositoryParticipantMutationResult =
  Apollo.MutationResult<RemoveRepositoryParticipantMutation>;
export type RemoveRepositoryParticipantMutationOptions = Apollo.BaseMutationOptions<
  RemoveRepositoryParticipantMutation,
  RemoveRepositoryParticipantMutationVariables
>;
