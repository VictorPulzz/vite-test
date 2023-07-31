/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
export type AuthorizedUserFragment = {
  id: number;
  email: string;
  firstName: string;
  lastName?: string | null;
  fullName: string;
  photoThumbnail?: { url: string } | null;
  role?: { id: number; name: string; permissionsList: Array<string> } | null;
};

export const AuthorizedUserFragmentDoc = gql`
  fragment AuthorizedUser on ProfileType {
    id
    email
    firstName
    lastName
    fullName
    photoThumbnail {
      url
    }
    role {
      id
      name
      permissionsList
    }
  }
`;
