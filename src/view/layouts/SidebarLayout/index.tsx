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
    title: 'Emloyees',
    icon: 'emloyees',
    link: ROUTES.EMPLOYEES,
  },
  {
    title: 'Repositories',
    icon: 'repositories',
    link: ROUTES.REPOSITORIES,
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
  // TODO change fullName and photo field later
  const user = useMemo(
    () => ({
      fullName: profile.email,
      photo: photoPlaceholder,
      email: profile.email,
      photoPlaceholder,
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
