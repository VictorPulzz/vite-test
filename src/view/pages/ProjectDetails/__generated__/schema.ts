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
    kanbanBoard?: string | null;
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

export type FetchProjectMembersQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectMembersQuery = {
  projectMemberList: {
    currentTeam: Array<{
      startDate: string;
      endDate?: string | null;
      currentTeam: boolean;
      user: {
        id: number;
        fullName: string;
        email: string;
        slackUrl?: string | null;
        photoThumbnail?: { url: string } | null;
        role?: { name: string } | null;
      };
    }>;
    otherContrubutors: Array<{
      startDate: string;
      endDate?: string | null;
      currentTeam: boolean;
      user: {
        id: number;
        fullName: string;
        email: string;
        slackUrl?: string | null;
        photoThumbnail?: { url: string } | null;
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

export type InviteUserToSlackMutationVariables = Types.Exact<{
  input: Types.ProjectMemberUpdateInput;
}>;

export type InviteUserToSlackMutation = { projectUpdateMember: { currentTeam: boolean } };

export type RemoveProjectMemberMutationVariables = Types.Exact<{
  input: Types.ProjectMemberInput;
}>;

export type RemoveProjectMemberMutation = { projectDeleteMember: { message: string } };

export type FetchProjectRepositoriesListQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchProjectRepositoriesListQuery = {
  projectRepositoryList: {
    projectInGit: boolean;
    projectRepositories?: Array<{
      id: number;
      name?: string | null;
      inParticipant?: boolean | null;
      type?: Types.RepositoryTypeChoice | null;
      gitUrl?: string | null;
      createdAt: string;
      technologies?: Array<{ id: number; name: string }> | null;
    }> | null;
  };
};

export type FetchReposRequestsListQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.RequestFilter>;
  pagination?: Types.InputMaybe<Types.PaginationInput>;
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
    frontendCredentials?: {
      id: number;
      url?: string | null;
      login?: string | null;
      password?: string | null;
    } | null;
    backendCredentials?: {
      id: number;
      url?: string | null;
      login?: string | null;
      password?: string | null;
    } | null;
  }>;
};

export type FetchProjectEnvironmentQueryVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type FetchProjectEnvironmentQuery = {
  projectEnvironment: {
    id: number;
    projectId: number;
    name: Types.ProjectEnvironmentChoice;
    frontendCredentials?: {
      id: number;
      url?: string | null;
      login?: string | null;
      password?: string | null;
    } | null;
    backendCredentials?: {
      id: number;
      url?: string | null;
      login?: string | null;
      password?: string | null;
    } | null;
  };
};

export type FetchEnvsRequestsListQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.RequestFilter>;
  pagination?: Types.InputMaybe<Types.PaginationInput>;
  sort?: Types.InputMaybe<Array<Types.RequestSortFieldInput> | Types.RequestSortFieldInput>;
}>;

export type FetchEnvsRequestsListQuery = {
  requestList: {
    results: Array<{ id: number; environment?: Types.ProjectEnvironmentChoice | null }>;
  };
};

export type CreateOrUpdateNewProjectEnvironmentMutationVariables = Types.Exact<{
  input: Types.ProjectEnvironmentInput;
}>;

export type CreateOrUpdateNewProjectEnvironmentMutation = {
  projectEnvironmentCreateUpdate: { name: Types.ProjectEnvironmentChoice };
};

export type RemoveProjectEnvironmentMutationVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type RemoveProjectEnvironmentMutation = { projectEnvironmentDelete: { message: string } };

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
  pagination?: Types.InputMaybe<Types.PaginationInput>;
  sort?: Types.InputMaybe<Array<Types.RequestSortFieldInput> | Types.RequestSortFieldInput>;
}>;

export type FetchIntegrationsRequestsListQuery = {
  requestList: { results: Array<{ id: number; integrationName?: string | null }> };
};

export type CreateNewProjectIntegrationMutationVariables = Types.Exact<{
  input: Types.ProjectIntegrationInput;
}>;

export type CreateNewProjectIntegrationMutation = {
  projectIntegrationCreateUpdate: { name: string };
};

