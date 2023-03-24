/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
export type AuthorizedUserFragment = {
  __typename?: 'UserType';
  id?: string | null;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  photo?: { __typename?: 'ImageType'; fileName: string; size: number; url: string } | null;
  role?: { __typename?: 'RoleType'; name: string; permissionsList: Array<string> } | null;
};

export const AuthorizedUserFragmentDoc = gql`
  fragment AuthorizedUser on UserType {
    id
    email
    firstName
    lastName
    fullName
    photo {
      fileName
      size
      url
    }
    role {
      name
      permissionsList
    }
  }
`;
