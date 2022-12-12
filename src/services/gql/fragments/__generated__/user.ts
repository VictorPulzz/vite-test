/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
export type AuthorizedUserFragment = {
  __typename?: 'UserType';
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
};

export const AuthorizedUserFragmentDoc = gql`
  fragment AuthorizedUser on UserType {
    email
    firstName
    lastName
    phone
  }
`;
