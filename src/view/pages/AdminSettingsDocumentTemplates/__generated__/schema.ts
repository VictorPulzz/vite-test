/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchDocumentTemplatesListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchDocumentTemplatesListQuery = {
  documentTemplateList: Array<{ id: number; name: string; url?: string | null }>;
};

export type CreateDocumentTemplateMutationVariables = Types.Exact<{
  input: Types.DocumentTemplateInput;
}>;

export type CreateDocumentTemplateMutation = { documentTemplateCreate: { id: number } };

export type RemoveDocumentTemplateMutationVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type RemoveDocumentTemplateMutation = { documentTemplateDelete: { message: string } };

export const FetchDocumentTemplatesListDocument = gql`
  query FetchDocumentTemplatesList {
    documentTemplateList {
      id
      name
      url
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
export const CreateDocumentTemplateDocument = gql`
  mutation CreateDocumentTemplate($input: DocumentTemplateInput!) {
    documentTemplateCreate(data: $input) {
      id
    }
  }
`;
export type CreateDocumentTemplateMutationFn = Apollo.MutationFunction<
  CreateDocumentTemplateMutation,
  CreateDocumentTemplateMutationVariables
>;

/**
 * __useCreateDocumentTemplateMutation__
 *
 * To run a mutation, you first call `useCreateDocumentTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDocumentTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDocumentTemplateMutation, { data, loading, error }] = useCreateDocumentTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDocumentTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDocumentTemplateMutation,
    CreateDocumentTemplateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDocumentTemplateMutation,
    CreateDocumentTemplateMutationVariables
  >(CreateDocumentTemplateDocument, options);
}
export type CreateDocumentTemplateMutationHookResult = ReturnType<
  typeof useCreateDocumentTemplateMutation
>;
export type CreateDocumentTemplateMutationResult =
  Apollo.MutationResult<CreateDocumentTemplateMutation>;
export type CreateDocumentTemplateMutationOptions = Apollo.BaseMutationOptions<
  CreateDocumentTemplateMutation,
  CreateDocumentTemplateMutationVariables
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
