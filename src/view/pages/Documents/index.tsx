import React, { FC, useMemo, useState } from 'react';

import { Permission } from '~/constants/permissions';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { TabLayout } from '~/view/layouts/TabLayout';
import { Docs } from '~/view/pages/ProjectDetails/components/Docs';
import { NewDocumentButton } from '~/view/pages/ProjectDetails/components/Docs/components/NewDocumentButton';
import styles from '~/view/pages/ProjectDetails/styles.module.scss';
import { Tabs } from '~/view/ui/components/common/Tabs';

export const DocumentsPage: FC = () => {
  const canAddInternalDocs = useHasAccess(Permission.ADD_INTERNAL_DOCS);

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
            element: (
              <SectionContainer containerClassName="min-h-[calc(100vh-12rem)]">
                <Docs isInternal setDocsCount={setDocsCount} setIsInternal={setIsInternal} />
              </SectionContainer>
            ),
          },
          {
            title: 'Client',
            element: (
              <SectionContainer containerClassName="min-h-[calc(100vh-12rem)]">
                <Docs
                  isInternal={false}
                  setDocsCount={setDocsCount}
                  setIsInternal={setIsInternal}
                />
              </SectionContainer>
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
        {isInternal && canAddInternalDocs && <NewDocumentButton />}
      </div>
    </TabLayout>
  );
};
