import { useMemo } from 'react';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { SidebarItem } from '@appello/web-ui';

export function useSidebarItems(): SidebarItem[] {
  const canEditPermissions = useHasAccess(Permission.EDIT_PERMISSIONS);
  const canEditAdminSettings = useHasAccess(Permission.EDIT_ADMIN_SETTINGS);

  const hiddenRoutes = useMemo(
    () =>
      [
        !canEditPermissions && ROUTES.ROLES_AND_PERMISSIONS,
        !canEditAdminSettings && ROUTES.ADMIN_SETTINGS,
      ].filter(Boolean),
    [canEditAdminSettings, canEditPermissions],
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
      {
        title: 'Admin settings',
        icon: 'adminSettings',
        link: ROUTES.ADMIN_SETTINGS,
        items: [
          {
            title: 'Integrations',
            link: ROUTES.ADMIN_SETTINGS_INTEGRATIONS,
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
