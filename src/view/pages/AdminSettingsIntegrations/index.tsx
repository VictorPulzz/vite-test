import { Tabs } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';

import { TabLayout } from '~/view/layouts/TabLayout';

import { BitbucketTabElement } from './components/BitbucketTabElement';
import { SlackTabElement } from './components/SlackTabElement';

export const AdminSettingsIntegrationsPage: FC = () => {
  const adminSettingsIntegrationsTabs = useMemo(
    () => (
      <Tabs
        items={[
          {
            title: 'Slack',
            element: (
              <div className="h-full p-7">
                <SlackTabElement />
              </div>
            ),
          },
          {
            title: 'Bitbucket',
            element: (
              <div className="h-full p-7">
                <BitbucketTabElement />
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
