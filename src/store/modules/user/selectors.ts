import { createSelector, Selector } from '@reduxjs/toolkit';

import { RootState } from '~/store/types';

import { UserState } from './types';

const selectSelf: Selector<RootState, UserState> = state => state.user;

export const selectIsAuth = createSelector(selectSelf, state => !!state.auth);

export const selectProfile = createSelector(selectSelf, state => {
  if (!state.profile) {
    throw new Error('User is not authenticated');
  }

  return state.profile;
});
