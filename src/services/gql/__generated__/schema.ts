/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RefreshTokensMutationVariables = Types.Exact<{
  input: Types.RefreshTokenInput;
}>;

export type RefreshTokensMutation = { tokens: { access: string; refresh: string } };

export type FetchUserGlossaryListQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.PaginationInput>;
  filters?: Types.InputMaybe<Types.UserFilter>;
}>;

export type FetchUserGlossaryListQuery = {
  userGlossaryList: {
    results: Array<{ id: number; fullName: string; photoThumbnail?: { url: string } | null }>;
  };
};

export type FetchProjectGlossaryListQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ProjectFilter>;
  pagination?: Types.InputMaybe<Types.PaginationInput>;
}>;

export type FetchProjectGlossaryListQuery = {
  projectGlossaryList: { results: Array<{ id: number; name: string }> };
};

export type FetchRepositoryGlossaryListQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.RepositoryFilter>;
  pagination?: Types.InputMaybe<Types.PaginationInput>;
}>;

export type FetchRepositoryGlossaryListQuery = {
  repositoryGlossaryList: { results: Array<{ id: number; name: string }> };
};

export const RefreshTokensDocument = gql`
  mutation RefreshTokens($input: RefreshTokenInput!) {
    tokens: tokenRefresh(data: $input) {
      access: accessToken
      refresh: refreshToken
    }
  }
`;
export type RefreshTokensMutationFn = Apollo.MutationFunction<
  RefreshTokensMutation,
  RefreshTokensMutationVariables
>;

/**
 * __useRefreshTokensMutation__
 *
 * To run a mutation, you first call `useRefreshTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokensMutation, { data, loading, error }] = useRefreshTokensMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRefreshTokensMutation(
  baseOptions?: Apollo.MutationHookOptions<RefreshTokensMutation, RefreshTokensMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RefreshTokensMutation, RefreshTokensMutationVariables>(
    RefreshTokensDocument,
    options,
  );
}
export type RefreshTokensMutationHookResult = ReturnType<typeof useRefreshTokensMutation>;
export type RefreshTokensMutationResult = Apollo.MutationResult<RefreshTokensMutation>;
export type RefreshTokensMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokensMutation,
  RefreshTokensMutationVariables
>;
export const FetchUserGlossaryListDocument = gql`
  query FetchUserGlossaryList($pagination: PaginationInput, $filters: UserFilter) {
    userGlossaryList(pagination: $pagination, filters: $filters) {
      results {
        id
        fullName
        photoThumbnail {
          url
        }
      }
    }
  }
`;

/**
 * __useFetchUserGlossaryListQuery__
 *
 * To run a query within a React component, call `useFetchUserGlossaryListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserGlossaryListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserGlossaryListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useFetchUserGlossaryListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchUserGlossaryListQuery,
    FetchUserGlossaryListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchUserGlossaryListQuery, FetchUserGlossaryListQueryVariables>(
    FetchUserGlossaryListDocument,
    options,
  );
}
export function useFetchUserGlossaryListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchUserGlossaryListQuery,
    FetchUserGlossaryListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchUserGlossaryListQuery, FetchUserGlossaryListQueryVariables>(
    FetchUserGlossaryListDocument,
    options,
  );
}
export type FetchUserGlossaryListQueryHookResult = ReturnType<typeof useFetchUserGlossaryListQuery>;
export type FetchUserGlossaryListLazyQueryHookResult = ReturnType<
  typeof useFetchUserGlossaryListLazyQuery
>;
export type FetchUserGlossaryListQueryResult = Apollo.QueryResult<
  FetchUserGlossaryListQuery,
  FetchUserGlossaryListQueryVariables
>;
export const FetchProjectGlossaryListDocument = gql`
  query FetchProjectGlossaryList($filters: ProjectFilter, $pagination: PaginationInput) {
    projectGlossaryList(filters: $filters, pagination: $pagination) {
      results {
        id
        name
      }
    }
  }
`;

/**
 * __useFetchProjectGlossaryListQuery__
 *
 * To run a query within a React component, call `useFetchProjectGlossaryListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectGlossaryListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectGlossaryListQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFetchProjectGlossaryListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchProjectGlossaryListQuery,
    FetchProjectGlossaryListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchProjectGlossaryListQuery, FetchProjectGlossaryListQueryVariables>(
    FetchProjectGlossaryListDocument,
    options,
  );
}
export function useFetchProjectGlossaryListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchProjectGlossaryListQuery,
    FetchProjectGlossaryListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchProjectGlossaryListQuery, FetchProjectGlossaryListQueryVariables>(
    FetchProjectGlossaryListDocument,
    options,
  );
}
export type FetchProjectGlossaryListQueryHookResult = ReturnType<
  typeof useFetchProjectGlossaryListQuery
>;
export type FetchProjectGlossaryListLazyQueryHookResult = ReturnType<
  typeof useFetchProjectGlossaryListLazyQuery
>;
export type FetchProjectGlossaryListQueryResult = Apollo.QueryResult<
  FetchProjectGlossaryListQuery,
  FetchProjectGlossaryListQueryVariables
>;
export const FetchRepositoryGlossaryListDocument = gql`
  query FetchRepositoryGlossaryList($filters: RepositoryFilter, $pagination: PaginationInput) {
    repositoryGlossaryList(filters: $filters, pagination: $pagination) {
      results {
        id
        name
      }
    }
  }
`;

/**
 * __useFetchRepositoryGlossaryListQuery__
 *
 * To run a query within a React component, call `useFetchRepositoryGlossaryListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchRepositoryGlossaryListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchRepositoryGlossaryListQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFetchRepositoryGlossaryListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchRepositoryGlossaryListQuery,
    FetchRepositoryGlossaryListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FetchRepositoryGlossaryListQuery,
    FetchRepositoryGlossaryListQueryVariables
  >(FetchRepositoryGlossaryListDocument, options);
}
export function useFetchRepositoryGlossaryListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchRepositoryGlossaryListQuery,
    FetchRepositoryGlossaryListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchRepositoryGlossaryListQuery,
    FetchRepositoryGlossaryListQueryVariables
  >(FetchRepositoryGlossaryListDocument, options);
}
export type FetchRepositoryGlossaryListQueryHookResult = ReturnType<
  typeof useFetchRepositoryGlossaryListQuery
>;
export type FetchRepositoryGlossaryListLazyQueryHookResult = ReturnType<
  typeof useFetchRepositoryGlossaryListLazyQuery
>;
export type FetchRepositoryGlossaryListQueryResult = Apollo.QueryResult<
  FetchRepositoryGlossaryListQuery,
  FetchRepositoryGlossaryListQueryVariables
>;
