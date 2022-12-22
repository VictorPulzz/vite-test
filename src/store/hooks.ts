import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { UserProfileModel } from '~/models/user';

import { signOut } from './modules/user';
import type { AppDispatch, RootState } from './types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useUserProfile(): UserProfileModel {
  const profile = useAppSelector(state => state.user.profile);
  const dispatch = useAppDispatch();

  if (!profile) {
    dispatch(signOut());
    throw new Error('User profile is not defined');
  }

  return profile;
}
