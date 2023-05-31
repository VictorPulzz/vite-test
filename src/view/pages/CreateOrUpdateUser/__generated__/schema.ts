/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOrUpdateUserMutationVariables = Types.Exact<{
  input: Types.UserInput;
}>;

export type CreateOrUpdateUserMutation = {
  userCreateUpdate: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address?: string | null;
    contractType?: Types.ContractChoice | null;
    birthDate?: string | null;
    isActive?: boolean | null;
    photoThumbnail?: { url: string } | null;
    department?: { id: number; name: string } | null;
    role?: { id: number; name: string } | null;
  };
};

export const CreateOrUpdateUserDocument = gql`
  mutation CreateOrUpdateUser($input: UserInput!) {
    userCreateUpdate(data: $input) {
      id
      photoThumbnail {
        url
      }
      firstName
      lastName
      email
      department {
        id
        name
      }
      role {
        id
        name
      }
      address
      contractType
      birthDate
      isActive
    }
  }
`;
export type CreateOrUpdateUserMutationFn = Apollo.MutationFunction<
  CreateOrUpdateUserMutation,
  CreateOrUpdateUserMutationVariables
>;

/**
 * __useCreateOrUpdateUserMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateUserMutation, { data, loading, error }] = useCreateOrUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrUpdateUserMutation,
    CreateOrUpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateOrUpdateUserMutation, CreateOrUpdateUserMutationVariables>(
    CreateOrUpdateUserDocument,
    options,
  );
}
export type CreateOrUpdateUserMutationHookResult = ReturnType<typeof useCreateOrUpdateUserMutation>;
export type CreateOrUpdateUserMutationResult = Apollo.MutationResult<CreateOrUpdateUserMutation>;
export type CreateOrUpdateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateOrUpdateUserMutation,
  CreateOrUpdateUserMutationVariables
>;
