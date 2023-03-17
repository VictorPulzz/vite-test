/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchRepositoriesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.RepositoryFilter>;
  pagination: Types.PaginationInput;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type FetchRepositoriesQuery = {
  __typename?: 'Query';
  repositoryList: {
    __typename?: 'RepositoryTypePagination';
    count: number;
    results: Array<{
      __typename?: 'RepositoryType';
      id?: number | null;
      name?: string | null;
      createdAt: string;
      type?: Types.RepositoryTypeChoice | null;
      gitUrl?: string | null;
      project: { __typename?: 'ProjectType'; id: number; name: string };
      technologies?: Array<{ __typename?: 'TechnologyType'; id: number; name: string }> | null;
    }>;
  };
};

export type RemoveRepositoryMutationVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type RemoveRepositoryMutation = {
  __typename?: 'Mutation';
  repositoryDelete: { __typename?: 'MessageType'; message: string };
};

export const FetchRepositoriesDocument = gql`
  query FetchRepositories(
    $filters: RepositoryFilter
    $pagination: PaginationInput!
    $search: String
  ) {
    repositoryList(filters: $filters, pagination: $pagination, search: $search) {
      results {
        id
        name
        project {
          id
          name
        }
        createdAt
        type
        technologies {
          id
          name
        }
        gitUrl
      }
      count
    }
  }
`;

/**
 * __useFetchRepositoriesQuery__
 *
 * To run a query within a React component, call `useFetchRepositoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchRepositoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchRepositoriesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useFetchRepositoriesQuery(
  baseOptions: Apollo.QueryHookOptions<FetchRepositoriesQuery, FetchRepositoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchRepositoriesQuery, FetchRepositoriesQueryVariables>(
    FetchRepositoriesDocument,
    options,
  );
}
export function useFetchRepositoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchRepositoriesQuery,
    FetchRepositoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchRepositoriesQuery, FetchRepositoriesQueryVariables>(
    FetchRepositoriesDocument,
    options,
  );
}
export type FetchRepositoriesQueryHookResult = ReturnType<typeof useFetchRepositoriesQuery>;
export type FetchRepositoriesLazyQueryHookResult = ReturnType<typeof useFetchRepositoriesLazyQuery>;
export type FetchRepositoriesQueryResult = Apollo.QueryResult<
  FetchRepositoriesQuery,
  FetchRepositoriesQueryVariables
>;
export const RemoveRepositoryDocument = gql`
  mutation RemoveRepository($input: IDInput!) {
    repositoryDelete(data: $input) {
      message
    }
  }
`;
export type RemoveRepositoryMutationFn = Apollo.MutationFunction<
  RemoveRepositoryMutation,
  RemoveRepositoryMutationVariables
>;

/**
 * __useRemoveRepositoryMutation__
 *
 * To run a mutation, you first call `useRemoveRepositoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveRepositoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeRepositoryMutation, { data, loading, error }] = useRemoveRepositoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveRepositoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveRepositoryMutation,
    RemoveRepositoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveRepositoryMutation, RemoveRepositoryMutationVariables>(
    RemoveRepositoryDocument,
    options,
  );
}
export type RemoveRepositoryMutationHookResult = ReturnType<typeof useRemoveRepositoryMutation>;
export type RemoveRepositoryMutationResult = Apollo.MutationResult<RemoveRepositoryMutation>;
export type RemoveRepositoryMutationOptions = Apollo.BaseMutationOptions<
  RemoveRepositoryMutation,
  RemoveRepositoryMutationVariables
>;
