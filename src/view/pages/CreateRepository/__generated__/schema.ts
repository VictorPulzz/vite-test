/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchBoilerplateListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchBoilerplateListQuery = {
  __typename?: 'Query';
  boilerplateList: Array<{ __typename?: 'BoilerplateType'; value: number; label: string }>;
};

export type CreateRepositoryMutationVariables = Types.Exact<{
  input: Types.RepositoryCreateInput;
}>;

export type CreateRepositoryMutation = {
  __typename?: 'Mutation';
  repositoryCreate: { __typename?: 'RepositoryType'; name?: string | null };
};

export const FetchBoilerplateListDocument = gql`
  query FetchBoilerplateList {
    boilerplateList {
      value: id
      label: name
    }
  }
`;

/**
 * __useFetchBoilerplateListQuery__
 *
 * To run a query within a React component, call `useFetchBoilerplateListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchBoilerplateListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchBoilerplateListQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchBoilerplateListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchBoilerplateListQuery,
    FetchBoilerplateListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchBoilerplateListQuery, FetchBoilerplateListQueryVariables>(
    FetchBoilerplateListDocument,
    options,
  );
}
export function useFetchBoilerplateListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchBoilerplateListQuery,
    FetchBoilerplateListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchBoilerplateListQuery, FetchBoilerplateListQueryVariables>(
    FetchBoilerplateListDocument,
    options,
  );
}
export type FetchBoilerplateListQueryHookResult = ReturnType<typeof useFetchBoilerplateListQuery>;
export type FetchBoilerplateListLazyQueryHookResult = ReturnType<
  typeof useFetchBoilerplateListLazyQuery
>;
export type FetchBoilerplateListQueryResult = Apollo.QueryResult<
  FetchBoilerplateListQuery,
  FetchBoilerplateListQueryVariables
>;
export const CreateRepositoryDocument = gql`
  mutation CreateRepository($input: RepositoryCreateInput!) {
    repositoryCreate(data: $input) {
      name
    }
  }
`;
export type CreateRepositoryMutationFn = Apollo.MutationFunction<
  CreateRepositoryMutation,
  CreateRepositoryMutationVariables
>;

/**
 * __useCreateRepositoryMutation__
 *
 * To run a mutation, you first call `useCreateRepositoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRepositoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRepositoryMutation, { data, loading, error }] = useCreateRepositoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRepositoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRepositoryMutation,
    CreateRepositoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateRepositoryMutation, CreateRepositoryMutationVariables>(
    CreateRepositoryDocument,
    options,
  );
}
export type CreateRepositoryMutationHookResult = ReturnType<typeof useCreateRepositoryMutation>;
export type CreateRepositoryMutationResult = Apollo.MutationResult<CreateRepositoryMutation>;
export type CreateRepositoryMutationOptions = Apollo.BaseMutationOptions<
  CreateRepositoryMutation,
  CreateRepositoryMutationVariables
>;
