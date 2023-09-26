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
import { ROUTES } from '~/constants/routes';
import { ReportTemplateSort } from '~/services/gql/__generated__/globalTypes';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';
import { useSortingState } from '~/view/hooks/useSortingState';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useFetchReportTemplatesListQuery } from './__generated__/schema';
import { REPORT_TEMPLATES_TABLE_COLUMNS } from './consts';

export const AdminSettingsReportTemplatesPage: FC = () => {
  const { sorting, tableSorting, setTableSorting } = useSortingState<ReportTemplateSort>();

  const { offset, setOffset } = useListQueryParams();

  const { data, loading, fetchMore } = useFetchReportTemplatesListQuery({
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
          <h1 className="text-h4">Report templates</h1>
          <p className="text-p5 text-gray-2">
            {(data && data.reportTemplateList.count) ?? 0} templates in total
          </p>
        </div>
        <Button
          label="New template"
          withIcon="plus"
          variant={ButtonVariant.PRIMARY}
          className="w-40"
          to={ROUTES.ADMIN_SETTINGS_REPORT_TEMPLATES_ADD}
        />
      </div>

      {loading && <TableLoader className="mt-6" />}
      {data && data.reportTemplateList.results.length === 0 && (
        <EmptyState iconName="documentLayout" label="No report templates here yet" />
      )}
      {!loading && data && data.reportTemplateList.results.length > 0 && (
        <Table
          className="mt-6"
          data={data.reportTemplateList.results}
          columns={REPORT_TEMPLATES_TABLE_COLUMNS}
          setOffset={setOffset}
          offset={offset}
          onPageChange={gqlTableFetchMore(fetchMore)}
          totalCount={data.reportTemplateList.count}
          sorting={tableSorting}
          setSorting={setTableSorting}
        />
      )}
    </SidebarLayout>
  );
};
