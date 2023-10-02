import { SidebarItem } from '@appello/web-ui';
import { useMemo } from 'react';

import { SALES_AI_URL } from '~/constants/env';
import { ROUTES } from '~/constants/routes';
import { useAppSelector } from '~/store/hooks';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

export function useSidebarItems(): SidebarItem[] {
  const auth = useAppSelector(state => state.user.auth);
  const SALES_AI_LINK = `${SALES_AI_URL}?access=${auth?.access}&refresh=${auth?.refresh}`;

  const {
    canReadUsersList,
    canReadProjectsList,
    canReadReposList,
    canWritePermissions,
    canWriteAdminSettings,
    canReadDocuments,
    canReadLeads,
  } = useUserPermissions();

  const hiddenRoutes = useMemo(
    () =>
      [
        !canReadDocuments && ROUTES.DOCUMENTS,
        !canReadUsersList && ROUTES.USERS,
        !canReadProjectsList && ROUTES.PROJECTS,
        !canReadReposList && ROUTES.REPOSITORIES,
        !canWritePermissions && ROUTES.ROLES_AND_PERMISSIONS,
        !canWriteAdminSettings && ROUTES.ADMIN_SETTINGS,
        !canReadLeads && SALES_AI_LINK,
      ].filter(Boolean),
    [
      SALES_AI_LINK,
      canReadDocuments,
      canReadLeads,
      canReadProjectsList,
      canReadReposList,
      canReadUsersList,
      canWriteAdminSettings,
      canWritePermissions,
    ],
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
            link: ROUTES.ADMIN_SETTINGS,
          },
          {
            title: 'Document templates',
            link: ROUTES.ADMIN_SETTINGS_DOCUMENT_TEMPLATES,
          },
          {
            title: 'Projects',
            link: ROUTES.ADMIN_SETTINGS_PROJECTS,
          },
          {
            title: 'Report templates',
            link: ROUTES.ADMIN_SETTINGS_REPORT_TEMPLATES,
          },
        ],
      },
      {
        title: 'Sales AI',
        icon: 'ai',
        link: SALES_AI_LINK,
      },
    ],
    [SALES_AI_LINK],
  );

  return useMemo(
    () => navItems.filter(({ link }) => !hiddenRoutes.includes(link)),
    [navItems, hiddenRoutes],
  );
}
