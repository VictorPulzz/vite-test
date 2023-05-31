/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import { AuthorizedUserFragmentDoc } from '../../../../services/gql/fragments/__generated__/user';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SignInMutationVariables = Types.Exact<{
  data: Types.LoginInput;
}>;

export type SignInMutation = {
  login: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      fullName: string;
      photoThumbnail?: { url: string } | null;
      role?: { id: number; name: string; permissionsList: Array<string> } | null;
    };
  };
};

export const SignInDocument = gql`
  mutation SignIn($data: LoginInput!) {
    login(data: $data) {
      accessToken
      refreshToken
      user {
        ...AuthorizedUser
      }
    }
  }
  ${AuthorizedUserFragmentDoc}
`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
