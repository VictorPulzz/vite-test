import React, { FC } from 'react';

import comingSoon from '~/view/assets/images/coming-soon.svg';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

export const DashboardPage: FC = () => {
  return (
    <SidebarLayout contentClassName="p-6">
      {/* <div className="flex justify-between items-center">
        <h1 className="text-h4">Dashboard</h1>
      </div> */}
      <div className="flex justify-center items-center flex-auto ">
        <img alt="feature" src={comingSoon} />
      </div>
    </SidebarLayout>
  );
};
