import { Tabs } from '@appello/web-ui';
import React, { FC, useMemo, useState } from 'react';
import { Outlet } from 'react-router';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { NewDocumentButton } from '~/view/components/Docs/components/NewDocumentButton';
import { DocsType } from '~/view/components/Docs/types';
import { NoAccessMessage } from '~/view/components/NoAccessMessage';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { TabLayout } from '~/view/layouts/TabLayout';

import styles from './styles.module.scss';

enum DocsTab {
  INTERNAL = 0,
  CLIENT = 1,
}

export const DocumentsPage: FC = () => {
  const canReadWriteInternalDocuments = useHasAccess(Permission.READ_WRITE_INTERNAL_DOCS);
  const canReadWriteClientsDocuments = useHasAccess(Permission.READ_WRITE_CLIENTS_DOCS);

  const [selectedTab, setSelectedTab] = useState(DocsTab.CLIENT);

  const tabsElement = useMemo(
    () => (
      <Tabs
        className={styles['tabs']}
        contentClassName={styles['tabs__body']}
        selected={selectedTab}
        onSelect={setSelectedTab}
        items={[
          {
            title: 'Internal',
            path: ROUTES.DOCUMENTS,
            element: canReadWriteInternalDocuments ? (
              <div className="h-full p-7">
                <SectionContainer containerClassName="h-full">
                  <Outlet />
                </SectionContainer>
              </div>
            ) : (
              <NoAccessMessage className="h-full" />
            ),
          },
          {
            title: 'Client',
            path: ROUTES.DOCUMENTS_CLIENTS,
            element: canReadWriteClientsDocuments ? (
              <div className="h-full p-7">
                <SectionContainer containerClassName="h-full">
                  <Outlet />
                </SectionContainer>
              </div>
            ) : (
              <NoAccessMessage className="h-full" />
            ),
          },
        ]}
      />
    ),
    [canReadWriteClientsDocuments, canReadWriteInternalDocuments, selectedTab],
  );

  return (
    <TabLayout tabs={tabsElement}>
      <div className="flex items-center justify-between px-6 pt-6 bg-white">
        <h2 className="text-h4 font-bold pb-[10px]">Documents</h2>
        {selectedTab === DocsTab.INTERNAL && canReadWriteInternalDocuments && (
          <NewDocumentButton type={DocsType.INTERNAL} />
        )}
      </div>
    </TabLayout>
  );
};
