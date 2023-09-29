import { Tab, Tabs } from '@appello/web-ui';
import React, { FC, useMemo, useState } from 'react';
import { Outlet } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { NewDocumentButton } from '~/view/components/Docs/components/NewDocumentButton';
import { DocsType } from '~/view/components/Docs/types';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';
import { TabLayout } from '~/view/layouts/TabLayout';

enum DocsTab {
  INTERNAL = 0,
  CLIENT = 1,
}

export const DocumentsPage: FC = () => {
  const { canReadWriteInternalDocuments, canReadWriteClientsDocuments } = useUserPermissions();

  const [selectedTab, setSelectedTab] = useState(DocsTab.INTERNAL);

  const docsTabs: (Tab | false)[] = useMemo(
    () => [
      canReadWriteInternalDocuments && {
        title: 'Internal',
        path: ROUTES.DOCUMENTS_INTERNAL,
        element: (
          <div className="h-full p-7">
            <SectionContainer containerClassName="h-full">
              <Outlet />
            </SectionContainer>
          </div>
        ),
      },
      canReadWriteClientsDocuments && {
        title: 'Client',
        path: ROUTES.DOCUMENTS_CLIENT,
        element: (
          <div className="h-full p-7">
            <SectionContainer containerClassName="h-full">
              <Outlet />
            </SectionContainer>
          </div>
        ),
      },
    ],
    [canReadWriteClientsDocuments, canReadWriteInternalDocuments],
  );

  const tabsElement = useMemo(
    () => (
      <Tabs
        selected={selectedTab}
        onSelect={setSelectedTab}
        items={docsTabs.filter((tab): tab is Tab => !!tab)}
      />
    ),
    [docsTabs, selectedTab],
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
