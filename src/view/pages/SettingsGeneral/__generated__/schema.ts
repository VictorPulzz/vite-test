/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import { AuthorizedUserFragmentDoc } from '../../../../services/gql/fragments/__generated__/user';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
  me: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    photoThumbnail?: { url: string } | null;
  };
};

export type ProfileUpdateMutationVariables = Types.Exact<{
  data: Types.ProfileInput;
}>;

export type ProfileUpdateMutation = {
  meUpdate: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    photoThumbnail?: { url: string } | null;
    role?: { id: number; name: string; permissionsList: Array<string> } | null;
  };
};

export const MeDocument = gql`
  query Me {
    me {
      id
      firstName
      lastName
      email
      phone
      address
      photoThumbnail {
        url
      }
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProfileUpdateDocument = gql`
  mutation ProfileUpdate($data: ProfileInput!) {
    meUpdate(data: $data) {
      ...AuthorizedUser
    }
  }
  ${AuthorizedUserFragmentDoc}
`;
export type ProfileUpdateMutationFn = Apollo.MutationFunction<
  ProfileUpdateMutation,
  ProfileUpdateMutationVariables
>;

/**
 * __useProfileUpdateMutation__
 *
 * To run a mutation, you first call `useProfileUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfileUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profileUpdateMutation, { data, loading, error }] = useProfileUpdateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useProfileUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<ProfileUpdateMutation, ProfileUpdateMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ProfileUpdateMutation, ProfileUpdateMutationVariables>(
    ProfileUpdateDocument,
    options,
  );
}
export type ProfileUpdateMutationHookResult = ReturnType<typeof useProfileUpdateMutation>;
export type ProfileUpdateMutationResult = Apollo.MutationResult<ProfileUpdateMutation>;
export type ProfileUpdateMutationOptions = Apollo.BaseMutationOptions<
  ProfileUpdateMutation,
  ProfileUpdateMutationVariables
>;