export type FetchHistoryLogsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.LogFilter>;
  pagination?: Types.InputMaybe<Types.PaginationInput>;
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

export type FetchAllDocumentCategoriesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchAllDocumentCategoriesQuery = {
  documentCategoryList: Array<{ value: number; label: string }>;
};

export type FetchProjectIntegrationsQueryVariables = Types.Exact<{
  data: Types.IdInput;
  filters?: Types.InputMaybe<Types.ProjectIntegrationsPageFilter>;
}>;

export type FetchProjectIntegrationsQuery = {
  projectIntegrationPage: {
    gitGroupId?: string | null;
    slackChannels?: Array<{
      id: number;
      channelId?: string | null;
      createdAt: string;
      channelUrl?: string | null;
      templateName?: string | null;
      template?: { label?: string | null; prefix: string } | null;
    }> | null;
  };
};

export type FetchCreatedProjectSlackChannelsQueryVariables = Types.Exact<{
  data: Types.IdInput;
  filters?: Types.InputMaybe<Types.ProjectIntegrationsPageFilter>;
}>;

export type FetchCreatedProjectSlackChannelsQuery = {
  projectIntegrationPage: { slackChannels?: Array<{ id: number }> | null };
};

export type ConnectProjectToGitMutationVariables = Types.Exact<{
  input: Types.ProjectGitIntegrationInput;
}>;

export type ConnectProjectToGitMutation = { projectConnectToGit: { id: number } };

export type CreateProjectSlackChannelMutationVariables = Types.Exact<{
  input: Types.ProjectSlackInput;
}>;

export type CreateProjectSlackChannelMutation = {
  projectAddSlackChannel: { channelUrl?: string | null };
};

export type InviteUserToSlackChannelMutationVariables = Types.Exact<{
  input: Types.SlackUserInviteInput;
}>;

export type InviteUserToSlackChannelMutation = { slackUserInvite: { message: string } };

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
      kanbanBoard
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
export const FetchProjectMembersDocument = gql`
  query FetchProjectMembers($data: IDInput!) {
    projectMemberList(data: $data) {
      currentTeam {
        startDate
        endDate
        user {
          id
          photoThumbnail {
            url
          }
          fullName
          role {
            name
          }
          email
          slackUrl
        }
        currentTeam
      }
      otherContrubutors {
        startDate
        endDate
        user {
          id
          photoThumbnail {
            url
          }
          fullName
          role {
            name
          }
          email
          slackUrl
        }
        currentTeam
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
export const InviteUserToSlackDocument = gql`
  mutation InviteUserToSlack($input: ProjectMemberUpdateInput!) {
    projectUpdateMember(data: $input) {
      currentTeam
    }
  }
`;
export type InviteUserToSlackMutationFn = Apollo.MutationFunction<
  InviteUserToSlackMutation,
  InviteUserToSlackMutationVariables
>;

/**
 * __useInviteUserToSlackMutation__
 *
 * To run a mutation, you first call `useInviteUserToSlackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteUserToSlackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteUserToSlackMutation, { data, loading, error }] = useInviteUserToSlackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInviteUserToSlackMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InviteUserToSlackMutation,
    InviteUserToSlackMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InviteUserToSlackMutation, InviteUserToSlackMutationVariables>(
    InviteUserToSlackDocument,
    options,
  );
}
export type InviteUserToSlackMutationHookResult = ReturnType<typeof useInviteUserToSlackMutation>;
export type InviteUserToSlackMutationResult = Apollo.MutationResult<InviteUserToSlackMutation>;
export type InviteUserToSlackMutationOptions = Apollo.BaseMutationOptions<
  InviteUserToSlackMutation,
  InviteUserToSlackMutationVariables
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
      projectInGit
      projectRepositories {
        id
        name
        inParticipant
        type
        technologies {
          id
          name
        }
        gitUrl
        createdAt
      }
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
    $pagination: PaginationInput
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
  baseOptions?: Apollo.QueryHookOptions<
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
export const FetchProjectEnvironmentDocument = gql`
  query FetchProjectEnvironment($input: IDInput!) {
    projectEnvironment(data: $input) {
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
 * __useFetchProjectEnvironmentQuery__
 *
 * To run a query within a React component, call `useFetchProjectEnvironmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectEnvironmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectEnvironmentQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchProjectEnvironmentQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchProjectEnvironmentQuery,
    FetchProjectEnvironmentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchProjectEnvironmentQuery, FetchProjectEnvironmentQueryVariables>(
    FetchProjectEnvironmentDocument,
    options,
  );
}
export function useFetchProjectEnvironmentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchProjectEnvironmentQuery,
    FetchProjectEnvironmentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchProjectEnvironmentQuery, FetchProjectEnvironmentQueryVariables>(
    FetchProjectEnvironmentDocument,
    options,
  );
}
export type FetchProjectEnvironmentQueryHookResult = ReturnType<
  typeof useFetchProjectEnvironmentQuery
