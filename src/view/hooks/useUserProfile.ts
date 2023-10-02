import { UserRole } from '~/constants/roles';
import { UserProfileModel } from '~/models/user';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { signOut } from '~/store/modules/user';

interface UseUserProfileReturn {
  profile: UserProfileModel;
  userRole: string;
  isAdminOrPM: boolean;
}

export function useUserProfile(): UseUserProfileReturn {
  const profile = useAppSelector(state => state.user.profile);
  const userRole = profile?.role?.name as UserRole;
  const dispatch = useAppDispatch();

  if (!profile) {
    dispatch(signOut());
    throw new Error('User profile is not defined');
  }

  return {
    profile,
    userRole,
    isAdminOrPM: [UserRole.ADMIN, UserRole.PM].includes(userRole),
  };
}
