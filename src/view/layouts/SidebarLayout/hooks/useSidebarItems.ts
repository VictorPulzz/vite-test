import { SidebarItem } from '@appello/web-ui';
import { useMemo } from 'react';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { useHasAccess } from '~/view/hooks/useHasAccess';

export function useSidebarItems(): SidebarItem[] {
  const canReadWriteInternalDocuments = useHasAccess(Permission.READ_WRITE_INTERNAL_DOCS);
  const canReadWriteClientsDocuments = useHasAccess(Permission.READ_WRITE_CLIENTS_DOCS);
  const canReadUsersList = useHasAccess(Permission.READ_USERS_LIST);
  const canReadProjectsList = useHasAccess(Permission.READ_PROJECTS_LIST);
  const canReadReposList = useHasAccess(Permission.READ_REPOS_LIST);
  const canWritePermissions = useHasAccess(Permission.WRITE_PERMISSIONS);
  const canWriteAdminSettings = useHasAccess(Permission.WRITE_ADMIN_SETTINGS);
  const canReadDocuments = canReadWriteInternalDocuments || canReadWriteClientsDocuments;
  const canReadLeads = useHasAccess(Permission.READ_LEADS);

  const hiddenRoutes = useMemo(
    () =>
      [
        !canReadDocuments && ROUTES.DOCUMENTS,
        !canReadUsersList && ROUTES.USERS,
        !canReadProjectsList && ROUTES.PROJECTS,
        !canReadReposList && ROUTES.REPOSITORIES,
        !canWritePermissions && ROUTES.ROLES_AND_PERMISSIONS,
        !canWriteAdminSettings && ROUTES.ADMIN_SETTINGS,
        !canReadLeads && ROUTES.LEADS,
      ].filter(Boolean),
    [
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
        ],
      },
      {
        title: 'Leads',
        icon: 'ai',
        link: ROUTES.LEADS,
      },
    ],
    [],
  );

  return useMemo(
    () => navItems.filter(({ link }) => !hiddenRoutes.includes(link)),
    [navItems, hiddenRoutes],
  );
}
