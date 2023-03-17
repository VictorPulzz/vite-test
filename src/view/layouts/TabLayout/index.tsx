import React, { FC, ReactNode } from 'react';

import { SidebarLayout } from '~/view/layouts/SidebarLayout';

interface TabLayoutProps {
  tabs: ReactNode;
  children: ReactNode;
}

export const TabLayout: FC<TabLayoutProps> = ({ tabs, children }) => {
  return (
    <SidebarLayout contentClassName="bg-gray-7">
      {children}
      {tabs}
    </SidebarLayout>
  );
};
