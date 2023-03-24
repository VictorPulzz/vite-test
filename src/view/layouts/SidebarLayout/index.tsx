import clsx from 'clsx';
import React, { FC, ReactNode, useMemo } from 'react';

import { useUserProfile } from '~/store/hooks';
import logo from '~/view/assets/images/logo.svg';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Sidebar } from '~/view/ui/components/common/Sidebar';

import { useSidebarItems } from './hooks/useSidebarItems';

interface Props {
  children: ReactNode;
  contentClassName?: string;
}

export const SidebarLayout: FC<Props> = ({ children, contentClassName }) => {
  const profile = useUserProfile();
  const navItems = useSidebarItems();

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
