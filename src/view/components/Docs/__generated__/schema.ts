/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchInternalDocumentsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.DocumentFilter>;
  pagination?: Types.InputMaybe<Types.PaginationInput>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Array<Types.DocumentSortFieldInput> | Types.DocumentSortFieldInput>;
}>;

export type FetchInternalDocumentsQuery = {
  documentInternalList: {
    count: number;
    results: Array<{
      id: number;
      name: string;
      createdAt: string;
      project?: { name: string } | null;
      file: { url: string };
      addedBy?: { fullName: string } | null;
    }>;
  };
};

export type FetchClientDocumentsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.DocumentFilter>;
  pagination?: Types.InputMaybe<Types.PaginationInput>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Array<Types.DocumentSortFieldInput> | Types.DocumentSortFieldInput>;
}>;

export type FetchClientDocumentsQuery = {
  documentClientList: {
    count: number;
    results: Array<{
      id: number;
      name: string;
      createdAt: string;
      project?: { name: string } | null;
      file: { url: string };
      addedBy?: { fullName: string } | null;
    }>;
  };
};

export type FetchProjectDocumentsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.DocumentFilter>;
  pagination?: Types.InputMaybe<Types.PaginationInput>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Array<Types.DocumentSortFieldInput> | Types.DocumentSortFieldInput>;
}>;

export type FetchProjectDocumentsQuery = {
  projectDocumentList: {
    count: number;
    results: Array<{
      id: number;
      name: string;
      createdAt: string;
      project?: { name: string } | null;
      file: { url: string };
      addedBy?: { fullName: string } | null;
    }>;
  };
};

export type FetchUserDocumentsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.DocumentFilter>;
  pagination?: Types.InputMaybe<Types.PaginationInput>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Array<Types.DocumentSortFieldInput> | Types.DocumentSortFieldInput>;
}>;

export type FetchUserDocumentsQuery = {
  documentUserList: {
    count: number;
    results: Array<{
      id: number;
      name: string;
      createdAt: string;
      project?: { name: string } | null;
      file: { url: string };
      addedBy?: { fullName: string } | null;
    }>;
  };
};

export type UploadInternalDocumentMutationVariables = Types.Exact<{
  input: Types.DocumentInput;
}>;

export type UploadInternalDocumentMutation = { documentInternalCreateUpdate: { id: number } };

export type GenerateInternalDocumentMutationVariables = Types.Exact<{
  input: Array<Types.DocumentGenerateInput> | Types.DocumentGenerateInput;
}>;

export type GenerateInternalDocumentMutation = {
  documentInternalGenerate: Array<{ createdAt: string }>;
};

export type UploadProjectDocumentMutationVariables = Types.Exact<{
  input: Types.DocumentInput;
}>;

export type UploadProjectDocumentMutation = { documentProjectCreateUpdate: { id: number } };

export type GenerateProjectDocumentMutationVariables = Types.Exact<{
  input: Array<Types.DocumentGenerateInput> | Types.DocumentGenerateInput;
}>;

export type GenerateProjectDocumentMutation = {
  documentProjectGenerate: Array<{ createdAt: string }>;
};

export type UploadUserDocumentMutationVariables = Types.Exact<{
  input: Types.DocumentInput;
}>;

export type UploadUserDocumentMutation = { documentUserCreateUpdate: { id: number } };

export type GenerateUserDocumentMutationVariables = Types.Exact<{
  input: Array<Types.DocumentGenerateInput> | Types.DocumentGenerateInput;
}>;

export type GenerateUserDocumentMutation = { documentUserGenerate: Array<{ createdAt: string }> };

export type RemoveDocumentMutationVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type RemoveDocumentMutation = { documentDelete: { message: string } };

export const FetchInternalDocumentsDocument = gql`
  query FetchInternalDocuments(
    $filters: DocumentFilter
    $pagination: PaginationInput
    $search: String
    $sort: [DocumentSortFieldInput!]
  ) {
    documentInternalList(filters: $filters, pagination: $pagination, search: $search, sort: $sort) {
      results {
        id
        project {
          name
        }
        name
        file {
          url
        }
        createdAt
        addedBy {
          fullName
        }
      }
      count
    }
  }
`;

