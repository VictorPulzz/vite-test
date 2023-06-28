import { useSwitchValue } from '@appello/common/lib/hooks';
import {
  Button,
  ButtonVariant,
  EmptyState,
  SearchInput,
  TableLoader,
  useListQueryParams,
} from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import React, { FC } from 'react';

import { PAGE_SIZE } from '~/constants/pagination';
import { useGetLeadsQuery } from '~/services/rtk/lead';
import { LeadsListRequest } from '~/services/rtk/lead/types';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { CreateNewLeadModal } from './components/CreateNewLeadModal';
import { useLeadsTableColumns } from './hooks/useLeadsTableColumns';

export const SalesAiLeadsPage: FC = () => {
  const {
    value: isCreateNewLeadModalOpen,
    on: openCreateNewLeadModal,
    off: closeCreateNewLeadModal,
  } = useSwitchValue(false);

  const { searchValue, setSearchValue, offset, setOffset } = useListQueryParams<LeadsListRequest>();

  const { data, isLoading } = useGetLeadsQuery({
    limit: PAGE_SIZE,
    offset,
    search: searchValue ?? '',
  });

  const leadListColumns = useLeadsTableColumns();

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Leads</h1>
          <p className="text-p5 text-gray-2">{(data && data.total) ?? 0} leads in total</p>
        </div>
        <Button
          label="New Lead"
          withIcon="plus"
          variant={ButtonVariant.PRIMARY}
          className="w-40"
          onClick={openCreateNewLeadModal}
        />
      </div>
      <SearchInput
        defaultValue={searchValue}
        onChange={setSearchValue}
        placeholder="Search leads"
        className="mt-5"
      />
      {isLoading && <TableLoader className="mt-6" />}
      {data && data.items.length === 0 && <EmptyState iconName="list" label="No leads here yet" />}
      {!isLoading && data && data.items.length > 0 && (
        <Table
          className="mt-6"
          data={data.items}
          columns={leadListColumns}
          setOffset={setOffset}
          offset={offset}
          totalCount={data.total}
        />
      )}
      <CreateNewLeadModal isOpen={isCreateNewLeadModalOpen} close={closeCreateNewLeadModal} />
    </SidebarLayout>
  );
};
