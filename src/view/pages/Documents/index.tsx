import React, { FC, useMemo, useState } from 'react';

import { TabLayout } from '~/view/layouts/TabLayout';
import { Docs } from '~/view/pages/ProjectDetails/components/Docs';
import { AddDocumentButton } from '~/view/pages/ProjectDetails/components/Docs/components/AddDocumentButton';
import styles from '~/view/pages/ProjectDetails/styles.module.scss';
import { Tabs } from '~/view/ui/components/common/Tabs';

export const DocumentsPage: FC = () => {
  const [docsCount, setDocsCount] = useState<number>(0);
  const [isInternal, setIsInternal] = useState<boolean>(false);

  const DocumentTabs = useMemo(
    () => (
      <Tabs
        className={styles['tabs']}
        contentClassName="bg-gray-7 p-7 flex-auto"
        items={[
          {
            title: 'Internal',
            element: <Docs isInternal setDocsCount={setDocsCount} setIsInternal={setIsInternal} />,
          },
          {
            title: 'Client',
            element: (
              <Docs isInternal={false} setDocsCount={setDocsCount} setIsInternal={setIsInternal} />
            ),
          },
        ]}
      />
    ),
    [],
  );
  return (
    <TabLayout tabs={DocumentTabs}>
      <div className="flex items-end justify-between px-6 pt-6 bg-white">
        <div className="flex flex-col gap-[2px]">
          <h2 className="text-h4 font-bold">Documents</h2>
          <p className="text-c1 text-gray-2">{docsCount} docs in total</p>
        </div>
        {isInternal && <AddDocumentButton />}
      </div>
    </TabLayout>
  );
};
