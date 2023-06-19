import { Button, ButtonVariant } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import React, { FC } from 'react';

import { ROUTES } from '~/constants/routes';
import { useGetLeadsQuery } from '~/services/rtk/lead';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useLeadsTableColumns } from './hooks/useLeadsTableColumns';

export const LeadsPage: FC = () => {
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
          to={ROUTES.ADD_LEAD}
        />
      </div>
      <div className="mt-5 flex gap-3" />
      {!isLoading && data && <Table className="mt-6" data={data} columns={leadListColumns} />}
    </SidebarLayout>
  );
};
