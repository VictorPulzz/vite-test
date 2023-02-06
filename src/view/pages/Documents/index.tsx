import React, { FC, useMemo } from 'react';

import { TabLayout } from '~/view/layouts/TabLayout';
import { Docs } from '~/view/pages/ProjectDetails/components/Docs';
import styles from '~/view/pages/ProjectDetails/styles.module.scss';
import { Tabs } from '~/view/ui/components/common/Tabs';

export const DocumentsPage: FC = () => {
  const DocumentTabs = useMemo(
    () => (
      <Tabs
        className={styles['tabs']}
        contentClassName="bg-gray-7 p-7 flex-auto"
        items={[
          {
            title: 'Internal',
            element: <Docs />,
          },
          {
            title: 'Clients',
            element: <Docs />,
          },
        ]}
      />
    ),
    [],
  );
  return (
    <TabLayout tabs={DocumentTabs}>
      <div className="bg-white">
        <h2 className="text-h4 font-bold ml-6 mt-2">Documents</h2>
      </div>
    </TabLayout>
  );
};
