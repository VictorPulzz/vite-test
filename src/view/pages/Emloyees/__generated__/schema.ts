/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchEmloyeesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchEmloyeesQuery = {
  __typename?: 'Query';
  employeesList: Array<{
    __typename?: 'EmployeeType';
    firstName?: string | null;
    lastName?: string | null;
    fullName: string;
    email: string;
    isActive?: boolean | null;
  }>;
};

export const FetchEmloyeesDocument = gql`
  query FetchEmloyees {
    employeesList {
      firstName
      lastName
      fullName
      email
      isActive
    }
  }
`;

/**
 * __useFetchEmloyeesQuery__
 *
 * To run a query within a React component, call `useFetchEmloyeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchEmloyeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchEmloyeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchEmloyeesQuery(
  baseOptions?: Apollo.QueryHookOptions<FetchEmloyeesQuery, FetchEmloyeesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchEmloyeesQuery, FetchEmloyeesQueryVariables>(
    FetchEmloyeesDocument,
    options,
  );
}
export function useFetchEmloyeesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchEmloyeesQuery, FetchEmloyeesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchEmloyeesQuery, FetchEmloyeesQueryVariables>(
    FetchEmloyeesDocument,
    options,
  );
}
export type FetchEmloyeesQueryHookResult = ReturnType<typeof useFetchEmloyeesQuery>;
export type FetchEmloyeesLazyQueryHookResult = ReturnType<typeof useFetchEmloyeesLazyQuery>;
export type FetchEmloyeesQueryResult = Apollo.QueryResult<
  FetchEmloyeesQuery,
  FetchEmloyeesQueryVariables
>;
