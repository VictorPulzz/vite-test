import clsx from 'clsx';
import React, { FC, ReactNode, useMemo } from 'react';

import { ROUTES } from '~/constants/routes';
import { useUserProfile } from '~/store/hooks';
import logo from '~/view/assets/images/logo.svg';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Sidebar } from '~/view/ui/components/common/Sidebar';

interface Props {
  children: ReactNode;
  contentClassName?: string;
}

const navItems = [
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
    title: 'Roles & Pemissions',
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
];

export const SidebarLayout: FC<Props> = ({ children, contentClassName }) => {
  const profile = useUserProfile();

  const user = useMemo(
    () => ({
      fullName: profile.fullName ?? '',
      photo: profile.photo?.url || photoPlaceholder,
      email: profile.email,
    }),
    [profile],
  );

  return (
    <div className="flex flex-1">
      <Sidebar items={navItems} logo={logo} user={user} />
      <div className={clsx('flex flex-1 flex-col', contentClassName)}>{children}</div>
    </div>
  );
};
