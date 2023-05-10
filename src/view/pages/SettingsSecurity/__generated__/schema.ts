/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PasswordChangeMutationVariables = Types.Exact<{
  data: Types.ChangePasswordInput;
}>;

export type PasswordChangeMutation = { passwordChange: { message: string } };

export const PasswordChangeDocument = gql`
  mutation PasswordChange($data: ChangePasswordInput!) {
    passwordChange(data: $data) {
      message
    }
  }
`;
export type PasswordChangeMutationFn = Apollo.MutationFunction<
  PasswordChangeMutation,
  PasswordChangeMutationVariables
>;

/**
 * __usePasswordChangeMutation__
 *
 * To run a mutation, you first call `usePasswordChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePasswordChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [passwordChangeMutation, { data, loading, error }] = usePasswordChangeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function usePasswordChangeMutation(
  baseOptions?: Apollo.MutationHookOptions<PasswordChangeMutation, PasswordChangeMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PasswordChangeMutation, PasswordChangeMutationVariables>(
    PasswordChangeDocument,
    options,
  );
}
export type PasswordChangeMutationHookResult = ReturnType<typeof usePasswordChangeMutation>;
export type PasswordChangeMutationResult = Apollo.MutationResult<PasswordChangeMutation>;
export type PasswordChangeMutationOptions = Apollo.BaseMutationOptions<
  PasswordChangeMutation,
  PasswordChangeMutationVariables
>;
