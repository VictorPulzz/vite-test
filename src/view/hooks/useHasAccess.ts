import { useMemo } from 'react';

import { Permission } from '~/constants/permissions';
import { useAppSelector } from '~/store/hooks';

export function useHasAccess(permission: Permission | Permission[]): boolean {
  const permissions = useAppSelector(state => state.user.profile?.role?.permissionsList ?? []);

  return useMemo(() => {
    if (Array.isArray(permission)) {
      return permissions.some(p => permission.includes(p as Permission));
    }
    return permissions.includes(permission);
  }, [permission, permissions]);
}
