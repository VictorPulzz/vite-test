/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateProjectMutationVariables = Types.Exact<{
  input: Types.ProjectInput;
}>;

export type CreateProjectMutation = {
  __typename?: 'Mutation';
  project: { __typename?: 'ProjectType'; id: number };
};

export type FetchProjectQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectQuery = {
  __typename?: 'Query';
  project: { __typename?: 'ProjectType'; id: number; name?: string | null };
};

export const CreateProjectDocument = gql`
  mutation CreateProject($input: ProjectInput!) {
    project(data: $input) {
      id
    }
  }
`;
export type CreateProjectMutationFn = Apollo.MutationFunction<
  CreateProjectMutation,
  CreateProjectMutationVariables
>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(
    CreateProjectDocument,
    options,
  );
}
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<
  CreateProjectMutation,
  CreateProjectMutationVariables
>;
export const FetchProjectDocument = gql`
  query FetchProject($data: IDInput!) {
    project(data: $data) {
      id
      name
    }
  }
`;

/**
 * __useFetchProjectQuery__
 *
 * To run a query within a React component, call `useFetchProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFetchProjectQuery(
  baseOptions: Apollo.QueryHookOptions<FetchProjectQuery, FetchProjectQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchProjectQuery, FetchProjectQueryVariables>(
    FetchProjectDocument,
    options,
  );
}
export function useFetchProjectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchProjectQuery, FetchProjectQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchProjectQuery, FetchProjectQueryVariables>(
    FetchProjectDocument,
    options,
  );
}
export type FetchProjectQueryHookResult = ReturnType<typeof useFetchProjectQuery>;
export type FetchProjectLazyQueryHookResult = ReturnType<typeof useFetchProjectLazyQuery>;
export type FetchProjectQueryResult = Apollo.QueryResult<
  FetchProjectQuery,
  FetchProjectQueryVariables
>;
