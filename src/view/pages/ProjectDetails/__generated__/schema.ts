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
    phase: Types.ProjectPhaseChoice;
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
    results: Array<{ __typename?: 'UserType'; id?: string | null; fullName: string }>;
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
      fullName: string;
      email: string;
      photo?: { __typename?: 'ImageType'; url: string } | null;
      role?: { __typename?: 'RoleType'; name: string } | null;
    }>;
    otherContrubutors: Array<{
      __typename?: 'UserType';
      id?: string | null;
      fullName: string;
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
    user: { __typename?: 'UserType'; fullName: string };
  };
};

export type RemoveProjectMemberMutationVariables = Types.Exact<{
  input: Types.ProjectMemberInput;
}>;

export type RemoveProjectMemberMutation = {
  __typename?: 'Mutation';
  projectDeleteMember: { __typename?: 'MessageType'; message: string };
};

export const FetchProjectDetailsDocument = gql`
  query FetchProjectDetails($data: IDInput!) {
    project(data: $data) {
      id
      name
      phase
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
        fullName
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
