import { rtkQuery } from '~/services/rtkQuery';
import { AuthResponse, SignInVariables } from '~/services/rtkQuery/user/types';

export const userApi = rtkQuery.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    signIn: builder.mutation<AuthResponse, SignInVariables>({
      query: data => ({
        url: '/token',
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const { useSignInMutation } = userApi;
