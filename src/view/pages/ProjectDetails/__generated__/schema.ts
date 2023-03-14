/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchProjectDetailsQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectDetailsQuery = {
  __typename?: 'Query';
  project: {
    __typename?: 'ProjectType';
    id: number;
    name: string;
    createdAt: string;
    status?: Types.StatusEnum | null;
    startDate: string;
    endDate?: string | null;
    phase: Types.ProjectPhaseChoice;
    design?: string | null;
    roadmap?: string | null;
    notes?: string | null;
    createdBy?: { __typename?: 'UserType'; fullName?: string | null } | null;
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

export type FetchAllUsersQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.UserFilter>;
  pagination: Types.PaginationInput;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type FetchAllUsersQuery = {
  __typename?: 'Query';
  usersList: {
    __typename?: 'UserTypePagination';
    results: Array<{
      __typename?: 'UserType';
      id?: string | null;
      fullName?: string | null;
      email: string;
      photo?: { __typename?: 'ImageType'; url: string } | null;
      role?: { __typename?: 'RoleType'; name: string } | null;
    }>;
  };
};

export type FetchProjectMembersQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectMembersQuery = {
  __typename?: 'Query';
  projectMemberList: {
    __typename?: 'ProjectMemberListType';
    currentTeam: Array<{
      __typename?: 'UserType';
      id?: string | null;
      fullName?: string | null;
      email: string;
      photo?: { __typename?: 'ImageType'; url: string } | null;
      role?: { __typename?: 'RoleType'; name: string } | null;
    }>;
    otherContrubutors: Array<{
      __typename?: 'UserType';
      id?: string | null;
      fullName?: string | null;
      email: string;
      photo?: { __typename?: 'ImageType'; url: string } | null;
      role?: { __typename?: 'RoleType'; name: string } | null;
    }>;
  };
};

export type AddProjectMemberMutationVariables = Types.Exact<{
  input: Types.ProjectMemberInput;
}>;

export type AddProjectMemberMutation = {
  __typename?: 'Mutation';
  projectAddMember: {
    __typename?: 'ProjectMemberType';
    currentTeam: boolean;
    project: { __typename?: 'ProjectType'; name: string };
    user: { __typename?: 'UserType'; fullName?: string | null };
  };
};

export type RemoveProjectMemberMutationVariables = Types.Exact<{
  input: Types.ProjectMemberInput;
}>;

export type RemoveProjectMemberMutation = {
  __typename?: 'Mutation';
  projectDeleteMember: { __typename?: 'MessageType'; message: string };
};

export type FetchProjectRepositoriesListQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectRepositoriesListQuery = {
  __typename?: 'Query';
  projectRepositoryList: Array<{
    __typename?: 'RepositoryType';
    id?: number | null;
    name?: string | null;
    type?: Types.RepositoryTypeChoice | null;
    createdAt: string;
    technologies?: Array<{ __typename?: 'TechnologyType'; id: number; name: string }> | null;
  }>;
};

export type RequestNewProjectRepositoryMutationVariables = Types.Exact<{
  input: Types.RepositoryUpdateInput;
}>;

export type RequestNewProjectRepositoryMutation = {
  __typename?: 'Mutation';
  repositoryUpdate: { __typename?: 'RepositoryType'; type?: Types.RepositoryTypeChoice | null };
};

export type FetchProjectEnvironmentsListQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectEnvironmentsListQuery = {
  __typename?: 'Query';
  projectEnvironmentList: Array<{
    __typename?: 'ProjectEnvironmentType';
    id?: number | null;
    projectId: number;
    name: Types.ProjectEnvironmentChoice;
    frontendCredentials?: {
      __typename?: 'EnvironmentCredentialsType';
      url: string;
      login: string;
      password: string;
    } | null;
    backendCredentials?: {
      __typename?: 'EnvironmentCredentialsType';
      url: string;
      login: string;
      password: string;
    } | null;
  }>;
};

export type RequestNewProjectEnvironmentMutationVariables = Types.Exact<{
  input: Types.ProjectEnvironmentInput;
}>;

export type RequestNewProjectEnvironmentMutation = {
  __typename?: 'Mutation';
  projectEnvironmentCreateUpdate: {
    __typename?: 'ProjectEnvironmentType';
    name: Types.ProjectEnvironmentChoice;
  };
};

export type FetchProjectIntegrationsListQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectIntegrationsListQuery = {
  __typename?: 'Query';
  projectIntegrationList: Array<{
    __typename?: 'ProjectIntegrationType';
    id?: number | null;
    name: string;
    projectId: number;
    environment?: Types.ProjectEnvironmentChoice | null;
    keys?: Array<{
      __typename?: 'IntegrationKeyType';
      id?: number | null;
      title: string;
      value: string;
    }> | null;
    credential?: {
      __typename?: 'IntegrationCredentialsType';
      url?: string | null;
      login?: string | null;
      password?: string | null;
    } | null;
  }>;
};

export type RequestNewProjectIntegrationMutationVariables = Types.Exact<{
  input: Types.ProjectIntegrationInput;
}>;

export type RequestNewProjectIntegrationMutation = {
  __typename?: 'Mutation';
  projectIntegrationCreateUpdate: { __typename?: 'ProjectIntegrationType'; name: string };
};

export type FetchHistoryLogsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.LogFilter>;
  pagination: Types.PaginationInput;
}>;

export type FetchHistoryLogsQuery = {
  __typename?: 'Query';
  logList: {
    __typename?: 'LogTypePagination';
    count: number;
    results: Array<{
      __typename?: 'LogType';
      createdAt: string;
      id: number;
      message: string;
      createdBy: { __typename?: 'UserType'; fullName?: string | null };
    }>;
  };
};

export type FetchDocumentsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.DocumentFilter>;
  pagination: Types.PaginationInput;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  sort?: Types.InputMaybe<Array<Types.DocumentSortFieldInput> | Types.DocumentSortFieldInput>;
}>;

