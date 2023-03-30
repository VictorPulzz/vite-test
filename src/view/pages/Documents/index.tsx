import React, { FC, useMemo, useState } from 'react';

import { Permission } from '~/constants/permissions';
import { NoAccessMessage } from '~/view/components/NoAccessMessage';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { TabLayout } from '~/view/layouts/TabLayout';
import { Docs } from '~/view/pages/ProjectDetails/components/Docs';
import { NewDocumentButton } from '~/view/pages/ProjectDetails/components/Docs/components/NewDocumentButton';
import { Tabs } from '~/view/ui/components/common/Tabs';

import styles from './styles.module.scss';

export const DocumentsPage: FC = () => {
  const canReadDocuments = useHasAccess(Permission.READ_DOCUMENTS);
  const canAddInternalDocs = useHasAccess(Permission.ADD_INTERNAL_DOCS);

  const [docsCount, setDocsCount] = useState<number>(0);
  const [isInternal, setIsInternal] = useState<boolean>(false);

  const DocumentTabs = useMemo(
    () => (
      <Tabs
        className={styles['tabs']}
        contentClassName={styles['tabs__body']}
        items={[
          {
            title: 'Internal',
            element: (
              <div className="h-full p-7">
                <SectionContainer containerClassName="h-full">
                  <Docs isInternal setDocsCount={setDocsCount} setIsInternal={setIsInternal} />
                </SectionContainer>
              </div>
            ),
          },
          {
            title: 'Client',
            element: (
              <div className="h-full p-7">
                <SectionContainer containerClassName="h-full">
                  <Docs
                    isInternal={false}
                    setDocsCount={setDocsCount}
                    setIsInternal={setIsInternal}
                  />
                </SectionContainer>
              </div>
            ),
          },
        ]}
      />
    ),
    [],
  );
  return (
    <TabLayout tabs={canReadDocuments ? DocumentTabs : []}>
      {canReadDocuments ? (
        <div className="flex items-end justify-between px-6 pt-6 bg-white">
          <div className="flex flex-col gap-[2px]">
            <h2 className="text-h4 font-bold">Documents</h2>
            <p className="text-c1 text-gray-2">{docsCount} docs in total</p>
          </div>
          {isInternal && canAddInternalDocs && <NewDocumentButton />}
        </div>
      ) : (
        <NoAccessMessage className="flex-auto bg-white" />
      )}
    </TabLayout>
  );
};
