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
  };
};

export type UpdateRepositoryMutationVariables = Types.Exact<{
  input: Types.RepositoryUpdateInput;
}>;

export type UpdateRepositoryMutation = {
  __typename?: 'Mutation';
  repositoryUpdate: { __typename?: 'RepositoryType'; name?: string | null };
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