export type FetchDocumentsQuery = {
  __typename?: 'Query';
  documentList: {
    __typename?: 'DocumentTypePagination';
    count: number;
    results: Array<{
      __typename?: 'DocumentType';
      id: number;
      createdAt: string;
      project?: { __typename?: 'ProjectType'; name: string } | null;
      file: { __typename: 'ImageType'; fileName: string; url: string; size: number };
      addedBy?: { __typename?: 'UserType'; fullName?: string | null } | null;
    }>;
  };
};

export type RemoveDocumentMutationVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type RemoveDocumentMutation = {
  __typename?: 'Mutation';
  documentDelete: { __typename?: 'MessageType'; message: string };
};

export type FetchAllProjectsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ProjectFilter>;
  pagination: Types.PaginationInput;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type FetchAllProjectsQuery = {
  __typename?: 'Query';
  projectsList: {
    __typename?: 'ProjectTypePagination';
    results: Array<{ __typename?: 'ProjectType'; value: number; label: string }>;
  };
};

export type FetchAllDocumentCategoriesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchAllDocumentCategoriesQuery = {
  __typename?: 'Query';
  documentCategoryList: Array<{
    __typename?: 'DocumentCategoryType';
    value: number;
    label: string;
  }>;
};

export const FetchProjectDetailsDocument = gql`
  query FetchProjectDetails($data: IDInput!) {
    project(data: $data) {
      id
      name
      createdAt
      createdBy {
        fullName
      }
      status
      startDate
      endDate
      phase
      design
      roadmap
      notes
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
 * __useFetchProjectDetailsQuery__
 *
 * To run a query within a React component, call `useFetchProjectDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectDetailsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFetchProjectDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<FetchProjectDetailsQuery, FetchProjectDetailsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchProjectDetailsQuery, FetchProjectDetailsQueryVariables>(
    FetchProjectDetailsDocument,
    options,
  );
}
export function useFetchProjectDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchProjectDetailsQuery,
    FetchProjectDetailsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchProjectDetailsQuery, FetchProjectDetailsQueryVariables>(
    FetchProjectDetailsDocument,
    options,
  );
}
export type FetchProjectDetailsQueryHookResult = ReturnType<typeof useFetchProjectDetailsQuery>;
export type FetchProjectDetailsLazyQueryHookResult = ReturnType<
  typeof useFetchProjectDetailsLazyQuery
>;
export type FetchProjectDetailsQueryResult = Apollo.QueryResult<
  FetchProjectDetailsQuery,
  FetchProjectDetailsQueryVariables