>;
export type FetchProjectEnvironmentLazyQueryHookResult = ReturnType<
  typeof useFetchProjectEnvironmentLazyQuery
>;
export type FetchProjectEnvironmentQueryResult = Apollo.QueryResult<
  FetchProjectEnvironmentQuery,
  FetchProjectEnvironmentQueryVariables
>;
export const FetchEnvsRequestsListDocument = gql`
  query FetchEnvsRequestsList(
    $filters: RequestFilter
    $pagination: PaginationInput
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
  baseOptions?: Apollo.QueryHookOptions<
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
export const CreateOrUpdateNewProjectEnvironmentDocument = gql`
  mutation CreateOrUpdateNewProjectEnvironment($input: ProjectEnvironmentInput!) {
    projectEnvironmentCreateUpdate(data: $input) {
      name
    }
  }
`;
export type CreateOrUpdateNewProjectEnvironmentMutationFn = Apollo.MutationFunction<
  CreateOrUpdateNewProjectEnvironmentMutation,
  CreateOrUpdateNewProjectEnvironmentMutationVariables
>;

/**
 * __useCreateOrUpdateNewProjectEnvironmentMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateNewProjectEnvironmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateNewProjectEnvironmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateNewProjectEnvironmentMutation, { data, loading, error }] = useCreateOrUpdateNewProjectEnvironmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateNewProjectEnvironmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrUpdateNewProjectEnvironmentMutation,
    CreateOrUpdateNewProjectEnvironmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateOrUpdateNewProjectEnvironmentMutation,
    CreateOrUpdateNewProjectEnvironmentMutationVariables
  >(CreateOrUpdateNewProjectEnvironmentDocument, options);
}
export type CreateOrUpdateNewProjectEnvironmentMutationHookResult = ReturnType<
  typeof useCreateOrUpdateNewProjectEnvironmentMutation
>;
export type CreateOrUpdateNewProjectEnvironmentMutationResult =
  Apollo.MutationResult<CreateOrUpdateNewProjectEnvironmentMutation>;
export type CreateOrUpdateNewProjectEnvironmentMutationOptions = Apollo.BaseMutationOptions<
  CreateOrUpdateNewProjectEnvironmentMutation,
  CreateOrUpdateNewProjectEnvironmentMutationVariables
>;
export const RemoveProjectEnvironmentDocument = gql`
  mutation RemoveProjectEnvironment($input: IDInput!) {
    projectEnvironmentDelete(data: $input) {
      message
    }
  }
`;
export type RemoveProjectEnvironmentMutationFn = Apollo.MutationFunction<
  RemoveProjectEnvironmentMutation,
  RemoveProjectEnvironmentMutationVariables
>;

/**
 * __useRemoveProjectEnvironmentMutation__
 *
 * To run a mutation, you first call `useRemoveProjectEnvironmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectEnvironmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectEnvironmentMutation, { data, loading, error }] = useRemoveProjectEnvironmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveProjectEnvironmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveProjectEnvironmentMutation,
    RemoveProjectEnvironmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveProjectEnvironmentMutation,
    RemoveProjectEnvironmentMutationVariables
  >(RemoveProjectEnvironmentDocument, options);
}
export type RemoveProjectEnvironmentMutationHookResult = ReturnType<
  typeof useRemoveProjectEnvironmentMutation
