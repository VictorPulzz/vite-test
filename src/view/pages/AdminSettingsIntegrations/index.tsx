import { Tabs } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';

import { TabLayout } from '~/view/layouts/TabLayout';

import { SlackTabElement } from './components/SlackTabElement';
import styles from './styles.module.scss';

export const AdminSettingsIntegrationsPage: FC = () => {
  const adminSettingsIntegrationsTabs = useMemo(
    () => (
      <Tabs
        className={styles['tabs']}
        contentClassName={styles['tabs__body']}
        items={[
          {
            title: 'Slack',
            element: (
              <div className="h-full p-7">
                <SlackTabElement />
              </div>
            ),
          },
        ]}
      />
    ),
    [],
  );

  return (
    <TabLayout tabs={adminSettingsIntegrationsTabs}>
      <div className="flex items-end justify-between px-6 pt-6 bg-white">
        <div className="flex flex-col gap-[2px]">
          <h2 className="text-h4 font-bold">Integrations</h2>
        </div>
      </div>
    </TabLayout>
  );
};
