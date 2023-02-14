/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchProjectQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectQuery = {
  __typename?: 'Query';
  project: {
    __typename?: 'ProjectType';
    id: number;
    name: string;
    hoursEstimated?: number | null;
    startDate: string;
    endDate?: string | null;
    design?: string | null;
    roadmap?: string | null;
    notes?: string | null;
    phase: Types.ProjectPhaseChoice;
    clientTeam?: Array<{
      __typename?: 'ClientType';
      fullName: string;
      email: string;
      phone?: string | null;
      position?: string | null;
      notes?: string | null;
      pointContact?: boolean | null;
    }> | null;
  };
};

export type CreateOrUpdateProjectMutationVariables = Types.Exact<{
  input: Types.ProjectCreateInput;
}>;

export type CreateOrUpdateProjectMutation = {
  __typename?: 'Mutation';
  projectCreateUpdate: {
    __typename?: 'ProjectType';
    id: number;
    name: string;
    hoursEstimated?: number | null;
    startDate: string;
    endDate?: string | null;
    design?: string | null;
    roadmap?: string | null;
    notes?: string | null;
    phase: Types.ProjectPhaseChoice;
    status?: Types.StatusEnum | null;
    clientTeam?: Array<{
      __typename?: 'ClientType';
      fullName: string;
      email: string;
      phone?: string | null;
      position?: string | null;
      notes?: string | null;
      pointContact?: boolean | null;
    }> | null;
  };
};

export type FetchDocumentTemplateListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchDocumentTemplateListQuery = {
  __typename?: 'Query';
  documentTemplateList: Array<{
    __typename?: 'DocumentTemplateType';
    id: number;
    name: string;
    fields?: Array<{
      __typename?: 'DocumentTemplateFieldType';
      name: string;
      description?: string | null;
    }> | null;
  }>;
};

export type DocumentGenerateMutationVariables = Types.Exact<{
  input: Types.DocumentGenerateInput;
}>;

export type DocumentGenerateMutation = {
  __typename?: 'Mutation';
  documentGenerate: { __typename?: 'DocumentType'; createdAt: string };
};

export const FetchProjectDocument = gql`
  query FetchProject($data: IDInput!) {
    project(data: $data) {
      id
      name
      hoursEstimated
      startDate
      endDate
      design
      roadmap
      notes
      phase
      clientTeam {
        fullName
        email
        phone
        position
        notes
        pointContact
      }
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
export const CreateOrUpdateProjectDocument = gql`
  mutation CreateOrUpdateProject($input: ProjectCreateInput!) {
    projectCreateUpdate(data: $input) {
      id
      name
      hoursEstimated
      startDate
      endDate
      design
      roadmap
      notes
      phase
      status
      clientTeam {
        fullName
        email
        phone
        position
        notes
        pointContact
      }
    }
  }
`;
export type CreateOrUpdateProjectMutationFn = Apollo.MutationFunction<
  CreateOrUpdateProjectMutation,
  CreateOrUpdateProjectMutationVariables
>;

/**
 * __useCreateOrUpdateProjectMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateProjectMutation, { data, loading, error }] = useCreateOrUpdateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrUpdateProjectMutation,
    CreateOrUpdateProjectMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateOrUpdateProjectMutation, CreateOrUpdateProjectMutationVariables>(
    CreateOrUpdateProjectDocument,
    options,
  );
}
export type CreateOrUpdateProjectMutationHookResult = ReturnType<
  typeof useCreateOrUpdateProjectMutation
>;
export type CreateOrUpdateProjectMutationResult =
  Apollo.MutationResult<CreateOrUpdateProjectMutation>;
export type CreateOrUpdateProjectMutationOptions = Apollo.BaseMutationOptions<
  CreateOrUpdateProjectMutation,
  CreateOrUpdateProjectMutationVariables
>;
export const FetchDocumentTemplateListDocument = gql`
  query FetchDocumentTemplateList {
    documentTemplateList {
      id
      name
      fields {
        name
        description
      }
    }
  }
`;

/**
 * __useFetchDocumentTemplateListQuery__
 *
 * To run a query within a React component, call `useFetchDocumentTemplateListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchDocumentTemplateListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchDocumentTemplateListQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchDocumentTemplateListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchDocumentTemplateListQuery,
    FetchDocumentTemplateListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchDocumentTemplateListQuery, FetchDocumentTemplateListQueryVariables>(
    FetchDocumentTemplateListDocument,
    options,
  );
}
export function useFetchDocumentTemplateListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchDocumentTemplateListQuery,
    FetchDocumentTemplateListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchDocumentTemplateListQuery,
    FetchDocumentTemplateListQueryVariables
  >(FetchDocumentTemplateListDocument, options);
}
export type FetchDocumentTemplateListQueryHookResult = ReturnType<
  typeof useFetchDocumentTemplateListQuery
>;
export type FetchDocumentTemplateListLazyQueryHookResult = ReturnType<
  typeof useFetchDocumentTemplateListLazyQuery
>;
export type FetchDocumentTemplateListQueryResult = Apollo.QueryResult<
  FetchDocumentTemplateListQuery,
  FetchDocumentTemplateListQueryVariables
>;
export const DocumentGenerateDocument = gql`
  mutation DocumentGenerate($input: DocumentGenerateInput!) {
    documentGenerate(data: $input) {
      createdAt
    }
  }
`;
export type DocumentGenerateMutationFn = Apollo.MutationFunction<
  DocumentGenerateMutation,
  DocumentGenerateMutationVariables
>;

/**
 * __useDocumentGenerateMutation__
 *
 * To run a mutation, you first call `useDocumentGenerateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDocumentGenerateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [documentGenerateMutation, { data, loading, error }] = useDocumentGenerateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDocumentGenerateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DocumentGenerateMutation,
    DocumentGenerateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DocumentGenerateMutation, DocumentGenerateMutationVariables>(
    DocumentGenerateDocument,
    options,
  );
}
export type DocumentGenerateMutationHookResult = ReturnType<typeof useDocumentGenerateMutation>;
export type DocumentGenerateMutationResult = Apollo.MutationResult<DocumentGenerateMutation>;
export type DocumentGenerateMutationOptions = Apollo.BaseMutationOptions<
  DocumentGenerateMutation,
  DocumentGenerateMutationVariables
>;
