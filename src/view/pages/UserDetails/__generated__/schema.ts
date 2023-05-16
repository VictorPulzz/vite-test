/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchUserDetailsQueryVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type FetchUserDetailsQuery = {
  userDetails: {
    id: number;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive?: boolean | null;
    contractType?: Types.ContractChoice | null;
    birthDate?: string | null;
    address?: string | null;
    photo?: { url: string } | null;
    department?: { id: number; name: string } | null;
    role?: { id: number; name: string } | null;
  };
};

export type FetchUserProjectsListQueryVariables = Types.Exact<{
  input: Types.IdInput;
  pagination?: Types.InputMaybe<Types.PaginationInput>;
}>;

export type FetchUserProjectsListQuery = {
  userProjects: {
    count: number;
    results: Array<{
      currentTeam: boolean;
      project: { id: number; name: string; status?: { id: number; name: string } | null };
    }>;
  };
};

export type FetchUserHistoryListQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.LogFilter>;
  pagination?: Types.InputMaybe<Types.PaginationInput>;
}>;

export type FetchUserHistoryListQuery = {
  logList: { count: number; results: Array<{ id: number; message: string; createdAt: string }> };
};

export type ConnectUserToBitbucketMutationVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type ConnectUserToBitbucketMutation = {
  userConnectBitbucket: { bitbucketId?: string | null };
};

export const FetchUserDetailsDocument = gql`
  query FetchUserDetails($input: IDInput!) {
    userDetails(data: $input) {
      id
      fullName
      firstName
      lastName
      email
      photo {
        url
      }
      department {
        id
        name
      }
      role {
        id
        name
      }
      isActive
      contractType
      birthDate
      address
    }
  }
`;

/**
 * __useFetchUserDetailsQuery__
 *
 * To run a query within a React component, call `useFetchUserDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchUserDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<FetchUserDetailsQuery, FetchUserDetailsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchUserDetailsQuery, FetchUserDetailsQueryVariables>(
    FetchUserDetailsDocument,
    options,
  );
}
export function useFetchUserDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchUserDetailsQuery, FetchUserDetailsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchUserDetailsQuery, FetchUserDetailsQueryVariables>(
    FetchUserDetailsDocument,
    options,
  );
}
export type FetchUserDetailsQueryHookResult = ReturnType<typeof useFetchUserDetailsQuery>;
export type FetchUserDetailsLazyQueryHookResult = ReturnType<typeof useFetchUserDetailsLazyQuery>;
export type FetchUserDetailsQueryResult = Apollo.QueryResult<
  FetchUserDetailsQuery,
  FetchUserDetailsQueryVariables
>;
export const FetchUserProjectsListDocument = gql`
  query FetchUserProjectsList($input: IDInput!, $pagination: PaginationInput) {
    userProjects(data: $input, pagination: $pagination) {
      results {
        project {
          id
          name
          status {
            id
            name
          }
        }
        currentTeam
      }
      count
    }
  }
`;

/**
 * __useFetchUserProjectsListQuery__
 *
 * To run a query within a React component, call `useFetchUserProjectsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserProjectsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserProjectsListQuery({
 *   variables: {
 *      input: // value for 'input'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFetchUserProjectsListQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchUserProjectsListQuery,
    FetchUserProjectsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchUserProjectsListQuery, FetchUserProjectsListQueryVariables>(
    FetchUserProjectsListDocument,
    options,
  );
}
export function useFetchUserProjectsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchUserProjectsListQuery,
    FetchUserProjectsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchUserProjectsListQuery, FetchUserProjectsListQueryVariables>(
    FetchUserProjectsListDocument,
    options,
  );
}
export type FetchUserProjectsListQueryHookResult = ReturnType<typeof useFetchUserProjectsListQuery>;
export type FetchUserProjectsListLazyQueryHookResult = ReturnType<
  typeof useFetchUserProjectsListLazyQuery
>;
export type FetchUserProjectsListQueryResult = Apollo.QueryResult<
  FetchUserProjectsListQuery,
  FetchUserProjectsListQueryVariables
>;
export const FetchUserHistoryListDocument = gql`
  query FetchUserHistoryList($filters: LogFilter, $pagination: PaginationInput) {
    logList(filters: $filters, pagination: $pagination) {
      results {
        id
        message
        createdAt
      }
      count
    }
  }
`;

/**
 * __useFetchUserHistoryListQuery__
 *
 * To run a query within a React component, call `useFetchUserHistoryListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserHistoryListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserHistoryListQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFetchUserHistoryListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchUserHistoryListQuery,
    FetchUserHistoryListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchUserHistoryListQuery, FetchUserHistoryListQueryVariables>(
    FetchUserHistoryListDocument,
    options,
  );
}
export function useFetchUserHistoryListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchUserHistoryListQuery,
    FetchUserHistoryListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchUserHistoryListQuery, FetchUserHistoryListQueryVariables>(
    FetchUserHistoryListDocument,
    options,
  );
}
export type FetchUserHistoryListQueryHookResult = ReturnType<typeof useFetchUserHistoryListQuery>;
export type FetchUserHistoryListLazyQueryHookResult = ReturnType<
  typeof useFetchUserHistoryListLazyQuery
>;
export type FetchUserHistoryListQueryResult = Apollo.QueryResult<
  FetchUserHistoryListQuery,
  FetchUserHistoryListQueryVariables
>;
export const ConnectUserToBitbucketDocument = gql`
  mutation ConnectUserToBitbucket($input: IDInput!) {
    userConnectBitbucket(data: $input) {
      bitbucketId
    }
  }
`;
export type ConnectUserToBitbucketMutationFn = Apollo.MutationFunction<
  ConnectUserToBitbucketMutation,
  ConnectUserToBitbucketMutationVariables
>;

/**
 * __useConnectUserToBitbucketMutation__
 *
 * To run a mutation, you first call `useConnectUserToBitbucketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectUserToBitbucketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectUserToBitbucketMutation, { data, loading, error }] = useConnectUserToBitbucketMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConnectUserToBitbucketMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConnectUserToBitbucketMutation,
    ConnectUserToBitbucketMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConnectUserToBitbucketMutation,
    ConnectUserToBitbucketMutationVariables
  >(ConnectUserToBitbucketDocument, options);
}
export type ConnectUserToBitbucketMutationHookResult = ReturnType<
  typeof useConnectUserToBitbucketMutation
>;
export type ConnectUserToBitbucketMutationResult =
  Apollo.MutationResult<ConnectUserToBitbucketMutation>;
export type ConnectUserToBitbucketMutationOptions = Apollo.BaseMutationOptions<
  ConnectUserToBitbucketMutation,
  ConnectUserToBitbucketMutationVariables
>;
