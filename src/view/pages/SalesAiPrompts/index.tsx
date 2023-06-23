import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant, EmptyState, TableLoader } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import React, { FC } from 'react';

import { useGetPromptsQuery } from '~/services/rtk/lead';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { CreateOrUpdatePromptModal } from './components/CreateOrUpdatePromptModal';
import { usePromptsTableColumns } from './hooks/usePromptsTableColumns';

export const SalesAiPromptsPage: FC = () => {
  const {
    value: isCreateOrUpdatePromptModalOpen,
    on: openCreateOrUpdatePromptModal,
    off: closeCreateOrUpdatePromptModal,
  } = useSwitchValue(false);

  const { data, isFetching } = useGetPromptsQuery();

  const promptsListColumns = usePromptsTableColumns();

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Prompts</h1>
        </div>
        <Button
          label="New Prompt"
          withIcon="plus"
          variant={ButtonVariant.PRIMARY}
          className="w-40"
          onClick={openCreateOrUpdatePromptModal}
        />
      </div>
      {isFetching && <TableLoader className="mt-6" />}
      {data && data.length === 0 && <EmptyState iconName="list" label="No prompts here yet" />}
      {!isFetching && data && data.length > 0 && (
        <Table className="mt-6" data={data} columns={promptsListColumns} />
      )}
      <CreateOrUpdatePromptModal
        isOpen={isCreateOrUpdatePromptModalOpen}
        close={closeCreateOrUpdatePromptModal}
      />
    </SidebarLayout>
  );
};