>;
export type RemoveProjectEnvironmentMutationResult =
  Apollo.MutationResult<RemoveProjectEnvironmentMutation>;
export type RemoveProjectEnvironmentMutationOptions = Apollo.BaseMutationOptions<
  RemoveProjectEnvironmentMutation,
  RemoveProjectEnvironmentMutationVariables
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
    $pagination: PaginationInput
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
  baseOptions?: Apollo.QueryHookOptions<
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
export const CreateNewProjectIntegrationDocument = gql`
  mutation CreateNewProjectIntegration($input: ProjectIntegrationInput!) {
    projectIntegrationCreateUpdate(data: $input) {
      name
    }
  }
`;
export type CreateNewProjectIntegrationMutationFn = Apollo.MutationFunction<
  CreateNewProjectIntegrationMutation,
  CreateNewProjectIntegrationMutationVariables
>;

/**
 * __useCreateNewProjectIntegrationMutation__
 *
 * To run a mutation, you first call `useCreateNewProjectIntegrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewProjectIntegrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewProjectIntegrationMutation, { data, loading, error }] = useCreateNewProjectIntegrationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNewProjectIntegrationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNewProjectIntegrationMutation,
    CreateNewProjectIntegrationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNewProjectIntegrationMutation,
    CreateNewProjectIntegrationMutationVariables
  >(CreateNewProjectIntegrationDocument, options);
}
export type CreateNewProjectIntegrationMutationHookResult = ReturnType<
  typeof useCreateNewProjectIntegrationMutation
>;
export type CreateNewProjectIntegrationMutationResult =
  Apollo.MutationResult<CreateNewProjectIntegrationMutation>;
export type CreateNewProjectIntegrationMutationOptions = Apollo.BaseMutationOptions<
  CreateNewProjectIntegrationMutation,
  CreateNewProjectIntegrationMutationVariables
>;
export const FetchHistoryLogsDocument = gql`
  query FetchHistoryLogs($filters: LogFilter, $pagination: PaginationInput) {
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
  baseOptions?: Apollo.QueryHookOptions<FetchHistoryLogsQuery, FetchHistoryLogsQueryVariables>,
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
export const FetchProjectIntegrationsDocument = gql`
  query FetchProjectIntegrations($data: IDInput!, $filters: ProjectIntegrationsPageFilter) {
    projectIntegrationPage(data: $data, filters: $filters) {
      gitGroupId
      slackChannels {
        id
        template {
          label
          prefix
        }
        channelId
        createdAt
        channelUrl
        templateName
      }
    }
  }
`;

/**
 * __useFetchProjectIntegrationsQuery__
 *
 * To run a query within a React component, call `useFetchProjectIntegrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectIntegrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectIntegrationsQuery({
 *   variables: {
 *      data: // value for 'data'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useFetchProjectIntegrationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchProjectIntegrationsQuery,
    FetchProjectIntegrationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchProjectIntegrationsQuery, FetchProjectIntegrationsQueryVariables>(
    FetchProjectIntegrationsDocument,
    options,
  );
}
export function useFetchProjectIntegrationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchProjectIntegrationsQuery,
    FetchProjectIntegrationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchProjectIntegrationsQuery, FetchProjectIntegrationsQueryVariables>(
    FetchProjectIntegrationsDocument,
    options,
  );
}
export type FetchProjectIntegrationsQueryHookResult = ReturnType<
  typeof useFetchProjectIntegrationsQuery
>;
export type FetchProjectIntegrationsLazyQueryHookResult = ReturnType<
  typeof useFetchProjectIntegrationsLazyQuery
>;
export type FetchProjectIntegrationsQueryResult = Apollo.QueryResult<
  FetchProjectIntegrationsQuery,
  FetchProjectIntegrationsQueryVariables
>;
export const FetchCreatedProjectSlackChannelsDocument = gql`
  query FetchCreatedProjectSlackChannels($data: IDInput!, $filters: ProjectIntegrationsPageFilter) {
    projectIntegrationPage(data: $data, filters: $filters) {
      slackChannels {
        id
      }
    }
  }
`;

/**
 * __useFetchCreatedProjectSlackChannelsQuery__
 *
 * To run a query within a React component, call `useFetchCreatedProjectSlackChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCreatedProjectSlackChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCreatedProjectSlackChannelsQuery({
 *   variables: {
 *      data: // value for 'data'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useFetchCreatedProjectSlackChannelsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchCreatedProjectSlackChannelsQuery,
    FetchCreatedProjectSlackChannelsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FetchCreatedProjectSlackChannelsQuery,
    FetchCreatedProjectSlackChannelsQueryVariables
  >(FetchCreatedProjectSlackChannelsDocument, options);
}
export function useFetchCreatedProjectSlackChannelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchCreatedProjectSlackChannelsQuery,
    FetchCreatedProjectSlackChannelsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FetchCreatedProjectSlackChannelsQuery,
    FetchCreatedProjectSlackChannelsQueryVariables
  >(FetchCreatedProjectSlackChannelsDocument, options);
}
export type FetchCreatedProjectSlackChannelsQueryHookResult = ReturnType<
  typeof useFetchCreatedProjectSlackChannelsQuery
>;
export type FetchCreatedProjectSlackChannelsLazyQueryHookResult = ReturnType<
  typeof useFetchCreatedProjectSlackChannelsLazyQuery
>;
export type FetchCreatedProjectSlackChannelsQueryResult = Apollo.QueryResult<
  FetchCreatedProjectSlackChannelsQuery,
  FetchCreatedProjectSlackChannelsQueryVariables
>;
export const ConnectProjectToGitDocument = gql`
  mutation ConnectProjectToGit($input: ProjectGitIntegrationInput!) {
    projectConnectToGit(data: $input) {
      id
    }
  }
`;
export type ConnectProjectToGitMutationFn = Apollo.MutationFunction<
  ConnectProjectToGitMutation,
  ConnectProjectToGitMutationVariables
>;

/**
 * __useConnectProjectToGitMutation__
 *
 * To run a mutation, you first call `useConnectProjectToGitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectProjectToGitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectProjectToGitMutation, { data, loading, error }] = useConnectProjectToGitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConnectProjectToGitMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConnectProjectToGitMutation,
    ConnectProjectToGitMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ConnectProjectToGitMutation, ConnectProjectToGitMutationVariables>(
    ConnectProjectToGitDocument,
    options,
  );
}
export type ConnectProjectToGitMutationHookResult = ReturnType<
  typeof useConnectProjectToGitMutation
>;
export type ConnectProjectToGitMutationResult = Apollo.MutationResult<ConnectProjectToGitMutation>;
export type ConnectProjectToGitMutationOptions = Apollo.BaseMutationOptions<
  ConnectProjectToGitMutation,
  ConnectProjectToGitMutationVariables
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
export const InviteUserToSlackChannelDocument = gql`
  mutation InviteUserToSlackChannel($input: SlackUserInviteInput!) {
    slackUserInvite(data: $input) {
      message
    }
  }
`;
export type InviteUserToSlackChannelMutationFn = Apollo.MutationFunction<
  InviteUserToSlackChannelMutation,
  InviteUserToSlackChannelMutationVariables
>;

/**
 * __useInviteUserToSlackChannelMutation__
 *
 * To run a mutation, you first call `useInviteUserToSlackChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteUserToSlackChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteUserToSlackChannelMutation, { data, loading, error }] = useInviteUserToSlackChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInviteUserToSlackChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InviteUserToSlackChannelMutation,
    InviteUserToSlackChannelMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    InviteUserToSlackChannelMutation,
    InviteUserToSlackChannelMutationVariables
  >(InviteUserToSlackChannelDocument, options);
}
export type InviteUserToSlackChannelMutationHookResult = ReturnType<
  typeof useInviteUserToSlackChannelMutation
>;
export type InviteUserToSlackChannelMutationResult =
  Apollo.MutationResult<InviteUserToSlackChannelMutation>;
export type InviteUserToSlackChannelMutationOptions = Apollo.BaseMutationOptions<
  InviteUserToSlackChannelMutation,
  InviteUserToSlackChannelMutationVariables
>;
