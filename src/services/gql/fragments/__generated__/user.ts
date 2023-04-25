/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
export type AuthorizedUserFragment = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  photo?: { fileName: string; size: number; url: string } | null;
  role?: { id: number; name: string; permissionsList: Array<string> } | null;
};

export const AuthorizedUserFragmentDoc = gql`
  fragment AuthorizedUser on ProfileType {
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
      id
      name
      permissionsList
    }
  }
`;
