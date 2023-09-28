import { Tab, Tabs } from '@appello/web-ui';
import React, { FC } from 'react';
import { generatePath, Outlet } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

interface Props {
  userId: number;
}

export const UserDetailsTabs: FC<Props> = ({ userId }) => {
  const { canReadUserDocs, canReadUserHistory } = useUserPermissions();

  const tabsItems: (Tab | false)[] = [
    {
      title: 'Projects',
      element: <Outlet />,
      path: generatePath(ROUTES.USER_DETAILS, { id: userId }),
    },
    canReadUserDocs && {
      title: 'Docs',
      element: <Outlet />,
      path: generatePath(ROUTES.USER_DETAILS_DOCUMENTS, { id: userId }),
    },
    canReadUserHistory && {
      title: 'History',
      element: <Outlet />,
      path: generatePath(ROUTES.USER_DETAILS_HISTORY, { id: userId }),
    },
  ];

  return (
    <div className="shadow-4 bg-white rounded-md flex-auto">
      <Tabs
        className="pt-3"
        contentClassName="p-7"
        items={tabsItems.filter((tab): tab is Tab => !!tab)}
      />
    </div>
  );
};
