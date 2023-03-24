import { useMemo } from 'react';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { SidebarItem } from '~/view/ui/components/common/Sidebar';

export function useSidebarItems(): SidebarItem[] {
  const canEditPermissions = useHasAccess(Permission.EDIT_PERMISSIONS);

  const hiddenRoutes = useMemo(
    () => [!canEditPermissions && ROUTES.ROLES_AND_PERMISSIONS].filter(Boolean),
    [canEditPermissions],
  );

  const navItems = useMemo(
    () => [
      {
        title: 'Dashboard',
        icon: 'dashboard',
        link: ROUTES.HOME,
      },
      {
        title: 'Documents',
        icon: 'documents',
        link: ROUTES.DOCUMENTS,
      },
      {
        title: 'Projects',
        icon: 'projects',
        link: ROUTES.PROJECTS,
      },
      {
        title: 'Users',
        icon: 'users',
        link: ROUTES.USERS,
      },
      {
        title: 'Repositories',
        icon: 'repositories',
        link: ROUTES.REPOSITORIES,
      },
      {
        title: 'Requests',
        icon: 'requests',
        link: ROUTES.REQUESTS,
      },
      {
        title: 'Roles & Permissions',
        icon: 'key',
        link: ROUTES.ROLES_AND_PERMISSIONS,
      },
      {
        title: 'Settings',
        icon: 'settings',
        link: ROUTES.SETTINGS,
        items: [
          {
            title: 'General',
            link: ROUTES.SETTINGS,
          },
          {
            title: 'Security',
            link: ROUTES.SETTINGS_SECURITY,
          },
        ],
      },
    ],
    [],
  );

  return useMemo(
    () => navItems.filter(({ link }) => !hiddenRoutes.includes(link)),
    [navItems, hiddenRoutes],
  );
}
