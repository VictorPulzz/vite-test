/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchRolesListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchRolesListQuery = { rolesList: Array<{ value: number; label: string }> };

export type FetchTechnologiesListQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.PaginationInput>;
}>;

export type FetchTechnologiesListQuery = {
  technologyList: { results: Array<{ value: number; label: string }> };
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
export const FetchTechnologiesListDocument = gql`
  query FetchTechnologiesList($pagination: PaginationInput) {
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
  baseOptions?: Apollo.QueryHookOptions<
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
