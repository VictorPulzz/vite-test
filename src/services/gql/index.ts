import { createGqlClient, GqlClientContext } from '@appello/services';
import { toast } from 'react-hot-toast';

import { API_URL } from '~/constants/env';
import { store } from '~/store';
import { setAuth, signOut } from '~/store/modules/user';

import fragmentTypes from './__generated__/fragmentTypes.json';
import {
  RefreshTokensDocument,
  RefreshTokensMutation,
  RefreshTokensMutationVariables,
} from './__generated__/schema';

export const gqlClient = createGqlClient({
  serverUrl: API_URL,
  cache: {
    possibleTypes: fragmentTypes.possibleTypes,
    typePolicies: {
      Query: {
        fields: {
          notificationList: { merge: true },
          reportTemplateList: { merge: true },
          userGlossaryList: { merge: true },
        },
      },
    },
  },
  getRefreshToken: () => store.getState().user.auth?.refresh,
  getAccessToken: () => store.getState().user.auth?.access,
  refreshTokens: async (client, context) => {
    const refreshToken = store.getState().user.auth?.refresh;
    if (!refreshToken) {
      return null;
    }

    const { data } = await client.mutate<
      RefreshTokensMutation,
      RefreshTokensMutationVariables,
      GqlClientContext
    >({
      mutation: RefreshTokensDocument,
      variables: {
        input: { refreshToken },
      },
      context,
    });

    return data?.tokens ?? null;
  },
  onTokenRefreshSuccess: data => store.dispatch(setAuth(data)),
  onTokenRefreshError: () => store.dispatch(signOut()),
  onUnknownError: toast.error,
});
