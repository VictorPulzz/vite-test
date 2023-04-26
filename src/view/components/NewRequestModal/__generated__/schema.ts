/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchRolesListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchRolesListQuery = { rolesList: Array<{ value: number; label: string }> };

export type FetchAllRepositoriesQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.RepositoryFilter>;
  pagination: Types.PaginationInput;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type FetchAllRepositoriesQuery = {
  repositoryList: { results: Array<{ value: number; label?: string | null }> };
};

export type FetchTechnologiesListQueryVariables = Types.Exact<{
  pagination: Types.PaginationInput;
}>;

export type FetchTechnologiesListQuery = {
  technologyList: { results: Array<{ value: number; label: string }> };
};

export type FetchAllUsersQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.UserFilter>;
  pagination: Types.PaginationInput;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type FetchAllUsersQuery = {
  usersList: { results: Array<{ id: number; fullName: string }> };
};

export type FetchAllProjectsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ProjectFilter>;
  pagination: Types.PaginationInput;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type FetchAllProjectsQuery = {
  projectsList: { results: Array<{ value: number; label: string }> };
};

export type CreateRequestMutationVariables = Types.Exact<{
  input: Types.RequestCreateInput;
}>;

export type CreateRequestMutation = { requestCreate: { id: number } };

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
export const FetchAllRepositoriesDocument = gql`
  query FetchAllRepositories(
    $filters: RepositoryFilter
    $pagination: PaginationInput!
    $search: String
  ) {
    repositoryList(filters: $filters, pagination: $pagination, search: $search) {
      results {
        value: id
        label: name
      }
    }
  }
`;

/**
 * __useFetchAllRepositoriesQuery__
 *
 * To run a query within a React component, call `useFetchAllRepositoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllRepositoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllRepositoriesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useFetchAllRepositoriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchAllRepositoriesQuery,
    FetchAllRepositoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchAllRepositoriesQuery, FetchAllRepositoriesQueryVariables>(
    FetchAllRepositoriesDocument,
    options,
  );
}
export function useFetchAllRepositoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchAllRepositoriesQuery,
    FetchAllRepositoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchAllRepositoriesQuery, FetchAllRepositoriesQueryVariables>(
    FetchAllRepositoriesDocument,
    options,
  );
}
export type FetchAllRepositoriesQueryHookResult = ReturnType<typeof useFetchAllRepositoriesQuery>;
export type FetchAllRepositoriesLazyQueryHookResult = ReturnType<
  typeof useFetchAllRepositoriesLazyQuery
>;
export type FetchAllRepositoriesQueryResult = Apollo.QueryResult<
  FetchAllRepositoriesQuery,
  FetchAllRepositoriesQueryVariables
>;
export const FetchTechnologiesListDocument = gql`
  query FetchTechnologiesList($pagination: PaginationInput!) {
    technologyList(pagination: $pagination) {
      results {
        value: id
        label: name
      }
    }
  }
`;

/**
 * __useFetchTechnologiesListQuery__
 *
 * To run a query within a React component, call `useFetchTechnologiesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchTechnologiesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchTechnologiesListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFetchTechnologiesListQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchTechnologiesListQuery,
    FetchTechnologiesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchTechnologiesListQuery, FetchTechnologiesListQueryVariables>(
    FetchTechnologiesListDocument,
    options,
  );
}
export function useFetchTechnologiesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchTechnologiesListQuery,
    FetchTechnologiesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchTechnologiesListQuery, FetchTechnologiesListQueryVariables>(
    FetchTechnologiesListDocument,
    options,
  );
}
export type FetchTechnologiesListQueryHookResult = ReturnType<typeof useFetchTechnologiesListQuery>;
export type FetchTechnologiesListLazyQueryHookResult = ReturnType<
  typeof useFetchTechnologiesListLazyQuery
>;
export type FetchTechnologiesListQueryResult = Apollo.QueryResult<
  FetchTechnologiesListQuery,
  FetchTechnologiesListQueryVariables
>;
export const FetchAllUsersDocument = gql`
  query FetchAllUsers($filters: UserFilter, $pagination: PaginationInput!, $search: String) {
    usersList(filters: $filters, pagination: $pagination, search: $search) {
      results {
        id
        fullName
      }
    }
  }
`;

/**
 * __useFetchAllUsersQuery__
 *
 * To run a query within a React component, call `useFetchAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllUsersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useFetchAllUsersQuery(
  baseOptions: Apollo.QueryHookOptions<FetchAllUsersQuery, FetchAllUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchAllUsersQuery, FetchAllUsersQueryVariables>(
    FetchAllUsersDocument,
    options,
  );
}
export function useFetchAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchAllUsersQuery, FetchAllUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchAllUsersQuery, FetchAllUsersQueryVariables>(
    FetchAllUsersDocument,
    options,
  );
}
export type FetchAllUsersQueryHookResult = ReturnType<typeof useFetchAllUsersQuery>;
export type FetchAllUsersLazyQueryHookResult = ReturnType<typeof useFetchAllUsersLazyQuery>;
export type FetchAllUsersQueryResult = Apollo.QueryResult<
  FetchAllUsersQuery,
  FetchAllUsersQueryVariables
>;
export const FetchAllProjectsDocument = gql`
  query FetchAllProjects($filters: ProjectFilter, $pagination: PaginationInput!, $search: String) {
    projectsList(filters: $filters, pagination: $pagination, search: $search) {
      results {
        value: id
        label: name
      }
    }
  }
`;

/**
 * __useFetchAllProjectsQuery__
 *
 * To run a query within a React component, call `useFetchAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllProjectsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useFetchAllProjectsQuery(
  baseOptions: Apollo.QueryHookOptions<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>(
    FetchAllProjectsDocument,
    options,
  );
}
export function useFetchAllProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>(
    FetchAllProjectsDocument,
    options,
  );
}
export type FetchAllProjectsQueryHookResult = ReturnType<typeof useFetchAllProjectsQuery>;
export type FetchAllProjectsLazyQueryHookResult = ReturnType<typeof useFetchAllProjectsLazyQuery>;
export type FetchAllProjectsQueryResult = Apollo.QueryResult<
  FetchAllProjectsQuery,
  FetchAllProjectsQueryVariables
>;
export const CreateRequestDocument = gql`
  mutation CreateRequest($input: RequestCreateInput!) {
    requestCreate(data: $input) {
      id
    }
  }
`;
export type CreateRequestMutationFn = Apollo.MutationFunction<
  CreateRequestMutation,
  CreateRequestMutationVariables
>;

/**
 * __useCreateRequestMutation__
 *
 * To run a mutation, you first call `useCreateRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRequestMutation, { data, loading, error }] = useCreateRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateRequestMutation, CreateRequestMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateRequestMutation, CreateRequestMutationVariables>(
    CreateRequestDocument,
    options,
  );
}
export type CreateRequestMutationHookResult = ReturnType<typeof useCreateRequestMutation>;
export type CreateRequestMutationResult = Apollo.MutationResult<CreateRequestMutation>;
export type CreateRequestMutationOptions = Apollo.BaseMutationOptions<
  CreateRequestMutation,
  CreateRequestMutationVariables
>;
