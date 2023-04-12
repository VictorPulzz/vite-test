import React, { FC, useMemo } from 'react';

import { Permission } from '~/constants/permissions';
import { NoAccessMessage } from '~/view/components/NoAccessMessage';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { Docs } from '~/view/pages/ProjectDetails/components/Docs';
import { Tabs } from '~/view/ui/components/common/Tabs';

import { Projects } from './components/Projects';
import { UserHistory } from './components/UserHistory';
import styles from './styles.module.scss';

interface Props {
  userId: number;
}

export const UserDetailsTabs: FC<Props> = ({ userId }) => {
  const canReadUserDocs = useHasAccess(Permission.READ_USER_DOCS);
  const canReadUserHistory = useHasAccess(Permission.READ_USER_HISTORY);

  const UserDetailsTabs = useMemo(
    () => (
      <Tabs
        className={styles['tabs']}
        contentClassName={styles['tabs__body']}
        items={[
          {
            title: 'Projects',
            element: <Projects userId={userId} />,
          },
          {
            title: 'Docs',
            element: canReadUserDocs ? (
              <Docs userId={userId} />
            ) : (
              <NoAccessMessage className="h-[70vh]" />
            ),
          },
          {
            title: 'History',
            element: canReadUserHistory ? (
              <UserHistory userId={userId} />
            ) : (
              <NoAccessMessage className="h-[70vh]" />
            ),
          },
        ]}
      />
    ),
    [canReadUserDocs, canReadUserHistory, userId],
  );
  return <div className="shadow-4 bg-white rounded-md flex-auto">{UserDetailsTabs}</div>;
};