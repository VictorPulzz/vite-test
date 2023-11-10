import { useListQueryParams } from '@appello/web-kit';
import {
  Button,
  ButtonVariant,
  EmptyState,
  SearchInput,
  Table,
  TableLoader,
  useAppelloKit,
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
  const { pageSize } = useAppelloKit();
  const { sorting, tableSorting, setTableSorting } = useSortingState<ReportTemplateSort>();
  const { searchValue, setSearchValue, offset, setOffset } = useListQueryParams(pageSize);

  const { data, loading, fetchMore } = useFetchReportTemplatesListQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      sort: sorting,
      search: searchValue,
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
          className="w-40"
          label="New template"
          to={ROUTES.ADMIN_SETTINGS_REPORT_TEMPLATES_ADD}
          variant={ButtonVariant.PRIMARY}
          withIcon="plus"
        />
      </div>
      <SearchInput
        className="mt-4"
        defaultValue={searchValue}
        placeholder="Search report templates"
        onChange={setSearchValue}
      />
      {loading && <TableLoader className="mt-6" />}
      {data && data.reportTemplateList.results.length === 0 && (
        <EmptyState iconName="documentLayout" label="No report templates here yet" />
      )}
      {!loading && data && data.reportTemplateList.results.length > 0 && (
        <Table
          className="mt-6"
          columns={REPORT_TEMPLATES_TABLE_COLUMNS}
          data={data.reportTemplateList.results}
          offset={offset}
          setOffset={setOffset}
          setSorting={setTableSorting}
          sorting={tableSorting}
          totalCount={data.reportTemplateList.count}
          onPageChange={gqlTableFetchMore(fetchMore)}
        />
      )}
    </SidebarLayout>
  );
};
