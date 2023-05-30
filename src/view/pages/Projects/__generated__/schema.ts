/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchProjectsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ProjectFilter>;
  pagination?: Types.InputMaybe<Types.PaginationInput>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type FetchProjectsQuery = {
  projectsList: {
    count: number;
    results: Array<{
      id: number;
      name: string;
      inCurrentTeam?: boolean | null;
      phase?: Types.ProjectPhaseChoice | null;
      PM?: Array<{ id: number; fullName: string; photo?: { url: string } | null }> | null;
      status?: { id: number; name: string } | null;
      platforms?: Array<{ id: number; name: string }> | null;
    }>;
  };
};

export type ChangeProjectStatusMutationVariables = Types.Exact<{
  input: Types.ProjectUpdateInput;
}>;

export type ChangeProjectStatusMutation = { projectUpdate: { id: number } };

export const FetchProjectsDocument = gql`
  query FetchProjects($filters: ProjectFilter, $pagination: PaginationInput, $search: String) {
    projectsList(filters: $filters, pagination: $pagination, search: $search) {
      results {
        id
        name
        PM {
          id
          photo {
            url
          }
          fullName
        }
        status {
          id
          name
        }
        platforms {
          id
          name
        }
        inCurrentTeam
        phase
      }
      count
    }
  }
`;

/**
 * __useFetchProjectsQuery__
 *
 * To run a query within a React component, call `useFetchProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProjectsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useFetchProjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<FetchProjectsQuery, FetchProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchProjectsQuery, FetchProjectsQueryVariables>(
    FetchProjectsDocument,
    options,
  );
}
export function useFetchProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchProjectsQuery, FetchProjectsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchProjectsQuery, FetchProjectsQueryVariables>(
    FetchProjectsDocument,
    options,
  );
}
export type FetchProjectsQueryHookResult = ReturnType<typeof useFetchProjectsQuery>;
export type FetchProjectsLazyQueryHookResult = ReturnType<typeof useFetchProjectsLazyQuery>;
export type FetchProjectsQueryResult = Apollo.QueryResult<
  FetchProjectsQuery,
  FetchProjectsQueryVariables
>;
export const ChangeProjectStatusDocument = gql`
  mutation ChangeProjectStatus($input: ProjectUpdateInput!) {
    projectUpdate(data: $input) {
      id
    }
  }
`;
export type ChangeProjectStatusMutationFn = Apollo.MutationFunction<
  ChangeProjectStatusMutation,
  ChangeProjectStatusMutationVariables
>;

/**
 * __useChangeProjectStatusMutation__
 *
 * To run a mutation, you first call `useChangeProjectStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProjectStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProjectStatusMutation, { data, loading, error }] = useChangeProjectStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeProjectStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeProjectStatusMutation,
    ChangeProjectStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ChangeProjectStatusMutation, ChangeProjectStatusMutationVariables>(
    ChangeProjectStatusDocument,
    options,
  );
}
export type ChangeProjectStatusMutationHookResult = ReturnType<
  typeof useChangeProjectStatusMutation
>;
export type ChangeProjectStatusMutationResult = Apollo.MutationResult<ChangeProjectStatusMutation>;
export type ChangeProjectStatusMutationOptions = Apollo.BaseMutationOptions<
  ChangeProjectStatusMutation,
  ChangeProjectStatusMutationVariables
>;
