import { Tab, Tabs } from '@appello/web-ui';
import React, { FC } from 'react';
import { generatePath, Outlet } from 'react-router-dom';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { useHasAccess } from '~/view/hooks/useHasAccess';

import styles from './styles.module.scss';

interface Props {
  userId: number;
}

export const UserDetailsTabs: FC<Props> = ({ userId }) => {
  const canReadUserDocs = useHasAccess(Permission.READ_USER_DOCS);
  const canReadUserHistory = useHasAccess(Permission.READ_USER_HISTORY);

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
        className={styles['tabs']}
        contentClassName={styles['tabs__body']}
        items={tabsItems.filter((tab): tab is Tab => !!tab)}
      />
    </div>
  );
};
