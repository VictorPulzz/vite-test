import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant, EmptyState, Table, TableLoader } from '@appello/web-ui';
import React, { FC } from 'react';

import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useFetchDocumentTemplatesListQuery } from './__generated__/schema';
import { CreateOrUpdateDocumentTemplateModal } from './components/CreateOrUpdateDocumentTemplateModal';
import { DOCUMENT_TEMPLATES_TABLE_COLUMNS } from './consts';

export const AdminSettingsDocumentTemplatesPage: FC = () => {
  const {
    value: isCreateOrUpdateDocumentTemplateModal,
    on: openCreateOrUpdateDocumentTemplateModal,
    off: closeCreateOrUpdateDocumentTemplateModal,
  } = useSwitchValue(false);

  const { data, loading } = useFetchDocumentTemplatesListQuery({
    fetchPolicy: 'cache-and-network',
  });

  // TODO add counter, sorting and pagination when backend will be ready
  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Templates</h1>
          {/* <p className="text-p5 text-gray-2">
            {(data && data.requestList.count) ?? 0} templates in total
          </p> */}
        </div>
        <Button
          label="New template"
          withIcon="plus"
          variant={ButtonVariant.PRIMARY}
          className="w-40"
          onClick={openCreateOrUpdateDocumentTemplateModal}
        />
      </div>

      {loading && <TableLoader className="mt-6" />}
      {data && data.documentTemplateList.length === 0 && (
        <EmptyState iconName="documentTemplate" label="No document templates here yet" />
      )}
      {!loading && data && data.documentTemplateList.length > 0 && (
        <Table
          className="mt-6"
          data={data.documentTemplateList}
          columns={DOCUMENT_TEMPLATES_TABLE_COLUMNS}
          // setOffset={setOffset}
          // offset={offset}
          // fetchMore={fetchMore}
          // totalCount={data.requestList.count}
          // sorting={tableSorting}
          // setSorting={setTableSorting}
        />
      )}
      <CreateOrUpdateDocumentTemplateModal
        isOpen={isCreateOrUpdateDocumentTemplateModal}
        close={closeCreateOrUpdateDocumentTemplateModal}
      />
    </SidebarLayout>
  );
};
