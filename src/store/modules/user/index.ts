import { Nullable } from '@appello/common';
import { UserAuth } from '@appello/services/dist/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserProfileModel } from '~/models/user';
import { gqlClient } from '~/services/gql';
import { resetStore } from '~/store/modules/app';

import { UserState } from './types';

export const initialState: UserState = {
  profile: null,
  auth: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Nullable<UserAuth>>) {
      state.auth = action.payload;
    },
    setUser(state, action: PayloadAction<Nullable<UserProfileModel>>) {
      state.profile = action.payload;
    },
  },
});

export const signOut = createAsyncThunk(`${userSlice.name}/signOut`, async (_, { dispatch }) => {
  dispatch(resetStore());
  await gqlClient.resetStore();
});

export const userReducer = userSlice.reducer;
export const { setAuth, setUser } = userSlice.actions;