>;
export const FetchAllUsersDocument = gql`
  query FetchAllUsers($filters: UserFilter, $pagination: PaginationInput!, $search: String) {
    usersList(filters: $filters, pagination: $pagination, search: $search) {
      results {
        id
        photo {
          url
        }
        fullName
        role {
          name
        }
        email
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
export const FetchProjectMembersDocument = gql`
  query FetchProjectMembers($data: IDInput!) {
    projectMemberList(data: $data) {
      currentTeam {
        id
        photo {
          url
        }
        fullName
        role {
          name
        }
        email
      }
      otherContrubutors {
        id
        photo {
          url
        }
        fullName
        role {
          name
        }
        email
      }
    }
  }
`;

/**
 * __useFetchProjectMembersQuery__
 *
 * To run a query within a React component, call `useFetchProjectMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectMembersQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFetchProjectMembersQuery(
  baseOptions: Apollo.QueryHookOptions<FetchProjectMembersQuery, FetchProjectMembersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchProjectMembersQuery, FetchProjectMembersQueryVariables>(
    FetchProjectMembersDocument,
    options,
  );
}
export function useFetchProjectMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchProjectMembersQuery,
    FetchProjectMembersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchProjectMembersQuery, FetchProjectMembersQueryVariables>(
    FetchProjectMembersDocument,
    options,
  );
}
export type FetchProjectMembersQueryHookResult = ReturnType<typeof useFetchProjectMembersQuery>;
export type FetchProjectMembersLazyQueryHookResult = ReturnType<
  typeof useFetchProjectMembersLazyQuery
>;
export type FetchProjectMembersQueryResult = Apollo.QueryResult<
  FetchProjectMembersQuery,
  FetchProjectMembersQueryVariables
>;
export const AddProjectMemberDocument = gql`
  mutation AddProjectMember($input: ProjectMemberInput!) {
    projectAddMember(data: $input) {
      currentTeam
      project {
        name
      }
      user {
        fullName
      }
    }
  }
`;
export type AddProjectMemberMutationFn = Apollo.MutationFunction<
  AddProjectMemberMutation,
  AddProjectMemberMutationVariables
>;

