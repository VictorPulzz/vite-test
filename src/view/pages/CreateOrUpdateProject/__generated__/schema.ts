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
    startDate?: string | null;
    endDate?: string | null;
    design?: string | null;
    roadmap?: string | null;
    notes?: string | null;
    phase?: Types.ProjectPhaseChoice | null;
    status?: { __typename?: 'ProjectStatusType'; id?: number | null; name: string } | null;
    clientTeam?: Array<{
      __typename?: 'ClientType';
      fullName: string;
      email: string;
      phone?: string | null;
      position?: string | null;
      notes?: string | null;
      pointContact?: boolean | null;
    }> | null;
    platforms?: Array<{ __typename?: 'PlatformType'; id?: number | null; name: string }> | null;
  };
};

export type CreateProjectMutationVariables = Types.Exact<{
  input: Types.ProjectCreateInput;
}>;

export type CreateProjectMutation = {
  __typename?: 'Mutation';
  projectCreate: { __typename?: 'ProjectType'; id: number };
};

export type UpdateProjectMutationVariables = Types.Exact<{
  input: Types.ProjectUpdateInput;
}>;

export type UpdateProjectMutation = {
  __typename?: 'Mutation';
  projectUpdate: { __typename?: 'ProjectType'; id: number };
};

export type FetchPlatformsListQueryVariables = Types.Exact<{
  pagination: Types.PaginationInput;
}>;

export type FetchPlatformsListQuery = {
  __typename?: 'Query';
  platformList: {
    __typename?: 'PlatformTypePagination';
    results: Array<{ __typename?: 'PlatformType'; value?: number | null; label: string }>;
  };
};

export type FetchProjectStatusesListQueryVariables = Types.Exact<{
  pagination: Types.PaginationInput;
}>;

export type FetchProjectStatusesListQuery = {
  __typename?: 'Query';
  projectStatusesList: {
    __typename?: 'ProjectStatusTypePagination';
    results: Array<{ __typename?: 'ProjectStatusType'; value?: number | null; label: string }>;
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
  input: Array<Types.DocumentGenerateInput> | Types.DocumentGenerateInput;
}>;

export type DocumentGenerateMutation = {
  __typename?: 'Mutation';
  documentGenerate: Array<{ __typename?: 'DocumentType'; createdAt: string }>;
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
      status {
        id
        name
      }
      clientTeam {
        fullName
        email
        phone
        position
        notes
        pointContact
      }
      platforms {
        id
        name
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
export const CreateProjectDocument = gql`
  mutation CreateProject($input: ProjectCreateInput!) {
    projectCreate(data: $input) {
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
export const UpdateProjectDocument = gql`
  mutation UpdateProject($input: ProjectUpdateInput!) {
    projectUpdate(data: $input) {
      id
    }
  }
`;
export type UpdateProjectMutationFn = Apollo.MutationFunction<
  UpdateProjectMutation,
  UpdateProjectMutationVariables
>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(
    UpdateProjectDocument,
    options,
  );
}
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<
  UpdateProjectMutation,
  UpdateProjectMutationVariables
>;
export const FetchPlatformsListDocument = gql`
  query FetchPlatformsList($pagination: PaginationInput!) {
    platformList(pagination: $pagination) {
      results {
        value: id
        label: name
      }
    }
  }
`;

/**
 * __useFetchPlatformsListQuery__
 *
 * To run a query within a React component, call `useFetchPlatformsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPlatformsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPlatformsListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFetchPlatformsListQuery(
  baseOptions: Apollo.QueryHookOptions<FetchPlatformsListQuery, FetchPlatformsListQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchPlatformsListQuery, FetchPlatformsListQueryVariables>(
    FetchPlatformsListDocument,
    options,
  );
}
export function useFetchPlatformsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchPlatformsListQuery,
    FetchPlatformsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchPlatformsListQuery, FetchPlatformsListQueryVariables>(
    FetchPlatformsListDocument,
    options,
  );
}
export type FetchPlatformsListQueryHookResult = ReturnType<typeof useFetchPlatformsListQuery>;
export type FetchPlatformsListLazyQueryHookResult = ReturnType<
  typeof useFetchPlatformsListLazyQuery
>;
export type FetchPlatformsListQueryResult = Apollo.QueryResult<
  FetchPlatformsListQuery,
  FetchPlatformsListQueryVariables
>;
export const FetchProjectStatusesListDocument = gql`
  query FetchProjectStatusesList($pagination: PaginationInput!) {
    projectStatusesList(pagination: $pagination) {
      results {
        value: id
        label: name
      }
    }
  }
`;

/**
 * __useFetchProjectStatusesListQuery__
 *
 * To run a query within a React component, call `useFetchProjectStatusesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectStatusesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectStatusesListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFetchProjectStatusesListQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchProjectStatusesListQuery,
    FetchProjectStatusesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchProjectStatusesListQuery, FetchProjectStatusesListQueryVariables>(
    FetchProjectStatusesListDocument,
    options,
  );
}
export function useFetchProjectStatusesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchProjectStatusesListQuery,
    FetchProjectStatusesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchProjectStatusesListQuery, FetchProjectStatusesListQueryVariables>(
    FetchProjectStatusesListDocument,
    options,
  );
}
export type FetchProjectStatusesListQueryHookResult = ReturnType<
  typeof useFetchProjectStatusesListQuery
>;
export type FetchProjectStatusesListLazyQueryHookResult = ReturnType<
  typeof useFetchProjectStatusesListLazyQuery
>;
export type FetchProjectStatusesListQueryResult = Apollo.QueryResult<
  FetchProjectStatusesListQuery,
  FetchProjectStatusesListQueryVariables
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
  mutation DocumentGenerate($input: [DocumentGenerateInput!]!) {
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
