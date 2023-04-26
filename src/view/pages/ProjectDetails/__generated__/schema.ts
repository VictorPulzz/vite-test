/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchProjectPreviewQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectPreviewQuery = {
  projectPreview: {
    id: number;
    name: string;
    createdAt: string;
    inTeam: boolean;
    createdBy?: { fullName: string } | null;
  };
};

export type FetchProjectInfoQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectInfoQuery = {
  project: {
    id: number;
    name: string;
    createdAt: string;
    startDate?: string | null;
    endDate?: string | null;
    phase?: Types.ProjectPhaseChoice | null;
    design?: string | null;
    roadmap?: string | null;
    notes?: string | null;
    createdBy?: { fullName: string } | null;
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

export type FetchAllUsersQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.UserFilter>;
  pagination: Types.PaginationInput;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type FetchAllUsersQuery = {
  usersList: {
    results: Array<{
      id: number;
      fullName: string;
      email: string;
      photo?: { url: string } | null;
      role?: { name: string } | null;
    }>;
  };
};

export type FetchProjectMembersQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectMembersQuery = {
  projectMemberList: {
    currentTeam: Array<{
      startDate: string;
      endDate?: string | null;
      user: {
        id: number;
        fullName: string;
        email: string;
        photo?: { url: string } | null;
        role?: { name: string } | null;
      };
    }>;
    otherContrubutors: Array<{
      startDate: string;
      endDate?: string | null;
      user: {
        id: number;
        fullName: string;
        email: string;
        photo?: { url: string } | null;
        role?: { name: string } | null;
      };
    }>;
  };
};

export type AddProjectMemberMutationVariables = Types.Exact<{
  input: Types.ProjectMemberInput;
}>;

export type AddProjectMemberMutation = {
  projectAddMember: { currentTeam: boolean; project: { name: string }; user: { fullName: string } };
};

export type RemoveProjectMemberMutationVariables = Types.Exact<{
  input: Types.ProjectMemberInput;
}>;

export type RemoveProjectMemberMutation = { projectDeleteMember: { message: string } };

export type FetchProjectRepositoriesListQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectRepositoriesListQuery = {
  projectRepositoryList: Array<{
    id: number;
    name?: string | null;
    type?: Types.RepositoryTypeChoice | null;
    createdAt: string;
    technologies?: Array<{ id: number; name: string }> | null;
  }>;
};

export type FetchReposRequestsListQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.RequestFilter>;
  pagination: Types.PaginationInput;
  sort?: Types.InputMaybe<Array<Types.RequestSortFieldInput> | Types.RequestSortFieldInput>;
}>;

export type FetchReposRequestsListQuery = {
  requestList: {
    results: Array<{
      id: number;
      repositoryType?: Types.RepositoryTypeChoice | null;
      createdAt: string;
      technologies?: Array<{ id: number; name: string }> | null;
    }>;
  };
};

export type RequestNewProjectRepositoryMutationVariables = Types.Exact<{
  input: Types.RepositoryUpdateInput;
}>;

export type RequestNewProjectRepositoryMutation = {
  repositoryUpdate: { type?: Types.RepositoryTypeChoice | null };
};

export type FetchProjectEnvironmentsListQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectEnvironmentsListQuery = {
  projectEnvironmentList: Array<{
    id: number;
    projectId: number;
    name: Types.ProjectEnvironmentChoice;
    frontendCredentials?: { id: number; url: string; login: string; password: string } | null;
    backendCredentials?: { id: number; url: string; login: string; password: string } | null;
  }>;
};

export type FetchEnvsRequestsListQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.RequestFilter>;
  pagination: Types.PaginationInput;
  sort?: Types.InputMaybe<Array<Types.RequestSortFieldInput> | Types.RequestSortFieldInput>;
}>;

export type FetchEnvsRequestsListQuery = {
  requestList: {
    results: Array<{ id: number; environment?: Types.ProjectEnvironmentChoice | null }>;
  };
};

export type RequestNewProjectEnvironmentMutationVariables = Types.Exact<{
  input: Types.ProjectEnvironmentInput;
}>;

export type RequestNewProjectEnvironmentMutation = {
  projectEnvironmentCreateUpdate: { name: Types.ProjectEnvironmentChoice };
};

export type FetchProjectIntegrationsListQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectIntegrationsListQuery = {
  projectIntegrationList: Array<{
    id: number;
    name: string;
    projectId: number;
    environment?: Types.ProjectEnvironmentChoice | null;
    keys?: Array<{ id: number; title: string; value: string }> | null;
    credential?: {
      id: number;
      url?: string | null;
      login?: string | null;
      password?: string | null;
    } | null;
  }>;
};

export type FetchIntegrationsRequestsListQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.RequestFilter>;
  pagination: Types.PaginationInput;
  sort?: Types.InputMaybe<Array<Types.RequestSortFieldInput> | Types.RequestSortFieldInput>;
}>;

export type FetchIntegrationsRequestsListQuery = {
  requestList: { results: Array<{ id: number; integrationName?: string | null }> };
};

export type RequestNewProjectIntegrationMutationVariables = Types.Exact<{
  input: Types.ProjectIntegrationInput;
}>;

export type RequestNewProjectIntegrationMutation = {
  projectIntegrationCreateUpdate: { name: string };
};

export type FetchHistoryLogsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.LogFilter>;
  pagination: Types.PaginationInput;
}>;

export type FetchHistoryLogsQuery = {
  logList: {
    count: number;
    results: Array<{
      createdAt: string;
      id: number;
      message: string;
      createdBy: { fullName: string; id: number };
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
  documentList: {
    count: number;
    results: Array<{
      id: number;
      createdAt: string;
      project?: { name: string } | null;
      file: { __typename: 'ImageType'; fileName: string; url: string; size: number };
      addedBy?: { fullName: string } | null;
    }>;
  };
};

export type UploadDocumentMutationVariables = Types.Exact<{
  input: Types.DocumentInput;
}>;

export type UploadDocumentMutation = { documentCreateUpdate: { id: number } };

export type RemoveDocumentMutationVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type RemoveDocumentMutation = { documentDelete: { message: string } };

export type FetchAllProjectsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ProjectFilter>;
  pagination: Types.PaginationInput;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type FetchAllProjectsQuery = {
  projectsList: { results: Array<{ value: number; label: string }> };
};

export type FetchAllDocumentCategoriesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchAllDocumentCategoriesQuery = {
  documentCategoryList: Array<{ value: number; label: string }>;
};

export type FetchProjectSlackChannelsQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectSlackChannelsQuery = {
  project: {
    slackChannels?: Array<{
      channelId?: string | null;
      createdAt: string;
      channelUrl?: string | null;
      template?: { label?: string | null; prefix: string } | null;
    }> | null;
  };
};

export type CreateProjectSlackChannelMutationVariables = Types.Exact<{
  input: Types.ProjectSlackInput;
}>;

export type CreateProjectSlackChannelMutation = {
  projectAddSlackChannel: { channelUrl?: string | null };
};

export const FetchProjectPreviewDocument = gql`
  query FetchProjectPreview($data: IDInput!) {
    projectPreview(data: $data) {
      id
      name
      createdAt
      createdBy {
        fullName
      }
      inTeam
    }
  }
`;

/**
 * __useFetchProjectPreviewQuery__
 *
 * To run a query within a React component, call `useFetchProjectPreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectPreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectPreviewQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFetchProjectPreviewQuery(
  baseOptions: Apollo.QueryHookOptions<FetchProjectPreviewQuery, FetchProjectPreviewQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchProjectPreviewQuery, FetchProjectPreviewQueryVariables>(
    FetchProjectPreviewDocument,
    options,
  );
}
export function useFetchProjectPreviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchProjectPreviewQuery,
    FetchProjectPreviewQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchProjectPreviewQuery, FetchProjectPreviewQueryVariables>(
    FetchProjectPreviewDocument,
    options,
  );
}
export type FetchProjectPreviewQueryHookResult = ReturnType<typeof useFetchProjectPreviewQuery>;
export type FetchProjectPreviewLazyQueryHookResult = ReturnType<
  typeof useFetchProjectPreviewLazyQuery
>;
export type FetchProjectPreviewQueryResult = Apollo.QueryResult<
  FetchProjectPreviewQuery,
  FetchProjectPreviewQueryVariables
>;
export const FetchProjectInfoDocument = gql`
  query FetchProjectInfo($data: IDInput!) {
    project(data: $data) {
      id
      name
      createdAt
      createdBy {
        fullName
      }
      status {
        id
        name
      }
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
      platforms {
        id
        name
      }
    }
  }
`;

/**
 * __useFetchProjectInfoQuery__
 *
 * To run a query within a React component, call `useFetchProjectInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectInfoQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFetchProjectInfoQuery(
  baseOptions: Apollo.QueryHookOptions<FetchProjectInfoQuery, FetchProjectInfoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchProjectInfoQuery, FetchProjectInfoQueryVariables>(
    FetchProjectInfoDocument,
    options,
  );
}
export function useFetchProjectInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchProjectInfoQuery, FetchProjectInfoQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchProjectInfoQuery, FetchProjectInfoQueryVariables>(
    FetchProjectInfoDocument,
    options,
  );
}
export type FetchProjectInfoQueryHookResult = ReturnType<typeof useFetchProjectInfoQuery>;
export type FetchProjectInfoLazyQueryHookResult = ReturnType<typeof useFetchProjectInfoLazyQuery>;
export type FetchProjectInfoQueryResult = Apollo.QueryResult<
  FetchProjectInfoQuery,
  FetchProjectInfoQueryVariables
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
        startDate
        endDate
        user {
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
      otherContrubutors {
        startDate
        endDate
        user {
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
export const FetchReposRequestsListDocument = gql`
  query FetchReposRequestsList(
    $filters: RequestFilter
    $pagination: PaginationInput!
    $sort: [RequestSortFieldInput!]
  ) {
    requestList(filters: $filters, pagination: $pagination, sort: $sort) {
      results {
        id
        repositoryType
        technologies {
          id
          name
        }
        createdAt
      }
    }
  }
`;

/**
 * __useFetchReposRequestsListQuery__
 *
 * To run a query within a React component, call `useFetchReposRequestsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchReposRequestsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchReposRequestsListQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFetchReposRequestsListQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchReposRequestsListQuery,
    FetchReposRequestsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchReposRequestsListQuery, FetchReposRequestsListQueryVariables>(
    FetchReposRequestsListDocument,
    options,
  );
}
export function useFetchReposRequestsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchReposRequestsListQuery,
    FetchReposRequestsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchReposRequestsListQuery, FetchReposRequestsListQueryVariables>(
    FetchReposRequestsListDocument,
    options,
  );
}
export type FetchReposRequestsListQueryHookResult = ReturnType<
  typeof useFetchReposRequestsListQuery
>;
export type FetchReposRequestsListLazyQueryHookResult = ReturnType<
  typeof useFetchReposRequestsListLazyQuery
>;
export type FetchReposRequestsListQueryResult = Apollo.QueryResult<
  FetchReposRequestsListQuery,
  FetchReposRequestsListQueryVariables
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
        id
        url
        login
        password
      }
      backendCredentials {
        id
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
export const FetchEnvsRequestsListDocument = gql`
  query FetchEnvsRequestsList(
    $filters: RequestFilter
    $pagination: PaginationInput!
    $sort: [RequestSortFieldInput!]
  ) {
    requestList(filters: $filters, pagination: $pagination, sort: $sort) {
      results {
        id
        environment
      }
    }
  }
`;

/**
 * __useFetchEnvsRequestsListQuery__
 *
 * To run a query within a React component, call `useFetchEnvsRequestsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchEnvsRequestsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchEnvsRequestsListQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFetchEnvsRequestsListQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchEnvsRequestsListQuery,
    FetchEnvsRequestsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchEnvsRequestsListQuery, FetchEnvsRequestsListQueryVariables>(
    FetchEnvsRequestsListDocument,
    options,
  );
}
export function useFetchEnvsRequestsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchEnvsRequestsListQuery,
    FetchEnvsRequestsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchEnvsRequestsListQuery, FetchEnvsRequestsListQueryVariables>(
    FetchEnvsRequestsListDocument,
    options,
  );
}
export type FetchEnvsRequestsListQueryHookResult = ReturnType<typeof useFetchEnvsRequestsListQuery>;
export type FetchEnvsRequestsListLazyQueryHookResult = ReturnType<
  typeof useFetchEnvsRequestsListLazyQuery
>;
export type FetchEnvsRequestsListQueryResult = Apollo.QueryResult<
  FetchEnvsRequestsListQuery,
  FetchEnvsRequestsListQueryVariables
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
        id
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
export const FetchIntegrationsRequestsListDocument = gql`
  query FetchIntegrationsRequestsList(
    $filters: RequestFilter
    $pagination: PaginationInput!
    $sort: [RequestSortFieldInput!]
  ) {
    requestList(filters: $filters, pagination: $pagination, sort: $sort) {
      results {
        id
        integrationName
      }
    }
  }
`;

/**
 * __useFetchIntegrationsRequestsListQuery__
 *
 * To run a query within a React component, call `useFetchIntegrationsRequestsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchIntegrationsRequestsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchIntegrationsRequestsListQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFetchIntegrationsRequestsListQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchIntegrationsRequestsListQuery,
    FetchIntegrationsRequestsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FetchIntegrationsRequestsListQuery,
    FetchIntegrationsRequestsListQueryVariables
  >(FetchIntegrationsRequestsListDocument, options);
}
export function useFetchIntegrationsRequestsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchIntegrationsRequestsListQuery,
    FetchIntegrationsRequestsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchIntegrationsRequestsListQuery,
    FetchIntegrationsRequestsListQueryVariables
  >(FetchIntegrationsRequestsListDocument, options);
}
export type FetchIntegrationsRequestsListQueryHookResult = ReturnType<
  typeof useFetchIntegrationsRequestsListQuery
>;
export type FetchIntegrationsRequestsListLazyQueryHookResult = ReturnType<
  typeof useFetchIntegrationsRequestsListLazyQuery
>;
export type FetchIntegrationsRequestsListQueryResult = Apollo.QueryResult<
  FetchIntegrationsRequestsListQuery,
  FetchIntegrationsRequestsListQueryVariables
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
          id
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
export const UploadDocumentDocument = gql`
  mutation UploadDocument($input: DocumentInput!) {
    documentCreateUpdate(data: $input) {
      id
    }
  }
`;
export type UploadDocumentMutationFn = Apollo.MutationFunction<
  UploadDocumentMutation,
  UploadDocumentMutationVariables
>;

/**
 * __useUploadDocumentMutation__
 *
 * To run a mutation, you first call `useUploadDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadDocumentMutation, { data, loading, error }] = useUploadDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadDocumentMutation(
  baseOptions?: Apollo.MutationHookOptions<UploadDocumentMutation, UploadDocumentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UploadDocumentMutation, UploadDocumentMutationVariables>(
    UploadDocumentDocument,
    options,
  );
}
export type UploadDocumentMutationHookResult = ReturnType<typeof useUploadDocumentMutation>;
export type UploadDocumentMutationResult = Apollo.MutationResult<UploadDocumentMutation>;
export type UploadDocumentMutationOptions = Apollo.BaseMutationOptions<
  UploadDocumentMutation,
  UploadDocumentMutationVariables
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
export const FetchProjectSlackChannelsDocument = gql`
  query FetchProjectSlackChannels($data: IDInput!) {
    project(data: $data) {
      slackChannels {
        template {
          label
          prefix
        }
        channelId
        createdAt
        channelUrl
      }
    }
  }
`;

/**
 * __useFetchProjectSlackChannelsQuery__
 *
 * To run a query within a React component, call `useFetchProjectSlackChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectSlackChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectSlackChannelsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFetchProjectSlackChannelsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchProjectSlackChannelsQuery,
    FetchProjectSlackChannelsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchProjectSlackChannelsQuery, FetchProjectSlackChannelsQueryVariables>(
    FetchProjectSlackChannelsDocument,
    options,
  );
}
export function useFetchProjectSlackChannelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchProjectSlackChannelsQuery,
    FetchProjectSlackChannelsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchProjectSlackChannelsQuery,
    FetchProjectSlackChannelsQueryVariables
  >(FetchProjectSlackChannelsDocument, options);
}
export type FetchProjectSlackChannelsQueryHookResult = ReturnType<
  typeof useFetchProjectSlackChannelsQuery
>;
export type FetchProjectSlackChannelsLazyQueryHookResult = ReturnType<
  typeof useFetchProjectSlackChannelsLazyQuery
>;
export type FetchProjectSlackChannelsQueryResult = Apollo.QueryResult<
  FetchProjectSlackChannelsQuery,
  FetchProjectSlackChannelsQueryVariables
>;
export const CreateProjectSlackChannelDocument = gql`
  mutation CreateProjectSlackChannel($input: ProjectSlackInput!) {
    projectAddSlackChannel(data: $input) {
      channelUrl
    }
  }
`;
export type CreateProjectSlackChannelMutationFn = Apollo.MutationFunction<
  CreateProjectSlackChannelMutation,
  CreateProjectSlackChannelMutationVariables
>;

/**
 * __useCreateProjectSlackChannelMutation__
 *
 * To run a mutation, you first call `useCreateProjectSlackChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectSlackChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectSlackChannelMutation, { data, loading, error }] = useCreateProjectSlackChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectSlackChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProjectSlackChannelMutation,
    CreateProjectSlackChannelMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProjectSlackChannelMutation,
    CreateProjectSlackChannelMutationVariables
  >(CreateProjectSlackChannelDocument, options);
}
export type CreateProjectSlackChannelMutationHookResult = ReturnType<
  typeof useCreateProjectSlackChannelMutation
>;
export type CreateProjectSlackChannelMutationResult =
  Apollo.MutationResult<CreateProjectSlackChannelMutation>;
export type CreateProjectSlackChannelMutationOptions = Apollo.BaseMutationOptions<
  CreateProjectSlackChannelMutation,
  CreateProjectSlackChannelMutationVariables
>;
