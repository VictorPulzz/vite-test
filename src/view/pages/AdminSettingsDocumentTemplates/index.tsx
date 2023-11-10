import { useSwitchValue } from '@appello/common';
import { useListQueryParams } from '@appello/web-kit';
import {
  Button,
  ButtonVariant,
  EmptyState,
  Table,
  TableLoader,
  useAppelloKit,
} from '@appello/web-ui';
import React, { FC } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { DocumentTemplateSort } from '~/services/gql/__generated__/globalTypes';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';
import { useSortingState } from '~/view/hooks/useSortingState';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useFetchDocumentTemplatesListQuery } from './__generated__/schema';
import { CreateOrUpdateDocumentTemplateModal } from './components/CreateOrUpdateDocumentTemplateModal';
import { DOCUMENT_TEMPLATES_TABLE_COLUMNS } from './consts';

export const AdminSettingsDocumentTemplatesPage: FC = () => {
  const { pageSize } = useAppelloKit();

  const { sorting, tableSorting, setTableSorting } = useSortingState<DocumentTemplateSort>();

  const { offset, setOffset } = useListQueryParams(pageSize);

  const {
    value: isCreateOrUpdateDocumentTemplateModal,
    on: openCreateOrUpdateDocumentTemplateModal,
    off: closeCreateOrUpdateDocumentTemplateModal,
  } = useSwitchValue(false);

  const { data, loading, fetchMore } = useFetchDocumentTemplatesListQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      sort: sorting,
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Document templates</h1>
          <p className="text-p5 text-gray-2">
            {(data && data.documentTemplateList.count) ?? 0} templates in total
          </p>
        </div>
        <Button
          className="w-40"
          label="New template"
          variant={ButtonVariant.PRIMARY}
          withIcon="plus"
          onClick={openCreateOrUpdateDocumentTemplateModal}
        />
      </div>

      {loading && <TableLoader className="mt-6" />}
      {data && data.documentTemplateList.results.length === 0 && (
        <EmptyState iconName="documentLayout" label="No document templates here yet" />
      )}
      {!loading && data && data.documentTemplateList.results.length > 0 && (
        <Table
          className="mt-6"
          columns={DOCUMENT_TEMPLATES_TABLE_COLUMNS}
          data={data.documentTemplateList.results}
          offset={offset}
          setOffset={setOffset}
          setSorting={setTableSorting}
          sorting={tableSorting}
          totalCount={data.documentTemplateList.count}
          onPageChange={gqlTableFetchMore(fetchMore)}
        />
      )}
      <CreateOrUpdateDocumentTemplateModal
        close={closeCreateOrUpdateDocumentTemplateModal}
        isOpen={isCreateOrUpdateDocumentTemplateModal}
      />
    </SidebarLayout>
  );
};