/**
 * __useFetchInternalDocumentsQuery__
 *
 * To run a query within a React component, call `useFetchInternalDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchInternalDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchInternalDocumentsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFetchInternalDocumentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchInternalDocumentsQuery,
    FetchInternalDocumentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchInternalDocumentsQuery, FetchInternalDocumentsQueryVariables>(
    FetchInternalDocumentsDocument,
    options,
  );
}
export function useFetchInternalDocumentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchInternalDocumentsQuery,
    FetchInternalDocumentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchInternalDocumentsQuery, FetchInternalDocumentsQueryVariables>(
    FetchInternalDocumentsDocument,
    options,
  );
}
export type FetchInternalDocumentsQueryHookResult = ReturnType<
  typeof useFetchInternalDocumentsQuery
>;
export type FetchInternalDocumentsLazyQueryHookResult = ReturnType<
  typeof useFetchInternalDocumentsLazyQuery
>;
export type FetchInternalDocumentsQueryResult = Apollo.QueryResult<
  FetchInternalDocumentsQuery,
  FetchInternalDocumentsQueryVariables
>;
export const FetchClientDocumentsDocument = gql`
  query FetchClientDocuments(
    $filters: DocumentFilter
    $pagination: PaginationInput
    $search: String
    $sort: [DocumentSortFieldInput!]
  ) {
    documentClientList(filters: $filters, pagination: $pagination, search: $search, sort: $sort) {
      results {
        id
        project {
          name
        }
        name
        file {
          url
        }
        createdAt
        addedBy {
          fullName
        }
      }
      count
    }
  }
`;

/**
 * __useFetchClientDocumentsQuery__
 *
 * To run a query within a React component, call `useFetchClientDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchClientDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchClientDocumentsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFetchClientDocumentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchClientDocumentsQuery,
    FetchClientDocumentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchClientDocumentsQuery, FetchClientDocumentsQueryVariables>(
    FetchClientDocumentsDocument,
    options,
  );
}
export function useFetchClientDocumentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchClientDocumentsQuery,
    FetchClientDocumentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchClientDocumentsQuery, FetchClientDocumentsQueryVariables>(
    FetchClientDocumentsDocument,
    options,
  );
}
export type FetchClientDocumentsQueryHookResult = ReturnType<typeof useFetchClientDocumentsQuery>;
export type FetchClientDocumentsLazyQueryHookResult = ReturnType<
  typeof useFetchClientDocumentsLazyQuery
>;
export type FetchClientDocumentsQueryResult = Apollo.QueryResult<
  FetchClientDocumentsQuery,
  FetchClientDocumentsQueryVariables
>;
export const FetchProjectDocumentsDocument = gql`
  query FetchProjectDocuments(
    $filters: DocumentFilter
    $pagination: PaginationInput
    $search: String
    $sort: [DocumentSortFieldInput!]
  ) {
    projectDocumentList(filters: $filters, pagination: $pagination, search: $search, sort: $sort) {
      results {
        id
        project {
          name
        }
        name
        file {
          url
        }
        createdAt
        addedBy {
          fullName
        }
      }
      count
    }
  }
`;

/**
 * __useFetchProjectDocumentsQuery__
 *
 * To run a query within a React component, call `useFetchProjectDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectDocumentsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFetchProjectDocumentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchProjectDocumentsQuery,
    FetchProjectDocumentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchProjectDocumentsQuery, FetchProjectDocumentsQueryVariables>(
    FetchProjectDocumentsDocument,
    options,
  );
}
export function useFetchProjectDocumentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchProjectDocumentsQuery,
    FetchProjectDocumentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchProjectDocumentsQuery, FetchProjectDocumentsQueryVariables>(
    FetchProjectDocumentsDocument,
    options,
  );
}
export type FetchProjectDocumentsQueryHookResult = ReturnType<typeof useFetchProjectDocumentsQuery>;
export type FetchProjectDocumentsLazyQueryHookResult = ReturnType<
  typeof useFetchProjectDocumentsLazyQuery
>;
export type FetchProjectDocumentsQueryResult = Apollo.QueryResult<
  FetchProjectDocumentsQuery,
  FetchProjectDocumentsQueryVariables
>;
export const FetchUserDocumentsDocument = gql`
  query FetchUserDocuments(
    $filters: DocumentFilter
    $pagination: PaginationInput
    $search: String
    $sort: [DocumentSortFieldInput!]
  ) {
    documentUserList(filters: $filters, pagination: $pagination, search: $search, sort: $sort) {
      results {
        id
        project {
          name
        }
        name
        file {
          url
        }
        createdAt
        addedBy {
          fullName
        }
      }
      count
    }
  }
`;

/**
 * __useFetchUserDocumentsQuery__
 *
 * To run a query within a React component, call `useFetchUserDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserDocumentsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFetchUserDocumentsQuery(
  baseOptions?: Apollo.QueryHookOptions<FetchUserDocumentsQuery, FetchUserDocumentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchUserDocumentsQuery, FetchUserDocumentsQueryVariables>(
    FetchUserDocumentsDocument,
    options,
  );
}
export function useFetchUserDocumentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchUserDocumentsQuery,
    FetchUserDocumentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchUserDocumentsQuery, FetchUserDocumentsQueryVariables>(
    FetchUserDocumentsDocument,
    options,
  );
}
export type FetchUserDocumentsQueryHookResult = ReturnType<typeof useFetchUserDocumentsQuery>;
export type FetchUserDocumentsLazyQueryHookResult = ReturnType<
  typeof useFetchUserDocumentsLazyQuery
>;
export type FetchUserDocumentsQueryResult = Apollo.QueryResult<
  FetchUserDocumentsQuery,
  FetchUserDocumentsQueryVariables
>;
export const UploadInternalDocumentDocument = gql`
  mutation UploadInternalDocument($input: DocumentInput!) {
    documentInternalCreateUpdate(data: $input) {
      id
    }
  }
`;
export type UploadInternalDocumentMutationFn = Apollo.MutationFunction<
  UploadInternalDocumentMutation,
  UploadInternalDocumentMutationVariables
>;

/**
 * __useUploadInternalDocumentMutation__
 *
 * To run a mutation, you first call `useUploadInternalDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadInternalDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadInternalDocumentMutation, { data, loading, error }] = useUploadInternalDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadInternalDocumentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadInternalDocumentMutation,
    UploadInternalDocumentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UploadInternalDocumentMutation,
    UploadInternalDocumentMutationVariables
  >(UploadInternalDocumentDocument, options);
}
export type UploadInternalDocumentMutationHookResult = ReturnType<
  typeof useUploadInternalDocumentMutation
>;
export type UploadInternalDocumentMutationResult =
  Apollo.MutationResult<UploadInternalDocumentMutation>;
export type UploadInternalDocumentMutationOptions = Apollo.BaseMutationOptions<
  UploadInternalDocumentMutation,
  UploadInternalDocumentMutationVariables
>;
export const GenerateInternalDocumentDocument = gql`
  mutation GenerateInternalDocument($input: [DocumentGenerateInput!]!) {
    documentInternalGenerate(data: $input) {
      createdAt
    }
  }
`;
export type GenerateInternalDocumentMutationFn = Apollo.MutationFunction<
  GenerateInternalDocumentMutation,
  GenerateInternalDocumentMutationVariables
>;

/**
 * __useGenerateInternalDocumentMutation__
 *
 * To run a mutation, you first call `useGenerateInternalDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateInternalDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateInternalDocumentMutation, { data, loading, error }] = useGenerateInternalDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateInternalDocumentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GenerateInternalDocumentMutation,
    GenerateInternalDocumentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    GenerateInternalDocumentMutation,
    GenerateInternalDocumentMutationVariables
  >(GenerateInternalDocumentDocument, options);
}
export type GenerateInternalDocumentMutationHookResult = ReturnType<
  typeof useGenerateInternalDocumentMutation
>;
export type GenerateInternalDocumentMutationResult =
  Apollo.MutationResult<GenerateInternalDocumentMutation>;
export type GenerateInternalDocumentMutationOptions = Apollo.BaseMutationOptions<
  GenerateInternalDocumentMutation,
  GenerateInternalDocumentMutationVariables
>;
export const UploadProjectDocumentDocument = gql`
  mutation UploadProjectDocument($input: DocumentInput!) {
    documentProjectCreateUpdate(data: $input) {
      id
    }
  }
`;
export type UploadProjectDocumentMutationFn = Apollo.MutationFunction<
  UploadProjectDocumentMutation,
  UploadProjectDocumentMutationVariables
>;

/**
 * __useUploadProjectDocumentMutation__
 *
 * To run a mutation, you first call `useUploadProjectDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProjectDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProjectDocumentMutation, { data, loading, error }] = useUploadProjectDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadProjectDocumentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadProjectDocumentMutation,
    UploadProjectDocumentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UploadProjectDocumentMutation, UploadProjectDocumentMutationVariables>(
    UploadProjectDocumentDocument,
    options,
  );
}
export type UploadProjectDocumentMutationHookResult = ReturnType<
  typeof useUploadProjectDocumentMutation
>;
export type UploadProjectDocumentMutationResult =
  Apollo.MutationResult<UploadProjectDocumentMutation>;
export type UploadProjectDocumentMutationOptions = Apollo.BaseMutationOptions<
  UploadProjectDocumentMutation,
  UploadProjectDocumentMutationVariables
>;
export const GenerateProjectDocumentDocument = gql`
  mutation GenerateProjectDocument($input: [DocumentGenerateInput!]!) {
    documentProjectGenerate(data: $input) {
      createdAt
    }
  }
`;
export type GenerateProjectDocumentMutationFn = Apollo.MutationFunction<
  GenerateProjectDocumentMutation,
  GenerateProjectDocumentMutationVariables
>;

/**
 * __useGenerateProjectDocumentMutation__
 *
 * To run a mutation, you first call `useGenerateProjectDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateProjectDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateProjectDocumentMutation, { data, loading, error }] = useGenerateProjectDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateProjectDocumentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GenerateProjectDocumentMutation,
    GenerateProjectDocumentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    GenerateProjectDocumentMutation,
    GenerateProjectDocumentMutationVariables
  >(GenerateProjectDocumentDocument, options);
}
export type GenerateProjectDocumentMutationHookResult = ReturnType<
  typeof useGenerateProjectDocumentMutation
>;
export type GenerateProjectDocumentMutationResult =
  Apollo.MutationResult<GenerateProjectDocumentMutation>;
export type GenerateProjectDocumentMutationOptions = Apollo.BaseMutationOptions<
  GenerateProjectDocumentMutation,
  GenerateProjectDocumentMutationVariables
>;
export const UploadUserDocumentDocument = gql`
  mutation UploadUserDocument($input: DocumentInput!) {
    documentUserCreateUpdate(data: $input) {
      id
    }
  }
`;
export type UploadUserDocumentMutationFn = Apollo.MutationFunction<
  UploadUserDocumentMutation,
  UploadUserDocumentMutationVariables
>;

/**
 * __useUploadUserDocumentMutation__
 *
 * To run a mutation, you first call `useUploadUserDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadUserDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadUserDocumentMutation, { data, loading, error }] = useUploadUserDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadUserDocumentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadUserDocumentMutation,
    UploadUserDocumentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UploadUserDocumentMutation, UploadUserDocumentMutationVariables>(
    UploadUserDocumentDocument,
    options,
  );
}
export type UploadUserDocumentMutationHookResult = ReturnType<typeof useUploadUserDocumentMutation>;
export type UploadUserDocumentMutationResult = Apollo.MutationResult<UploadUserDocumentMutation>;
export type UploadUserDocumentMutationOptions = Apollo.BaseMutationOptions<
  UploadUserDocumentMutation,
  UploadUserDocumentMutationVariables
>;
export const GenerateUserDocumentDocument = gql`
  mutation GenerateUserDocument($input: [DocumentGenerateInput!]!) {
    documentUserGenerate(data: $input) {
      createdAt
    }
  }
`;
export type GenerateUserDocumentMutationFn = Apollo.MutationFunction<
  GenerateUserDocumentMutation,
  GenerateUserDocumentMutationVariables
>;

/**
 * __useGenerateUserDocumentMutation__
 *
 * To run a mutation, you first call `useGenerateUserDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateUserDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateUserDocumentMutation, { data, loading, error }] = useGenerateUserDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateUserDocumentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GenerateUserDocumentMutation,
    GenerateUserDocumentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GenerateUserDocumentMutation, GenerateUserDocumentMutationVariables>(
    GenerateUserDocumentDocument,
    options,
  );
}
export type GenerateUserDocumentMutationHookResult = ReturnType<
  typeof useGenerateUserDocumentMutation
>;
export type GenerateUserDocumentMutationResult =
  Apollo.MutationResult<GenerateUserDocumentMutation>;
export type GenerateUserDocumentMutationOptions = Apollo.BaseMutationOptions<
  GenerateUserDocumentMutation,
  GenerateUserDocumentMutationVariables
>;
export const RemoveDocumentDocument = gql`
  mutation RemoveDocument($input: IDInput!) {
    documentDelete(data: $input) {
      message
    }
  }
`;
export type RemoveDocumentMutationFn = Apollo.MutationFunction<
  RemoveDocumentMutation,
  RemoveDocumentMutationVariables
>;

/**
 * __useRemoveDocumentMutation__
 *
 * To run a mutation, you first call `useRemoveDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDocumentMutation, { data, loading, error }] = useRemoveDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveDocumentMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveDocumentMutation, RemoveDocumentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveDocumentMutation, RemoveDocumentMutationVariables>(
    RemoveDocumentDocument,
    options,
  );
}
export type RemoveDocumentMutationHookResult = ReturnType<typeof useRemoveDocumentMutation>;
export type RemoveDocumentMutationResult = Apollo.MutationResult<RemoveDocumentMutation>;
export type RemoveDocumentMutationOptions = Apollo.BaseMutationOptions<
  RemoveDocumentMutation,
  RemoveDocumentMutationVariables
>;
