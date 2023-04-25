/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchRequestsListQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.RequestFilter>;
  pagination: Types.PaginationInput;
  sort?: Types.InputMaybe<Array<Types.RequestSortFieldInput> | Types.RequestSortFieldInput>;
}>;

export type FetchRequestsListQuery = {
  requestList: {
    count: number;
    results: Array<{
      id: number;
      type: Types.RequestTypeChoice;
      description?: string | null;
      createdAt: string;
      dueDate?: string | null;
      status: Types.RequestStatusChoice;
      environment?: Types.ProjectEnvironmentChoice | null;
      integrationName?: string | null;
      repositoryType?: Types.RepositoryTypeChoice | null;
      assignedTo?: {
        id: string;
        email: string;
        fullName?: string | null;
        photo?: { url: string } | null;
      } | null;
      createdBy?: {
        id: string;
        email: string;
        fullName?: string | null;
        photo?: { url: string } | null;
      } | null;
      technologies?: Array<{ id: number; name: string }> | null;
    }>;
  };
};

export type FetchRequestDetailsQueryVariables = Types.Exact<{
  data: Types.IdInput;
}>;

export type FetchRequestDetailsQuery = {
  requestDetails: {
    id: number;
    type: Types.RequestTypeChoice;
    description?: string | null;
    createdAt: string;
    dueDate?: string | null;
    accessLevel?: Types.RepositoryAccessLevelChoice | null;
    status: Types.RequestStatusChoice;
    environment?: Types.ProjectEnvironmentChoice | null;
    integrationName?: string | null;
    repositoryType?: Types.RepositoryTypeChoice | null;
    assignedTo?: {
      id: string;
      fullName?: string | null;
      email: string;
      photo?: { url: string } | null;
    } | null;
    createdBy?: {
      id: string;
      fullName?: string | null;
      email: string;
      photo?: { url: string } | null;
    } | null;
    project?: { id: number; name: string } | null;
    repository?: { id: number; name?: string | null } | null;
    technologies?: Array<{ id: number; name: string }> | null;
  };
};

export type UpdateRequestMutationVariables = Types.Exact<{
  input: Types.RequestUpdateInput;
}>;

export type UpdateRequestMutation = { requestUpdate: { id: number } };

export const FetchRequestsListDocument = gql`
  query FetchRequestsList(
    $filters: RequestFilter
    $pagination: PaginationInput!
    $sort: [RequestSortFieldInput!]
  ) {
    requestList(filters: $filters, pagination: $pagination, sort: $sort) {
      results {
        id
        type
        description
        createdAt
        assignedTo {
          id
          photo {
            url
          }
          email
          fullName
        }
        createdBy {
          id
          photo {
            url
          }
          email
          fullName
        }
        createdAt
        dueDate
        status
        environment
        integrationName
        repositoryType
        technologies {
          id
          name
        }
      }
      count
    }
  }
`;

/**
 * __useFetchRequestsListQuery__
 *
 * To run a query within a React component, call `useFetchRequestsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchRequestsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchRequestsListQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFetchRequestsListQuery(
  baseOptions: Apollo.QueryHookOptions<FetchRequestsListQuery, FetchRequestsListQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchRequestsListQuery, FetchRequestsListQueryVariables>(
    FetchRequestsListDocument,
    options,
  );
}
export function useFetchRequestsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchRequestsListQuery,
    FetchRequestsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchRequestsListQuery, FetchRequestsListQueryVariables>(
    FetchRequestsListDocument,
    options,
  );
}
export type FetchRequestsListQueryHookResult = ReturnType<typeof useFetchRequestsListQuery>;
export type FetchRequestsListLazyQueryHookResult = ReturnType<typeof useFetchRequestsListLazyQuery>;
export type FetchRequestsListQueryResult = Apollo.QueryResult<
  FetchRequestsListQuery,
  FetchRequestsListQueryVariables
>;
export const FetchRequestDetailsDocument = gql`
  query FetchRequestDetails($data: IDInput!) {
    requestDetails(data: $data) {
      id
      type
      description
      createdAt
      assignedTo {
        id
        photo {
          url
        }
        fullName
        email
      }
      createdBy {
        id
        photo {
          url
        }
        fullName
        email
      }
      createdAt
      dueDate
      project {
        id
        name
      }
      repository {
        id
        name
      }
      accessLevel
      status
      environment
      integrationName
      repositoryType
      technologies {
        id
        name
      }
    }
  }
`;

/**
 * __useFetchRequestDetailsQuery__
 *
 * To run a query within a React component, call `useFetchRequestDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchRequestDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchRequestDetailsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFetchRequestDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<FetchRequestDetailsQuery, FetchRequestDetailsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchRequestDetailsQuery, FetchRequestDetailsQueryVariables>(
    FetchRequestDetailsDocument,
    options,
  );
}
export function useFetchRequestDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchRequestDetailsQuery,
    FetchRequestDetailsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchRequestDetailsQuery, FetchRequestDetailsQueryVariables>(
    FetchRequestDetailsDocument,
    options,
  );
}
export type FetchRequestDetailsQueryHookResult = ReturnType<typeof useFetchRequestDetailsQuery>;
export type FetchRequestDetailsLazyQueryHookResult = ReturnType<
  typeof useFetchRequestDetailsLazyQuery
>;
export type FetchRequestDetailsQueryResult = Apollo.QueryResult<
  FetchRequestDetailsQuery,
  FetchRequestDetailsQueryVariables
>;
export const UpdateRequestDocument = gql`
  mutation UpdateRequest($input: RequestUpdateInput!) {
    requestUpdate(data: $input) {
      id
    }
  }
`;
export type UpdateRequestMutationFn = Apollo.MutationFunction<
  UpdateRequestMutation,
  UpdateRequestMutationVariables
>;

/**
 * __useUpdateRequestMutation__
 *
 * To run a mutation, you first call `useUpdateRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRequestMutation, { data, loading, error }] = useUpdateRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateRequestMutation, UpdateRequestMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateRequestMutation, UpdateRequestMutationVariables>(
    UpdateRequestDocument,
    options,
  );
}
export type UpdateRequestMutationHookResult = ReturnType<typeof useUpdateRequestMutation>;
export type UpdateRequestMutationResult = Apollo.MutationResult<UpdateRequestMutation>;
export type UpdateRequestMutationOptions = Apollo.BaseMutationOptions<
  UpdateRequestMutation,
  UpdateRequestMutationVariables
>;
