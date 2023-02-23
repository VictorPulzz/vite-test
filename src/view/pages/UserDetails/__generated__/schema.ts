/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchUserDetailsQueryVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type FetchUserDetailsQuery = {
  __typename?: 'Query';
  userDetails: {
    __typename?: 'UserType';
    id?: string | null;
    fullName?: string | null;
    email: string;
    isActive?: boolean | null;
    contractType?: Types.ContractChoice | null;
    birthDate?: string | null;
    address?: string | null;
    photo?: { __typename?: 'ImageType'; url: string } | null;
    department?: { __typename?: 'DepartmentType'; name: string } | null;
    role?: { __typename?: 'RoleType'; name: string } | null;
  };
};

export const FetchUserDetailsDocument = gql`
  query FetchUserDetails($input: IDInput!) {
    userDetails(data: $input) {
      id
      fullName
      email
      photo {
        url
      }
      department {
        name
      }
      role {
        name
      }
      isActive
      contractType
      birthDate
      address
    }
  }
`;

/**
 * __useFetchUserDetailsQuery__
 *
 * To run a query within a React component, call `useFetchUserDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchUserDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<FetchUserDetailsQuery, FetchUserDetailsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchUserDetailsQuery, FetchUserDetailsQueryVariables>(
    FetchUserDetailsDocument,
    options,
  );
}
export function useFetchUserDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FetchUserDetailsQuery, FetchUserDetailsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchUserDetailsQuery, FetchUserDetailsQueryVariables>(
    FetchUserDetailsDocument,
    options,
  );
}
export type FetchUserDetailsQueryHookResult = ReturnType<typeof useFetchUserDetailsQuery>;
export type FetchUserDetailsLazyQueryHookResult = ReturnType<typeof useFetchUserDetailsLazyQuery>;
export type FetchUserDetailsQueryResult = Apollo.QueryResult<
  FetchUserDetailsQuery,
  FetchUserDetailsQueryVariables
>;
