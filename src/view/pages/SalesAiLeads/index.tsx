import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant, EmptyState, TableLoader } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import React, { FC } from 'react';

import { useGetLeadsQuery } from '~/services/rtk/lead';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { CreateNewLeadModal } from './components/CreateNewLeadModal';
import { useLeadsTableColumns } from './hooks/useLeadsTableColumns';

export const SalesAiLeadsPage: FC = () => {
  const {
    value: isCreateNewLeadModalOpen,
    on: openCreateNewLeadModal,
    off: closeCreateNewLeadModal,
  } = useSwitchValue(false);

  const { data, isLoading } = useGetLeadsQuery();

  const leadListColumns = useLeadsTableColumns();

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Leads</h1>
        </div>
        <Button
          label="New Lead"
          withIcon="plus"
          variant={ButtonVariant.PRIMARY}
          className="w-40"
          onClick={openCreateNewLeadModal}
        />
      </div>
      {isLoading && <TableLoader className="mt-6" />}
      {data && data.length === 0 && <EmptyState iconName="list" label="No leads here yet" />}
      {!isLoading && data && data.length > 0 && (
        <Table className="mt-6" data={data} columns={leadListColumns} />
      )}
      <CreateNewLeadModal isOpen={isCreateNewLeadModalOpen} close={closeCreateNewLeadModal} />
    </SidebarLayout>
  );
};
