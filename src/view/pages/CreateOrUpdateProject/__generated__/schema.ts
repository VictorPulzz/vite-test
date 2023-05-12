/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchProjectQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectQuery = {
  project: {
    id: number;
    name: string;
    hoursEstimated?: number | null;
    startDate?: string | null;
    endDate?: string | null;
    design?: string | null;
    roadmap?: string | null;
    notes?: string | null;
    phase?: Types.ProjectPhaseChoice | null;
    status?: { id: number; name: string } | null;
    clientTeam?: Array<{
      fullName: string;
      email: string;
      phone?: string | null;
      position?: string | null;
      notes?: string | null;
      pointContact?: boolean | null;
    }> | null;
    platforms?: Array<{ id: number; name: string }> | null;
  };
};

export type CreateProjectMutationVariables = Types.Exact<{
  input: Types.ProjectCreateInput;
}>;

export type CreateProjectMutation = { projectCreate: { id: number } };

export type UpdateProjectMutationVariables = Types.Exact<{
  input: Types.ProjectUpdateInput;
}>;

export type UpdateProjectMutation = { projectUpdate: { id: number } };

export type FetchPlatformsListQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.PaginationInput>;
}>;

export type FetchPlatformsListQuery = {
  platformList: { results: Array<{ value: number; label: string }> };
};

export type FetchProjectStatusesListQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.PaginationInput>;
}>;

export type FetchProjectStatusesListQuery = {
  projectStatusesList: { results: Array<{ value: number; label: string }> };
};

export type FetchDocumentTemplateListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchDocumentTemplateListQuery = {
  documentTemplateList: Array<{
    id: number;
    name: string;
    fields?: Array<{ name: string; description?: string | null }> | null;
  }>;
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
  query FetchPlatformsList($pagination: PaginationInput) {
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
  baseOptions?: Apollo.QueryHookOptions<FetchPlatformsListQuery, FetchPlatformsListQueryVariables>,
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
  query FetchProjectStatusesList($pagination: PaginationInput) {
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
  baseOptions?: Apollo.QueryHookOptions<
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
