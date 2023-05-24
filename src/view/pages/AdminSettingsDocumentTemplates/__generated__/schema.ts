/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchDocumentTemplatesListQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.PaginationInput>;
  sort?: Types.InputMaybe<
    Array<Types.DocumentTemplateSortFieldInput> | Types.DocumentTemplateSortFieldInput
  >;
}>;

export type FetchDocumentTemplatesListQuery = {
  documentTemplateList: {
    count: number;
    results: Array<{ id: number; name: string; description?: string | null; url?: string | null }>;
  };
};

export type FetchDocumentTemplateInfoQueryVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type FetchDocumentTemplateInfoQuery = {
  documentTemplate: {
    id: number;
    name: string;
    description?: string | null;
    url?: string | null;
    fields?: Array<{ name: string; description?: string | null }> | null;
  };
};

export type CreateOrUpdateDocumentTemplateMutationVariables = Types.Exact<{
  input: Types.DocumentTemplateInput;
}>;

export type CreateOrUpdateDocumentTemplateMutation = {
  documentTemplateCreateUpdate: { id: number };
};

export type RemoveDocumentTemplateMutationVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type RemoveDocumentTemplateMutation = { documentTemplateDelete: { message: string } };

export const FetchDocumentTemplatesListDocument = gql`
  query FetchDocumentTemplatesList(
    $pagination: PaginationInput
    $sort: [DocumentTemplateSortFieldInput!]
  ) {
    documentTemplateList(pagination: $pagination, sort: $sort) {
      results {
        id
        name
        description
        url
      }
      count
    }
  }
`;

/**
 * __useFetchDocumentTemplatesListQuery__
 *
 * To run a query within a React component, call `useFetchDocumentTemplatesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchDocumentTemplatesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchDocumentTemplatesListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFetchDocumentTemplatesListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchDocumentTemplatesListQuery,
    FetchDocumentTemplatesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchDocumentTemplatesListQuery, FetchDocumentTemplatesListQueryVariables>(
    FetchDocumentTemplatesListDocument,
    options,
  );
}
export function useFetchDocumentTemplatesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchDocumentTemplatesListQuery,
    FetchDocumentTemplatesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchDocumentTemplatesListQuery,
    FetchDocumentTemplatesListQueryVariables
  >(FetchDocumentTemplatesListDocument, options);
}
export type FetchDocumentTemplatesListQueryHookResult = ReturnType<
  typeof useFetchDocumentTemplatesListQuery
>;
export type FetchDocumentTemplatesListLazyQueryHookResult = ReturnType<
  typeof useFetchDocumentTemplatesListLazyQuery
>;
export type FetchDocumentTemplatesListQueryResult = Apollo.QueryResult<
  FetchDocumentTemplatesListQuery,
  FetchDocumentTemplatesListQueryVariables
>;
export const FetchDocumentTemplateInfoDocument = gql`
  query FetchDocumentTemplateInfo($input: IDInput!) {
    documentTemplate(data: $input) {
      id
      name
      description
      url
      fields {
        name
        description
      }
    }
  }
`;

/**
 * __useFetchDocumentTemplateInfoQuery__
 *
 * To run a query within a React component, call `useFetchDocumentTemplateInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchDocumentTemplateInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchDocumentTemplateInfoQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchDocumentTemplateInfoQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchDocumentTemplateInfoQuery,
    FetchDocumentTemplateInfoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchDocumentTemplateInfoQuery, FetchDocumentTemplateInfoQueryVariables>(
    FetchDocumentTemplateInfoDocument,
    options,
  );
}
export function useFetchDocumentTemplateInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchDocumentTemplateInfoQuery,
    FetchDocumentTemplateInfoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchDocumentTemplateInfoQuery,
    FetchDocumentTemplateInfoQueryVariables
  >(FetchDocumentTemplateInfoDocument, options);
}
export type FetchDocumentTemplateInfoQueryHookResult = ReturnType<
  typeof useFetchDocumentTemplateInfoQuery
>;
export type FetchDocumentTemplateInfoLazyQueryHookResult = ReturnType<
  typeof useFetchDocumentTemplateInfoLazyQuery
>;
export type FetchDocumentTemplateInfoQueryResult = Apollo.QueryResult<
  FetchDocumentTemplateInfoQuery,
  FetchDocumentTemplateInfoQueryVariables
>;
export const CreateOrUpdateDocumentTemplateDocument = gql`
  mutation CreateOrUpdateDocumentTemplate($input: DocumentTemplateInput!) {
    documentTemplateCreateUpdate(data: $input) {
      id
    }
  }
`;
export type CreateOrUpdateDocumentTemplateMutationFn = Apollo.MutationFunction<
  CreateOrUpdateDocumentTemplateMutation,
  CreateOrUpdateDocumentTemplateMutationVariables
>;

/**
 * __useCreateOrUpdateDocumentTemplateMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateDocumentTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateDocumentTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateDocumentTemplateMutation, { data, loading, error }] = useCreateOrUpdateDocumentTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateDocumentTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrUpdateDocumentTemplateMutation,
    CreateOrUpdateDocumentTemplateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateOrUpdateDocumentTemplateMutation,
    CreateOrUpdateDocumentTemplateMutationVariables
  >(CreateOrUpdateDocumentTemplateDocument, options);
}
export type CreateOrUpdateDocumentTemplateMutationHookResult = ReturnType<
  typeof useCreateOrUpdateDocumentTemplateMutation
>;
export type CreateOrUpdateDocumentTemplateMutationResult =
  Apollo.MutationResult<CreateOrUpdateDocumentTemplateMutation>;
export type CreateOrUpdateDocumentTemplateMutationOptions = Apollo.BaseMutationOptions<
  CreateOrUpdateDocumentTemplateMutation,
  CreateOrUpdateDocumentTemplateMutationVariables
>;
export const RemoveDocumentTemplateDocument = gql`
  mutation RemoveDocumentTemplate($input: IDInput!) {
    documentTemplateDelete(data: $input) {
      message
    }
  }
`;
export type RemoveDocumentTemplateMutationFn = Apollo.MutationFunction<
  RemoveDocumentTemplateMutation,
  RemoveDocumentTemplateMutationVariables
>;

/**
 * __useRemoveDocumentTemplateMutation__
 *
 * To run a mutation, you first call `useRemoveDocumentTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDocumentTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDocumentTemplateMutation, { data, loading, error }] = useRemoveDocumentTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveDocumentTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveDocumentTemplateMutation,
    RemoveDocumentTemplateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveDocumentTemplateMutation,
    RemoveDocumentTemplateMutationVariables
  >(RemoveDocumentTemplateDocument, options);
}
export type RemoveDocumentTemplateMutationHookResult = ReturnType<
  typeof useRemoveDocumentTemplateMutation
>;
export type RemoveDocumentTemplateMutationResult =
  Apollo.MutationResult<RemoveDocumentTemplateMutation>;
export type RemoveDocumentTemplateMutationOptions = Apollo.BaseMutationOptions<
  RemoveDocumentTemplateMutation,
  RemoveDocumentTemplateMutationVariables
>;
