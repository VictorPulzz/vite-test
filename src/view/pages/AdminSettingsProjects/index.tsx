import { Tabs } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';

import { TabLayout } from '~/view/layouts/TabLayout';

import { InitialUsersTab } from './components/InitialUsersTab';
import styles from './styles.module.scss';

export const AdminSettingsProjectsPage: FC = () => {
  const tabs = useMemo(
    () => (
      <Tabs
        className={styles['tabs']}
        contentClassName={styles['tabs__body']}
        items={[
          {
            title: 'Initial users',
            element: (
              <div className="h-full p-7">
                <InitialUsersTab />
              </div>
            ),
          },
        ]}
      />
    ),
    [],
  );

  return (
    <TabLayout tabs={tabs}>
      <div className="flex items-end justify-between px-6 pt-6 bg-white">
        <div className="flex flex-col gap-[2px]">
          <h2 className="text-h4 font-bold">Projects</h2>
        </div>
      </div>
    </TabLayout>
  );
};
