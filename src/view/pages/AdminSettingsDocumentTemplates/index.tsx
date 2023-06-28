import { useSwitchValue } from '@appello/common/lib/hooks';
import {
  Button,
  ButtonVariant,
  EmptyState,
  Table,
  TableLoader,
  useListQueryParams,
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
  const { sorting, tableSorting, setTableSorting } = useSortingState<DocumentTemplateSort>();

  const { offset, setOffset } = useListQueryParams();

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
          <h1 className="text-h4">Templates</h1>
          <p className="text-p5 text-gray-2">
            {(data && data.documentTemplateList.count) ?? 0} templates in total
          </p>
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
      {data && data.documentTemplateList.results.length === 0 && (
        <EmptyState iconName="documentLayout" label="No document templates here yet" />
      )}
      {!loading && data && data.documentTemplateList.results.length > 0 && (
        <Table
          className="mt-6"
          data={data.documentTemplateList.results}
          columns={DOCUMENT_TEMPLATES_TABLE_COLUMNS}
          setOffset={setOffset}
          offset={offset}
          onPageChange={gqlTableFetchMore(fetchMore)}
          totalCount={data.documentTemplateList.count}
          sorting={tableSorting}
          setSorting={setTableSorting}
        />
      )}
      <CreateOrUpdateDocumentTemplateModal
        isOpen={isCreateOrUpdateDocumentTemplateModal}
        close={closeCreateOrUpdateDocumentTemplateModal}
      />
    </SidebarLayout>
  );
};