/**
 * __useAddProjectMemberMutation__
 *
 * To run a mutation, you first call `useAddProjectMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectMemberMutation, { data, loading, error }] = useAddProjectMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddProjectMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProjectMemberMutation,
    AddProjectMemberMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddProjectMemberMutation, AddProjectMemberMutationVariables>(
    AddProjectMemberDocument,
    options,
  );
}
export type AddProjectMemberMutationHookResult = ReturnType<typeof useAddProjectMemberMutation>;
export type AddProjectMemberMutationResult = Apollo.MutationResult<AddProjectMemberMutation>;
export type AddProjectMemberMutationOptions = Apollo.BaseMutationOptions<
  AddProjectMemberMutation,
  AddProjectMemberMutationVariables
>;
export const RemoveProjectMemberDocument = gql`
  mutation RemoveProjectMember($input: ProjectMemberInput!) {
    projectDeleteMember(data: $input) {
      message
    }
  }
`;
export type RemoveProjectMemberMutationFn = Apollo.MutationFunction<
  RemoveProjectMemberMutation,
  RemoveProjectMemberMutationVariables
>;

/**
 * __useRemoveProjectMemberMutation__
 *
 * To run a mutation, you first call `useRemoveProjectMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectMemberMutation, { data, loading, error }] = useRemoveProjectMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveProjectMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveProjectMemberMutation,
    RemoveProjectMemberMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveProjectMemberMutation, RemoveProjectMemberMutationVariables>(
    RemoveProjectMemberDocument,
    options,
  );
}
export type RemoveProjectMemberMutationHookResult = ReturnType<
  typeof useRemoveProjectMemberMutation
>;
export type RemoveProjectMemberMutationResult = Apollo.MutationResult<RemoveProjectMemberMutation>;
export type RemoveProjectMemberMutationOptions = Apollo.BaseMutationOptions<
  RemoveProjectMemberMutation,
  RemoveProjectMemberMutationVariables
>;
export const FetchProjectRepositoriesListDocument = gql`
  query FetchProjectRepositoriesList($data: IDInput!) {
    projectRepositoryList(data: $data) {
      id
      name
      type
      technologies {
        id
        name
      }
      createdAt
    }
  }
`;

/**
 * __useFetchProjectRepositoriesListQuery__
 *
 * To run a query within a React component, call `useFetchProjectRepositoriesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectRepositoriesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectRepositoriesListQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFetchProjectRepositoriesListQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchProjectRepositoriesListQuery,
    FetchProjectRepositoriesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FetchProjectRepositoriesListQuery,
    FetchProjectRepositoriesListQueryVariables
  >(FetchProjectRepositoriesListDocument, options);
}
export function useFetchProjectRepositoriesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchProjectRepositoriesListQuery,
    FetchProjectRepositoriesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchProjectRepositoriesListQuery,
    FetchProjectRepositoriesListQueryVariables
  >(FetchProjectRepositoriesListDocument, options);
}
export type FetchProjectRepositoriesListQueryHookResult = ReturnType<
  typeof useFetchProjectRepositoriesListQuery
>;
export type FetchProjectRepositoriesListLazyQueryHookResult = ReturnType<
  typeof useFetchProjectRepositoriesListLazyQuery
>;
export type FetchProjectRepositoriesListQueryResult = Apollo.QueryResult<
  FetchProjectRepositoriesListQuery,
  FetchProjectRepositoriesListQueryVariables
>;
export const RequestNewProjectRepositoryDocument = gql`
  mutation RequestNewProjectRepository($input: RepositoryUpdateInput!) {
    repositoryUpdate(data: $input) {
      type
    }
  }
`;
export type RequestNewProjectRepositoryMutationFn = Apollo.MutationFunction<
  RequestNewProjectRepositoryMutation,
  RequestNewProjectRepositoryMutationVariables
>;

/**
 * __useRequestNewProjectRepositoryMutation__
 *
 * To run a mutation, you first call `useRequestNewProjectRepositoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestNewProjectRepositoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestNewProjectRepositoryMutation, { data, loading, error }] = useRequestNewProjectRepositoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestNewProjectRepositoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestNewProjectRepositoryMutation,
    RequestNewProjectRepositoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RequestNewProjectRepositoryMutation,
    RequestNewProjectRepositoryMutationVariables
  >(RequestNewProjectRepositoryDocument, options);
}
export type RequestNewProjectRepositoryMutationHookResult = ReturnType<
  typeof useRequestNewProjectRepositoryMutation
>;
export type RequestNewProjectRepositoryMutationResult =
  Apollo.MutationResult<RequestNewProjectRepositoryMutation>;
export type RequestNewProjectRepositoryMutationOptions = Apollo.BaseMutationOptions<
  RequestNewProjectRepositoryMutation,
  RequestNewProjectRepositoryMutationVariables
>;
export const FetchProjectEnvironmentsListDocument = gql`
  query FetchProjectEnvironmentsList($data: IDInput!) {
    projectEnvironmentList(data: $data) {
      id
      projectId
      name
      frontendCredentials {
        url
        login
        password
      }
      backendCredentials {
        url
        login
        password
      }
    }
  }
`;

/**
 * __useFetchProjectEnvironmentsListQuery__
 *
 * To run a query within a React component, call `useFetchProjectEnvironmentsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectEnvironmentsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectEnvironmentsListQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFetchProjectEnvironmentsListQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchProjectEnvironmentsListQuery,
    FetchProjectEnvironmentsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FetchProjectEnvironmentsListQuery,
    FetchProjectEnvironmentsListQueryVariables
  >(FetchProjectEnvironmentsListDocument, options);
}
export function useFetchProjectEnvironmentsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchProjectEnvironmentsListQuery,
    FetchProjectEnvironmentsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchProjectEnvironmentsListQuery,
    FetchProjectEnvironmentsListQueryVariables
  >(FetchProjectEnvironmentsListDocument, options);
}
export type FetchProjectEnvironmentsListQueryHookResult = ReturnType<
  typeof useFetchProjectEnvironmentsListQuery
>;
export type FetchProjectEnvironmentsListLazyQueryHookResult = ReturnType<
  typeof useFetchProjectEnvironmentsListLazyQuery
>;
export type FetchProjectEnvironmentsListQueryResult = Apollo.QueryResult<
  FetchProjectEnvironmentsListQuery,
  FetchProjectEnvironmentsListQueryVariables
>;
export const RequestNewProjectEnvironmentDocument = gql`
  mutation RequestNewProjectEnvironment($input: ProjectEnvironmentInput!) {
    projectEnvironmentCreateUpdate(data: $input) {
      name
    }
  }
`;
export type RequestNewProjectEnvironmentMutationFn = Apollo.MutationFunction<
  RequestNewProjectEnvironmentMutation,
  RequestNewProjectEnvironmentMutationVariables
>;

/**
 * __useRequestNewProjectEnvironmentMutation__
 *
 * To run a mutation, you first call `useRequestNewProjectEnvironmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestNewProjectEnvironmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestNewProjectEnvironmentMutation, { data, loading, error }] = useRequestNewProjectEnvironmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestNewProjectEnvironmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestNewProjectEnvironmentMutation,
    RequestNewProjectEnvironmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RequestNewProjectEnvironmentMutation,
    RequestNewProjectEnvironmentMutationVariables
  >(RequestNewProjectEnvironmentDocument, options);
}
export type RequestNewProjectEnvironmentMutationHookResult = ReturnType<
  typeof useRequestNewProjectEnvironmentMutation
>;
export type RequestNewProjectEnvironmentMutationResult =
  Apollo.MutationResult<RequestNewProjectEnvironmentMutation>;
export type RequestNewProjectEnvironmentMutationOptions = Apollo.BaseMutationOptions<
  RequestNewProjectEnvironmentMutation,
  RequestNewProjectEnvironmentMutationVariables
>;
export const FetchProjectIntegrationsListDocument = gql`
  query FetchProjectIntegrationsList($data: IDInput!) {
    projectIntegrationList(data: $data) {
      id
      name
      projectId
      environment
      keys {
        id
        title
        value
      }
      credential {
        url
        login
        password
      }
    }
  }
`;

/**
 * __useFetchProjectIntegrationsListQuery__
 *
 * To run a query within a React component, call `useFetchProjectIntegrationsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectIntegrationsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectIntegrationsListQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFetchProjectIntegrationsListQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchProjectIntegrationsListQuery,
    FetchProjectIntegrationsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FetchProjectIntegrationsListQuery,
    FetchProjectIntegrationsListQueryVariables
  >(FetchProjectIntegrationsListDocument, options);
}
export function useFetchProjectIntegrationsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchProjectIntegrationsListQuery,
    FetchProjectIntegrationsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchProjectIntegrationsListQuery,
    FetchProjectIntegrationsListQueryVariables
  >(FetchProjectIntegrationsListDocument, options);
}
export type FetchProjectIntegrationsListQueryHookResult = ReturnType<
  typeof useFetchProjectIntegrationsListQuery
>;
export type FetchProjectIntegrationsListLazyQueryHookResult = ReturnType<
  typeof useFetchProjectIntegrationsListLazyQuery
>;
export type FetchProjectIntegrationsListQueryResult = Apollo.QueryResult<
  FetchProjectIntegrationsListQuery,
  FetchProjectIntegrationsListQueryVariables
>;
export const RequestNewProjectIntegrationDocument = gql`
  mutation RequestNewProjectIntegration($input: ProjectIntegrationInput!) {
    projectIntegrationCreateUpdate(data: $input) {
      name
    }
  }
`;
export type RequestNewProjectIntegrationMutationFn = Apollo.MutationFunction<
  RequestNewProjectIntegrationMutation,
  RequestNewProjectIntegrationMutationVariables
>;

/**
 * __useRequestNewProjectIntegrationMutation__
 *
 * To run a mutation, you first call `useRequestNewProjectIntegrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestNewProjectIntegrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestNewProjectIntegrationMutation, { data, loading, error }] = useRequestNewProjectIntegrationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestNewProjectIntegrationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestNewProjectIntegrationMutation,
    RequestNewProjectIntegrationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RequestNewProjectIntegrationMutation,
    RequestNewProjectIntegrationMutationVariables
  >(RequestNewProjectIntegrationDocument, options);
}
export type RequestNewProjectIntegrationMutationHookResult = ReturnType<
  typeof useRequestNewProjectIntegrationMutation
>;
export type RequestNewProjectIntegrationMutationResult =
  Apollo.MutationResult<RequestNewProjectIntegrationMutation>;
export type RequestNewProjectIntegrationMutationOptions = Apollo.BaseMutationOptions<
  RequestNewProjectIntegrationMutation,
  RequestNewProjectIntegrationMutationVariables
>;
export const FetchHistoryLogsDocument = gql`
  query FetchHistoryLogs($filters: LogFilter, $pagination: PaginationInput!) {
    logList(filters: $filters, pagination: $pagination) {
      results {
        createdAt
        createdBy {
          fullName
        }
        id
        message
      }
      count
    }
  }
`;

/**
 * __useFetchHistoryLogsQuery__
 *
 * To run a query within a React component, call `useFetchHistoryLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchHistoryLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchHistoryLogsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useFetchHistoryLogsQuery(
  baseOptions: Apollo.QueryHookOptions<FetchHistoryLogsQuery, FetchHistoryLogsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchHistoryLogsQuery, FetchHistoryLogsQueryVariables>(
    FetchHistoryLogsDocument,
    options,
  );
}
export function useFetchHistoryLogsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchHistoryLogsQuery, FetchHistoryLogsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchHistoryLogsQuery, FetchHistoryLogsQueryVariables>(
    FetchHistoryLogsDocument,
    options,
  );
}
export type FetchHistoryLogsQueryHookResult = ReturnType<typeof useFetchHistoryLogsQuery>;
export type FetchHistoryLogsLazyQueryHookResult = ReturnType<typeof useFetchHistoryLogsLazyQuery>;
export type FetchHistoryLogsQueryResult = Apollo.QueryResult<
  FetchHistoryLogsQuery,
  FetchHistoryLogsQueryVariables
>;
export const FetchDocumentsDocument = gql`
  query FetchDocuments(
    $filters: DocumentFilter
    $pagination: PaginationInput!
    $search: String
    $sort: [DocumentSortFieldInput!]
  ) {
    documentList(filters: $filters, pagination: $pagination, search: $search, sort: $sort) {
      results {
        id
        project {
          name
        }
        file {
          fileName
          url
          size
          __typename
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
 * __useFetchDocumentsQuery__
 *
 * To run a query within a React component, call `useFetchDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchDocumentsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFetchDocumentsQuery(
  baseOptions: Apollo.QueryHookOptions<FetchDocumentsQuery, FetchDocumentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchDocumentsQuery, FetchDocumentsQueryVariables>(
    FetchDocumentsDocument,
    options,
  );
}
export function useFetchDocumentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchDocumentsQuery, FetchDocumentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchDocumentsQuery, FetchDocumentsQueryVariables>(
    FetchDocumentsDocument,
    options,
  );
}
export type FetchDocumentsQueryHookResult = ReturnType<typeof useFetchDocumentsQuery>;
export type FetchDocumentsLazyQueryHookResult = ReturnType<typeof useFetchDocumentsLazyQuery>;
export type FetchDocumentsQueryResult = Apollo.QueryResult<
  FetchDocumentsQuery,
  FetchDocumentsQueryVariables
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
export const FetchAllDocumentCategoriesDocument = gql`
  query FetchAllDocumentCategories {
    documentCategoryList {
      value: id
      label: name
    }
  }
`;

/**
 * __useFetchAllDocumentCategoriesQuery__
 *
 * To run a query within a React component, call `useFetchAllDocumentCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllDocumentCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllDocumentCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAllDocumentCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchAllDocumentCategoriesQuery,
    FetchAllDocumentCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchAllDocumentCategoriesQuery, FetchAllDocumentCategoriesQueryVariables>(
    FetchAllDocumentCategoriesDocument,
    options,
  );
}
export function useFetchAllDocumentCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchAllDocumentCategoriesQuery,
    FetchAllDocumentCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchAllDocumentCategoriesQuery,
    FetchAllDocumentCategoriesQueryVariables
  >(FetchAllDocumentCategoriesDocument, options);
}
export type FetchAllDocumentCategoriesQueryHookResult = ReturnType<
  typeof useFetchAllDocumentCategoriesQuery
>;
export type FetchAllDocumentCategoriesLazyQueryHookResult = ReturnType<
  typeof useFetchAllDocumentCategoriesLazyQuery
>;
export type FetchAllDocumentCategoriesQueryResult = Apollo.QueryResult<
  FetchAllDocumentCategoriesQuery,
  FetchAllDocumentCategoriesQueryVariables
>;
