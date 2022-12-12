import { UserAuth } from '@appello/common/lib/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserProfileModel } from '~/models/user';
import { userApi } from '~/services/rtkQuery/user';
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
  extraReducers(builder) {
    builder.addMatcher(userApi.endpoints.signIn.matchFulfilled, (state, { payload }) => {
      state.profile = payload.user;
      state.auth = {
        refresh: payload.refresh,
        access: payload.access,
      };
    });
  },
});

export const signOut = createAsyncThunk(`${userSlice.name}/signOut`, async (_, { dispatch }) => {
  dispatch(resetStore());
});

export const userReducer = userSlice.reducer;
export const { setAuth, setUser } = userSlice.actions;
