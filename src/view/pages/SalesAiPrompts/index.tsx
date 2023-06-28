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
import { useGetPromptsQuery } from '~/services/rtk/lead';
import { PropmtsListRequest } from '~/services/rtk/lead/types';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { CreateOrUpdatePromptModal } from './components/CreateOrUpdatePromptModal';
import { usePromptsTableColumns } from './hooks/usePromptsTableColumns';

export const SalesAiPromptsPage: FC = () => {
  const {
    value: isCreateOrUpdatePromptModalOpen,
    on: openCreateOrUpdatePromptModal,
    off: closeCreateOrUpdatePromptModal,
  } = useSwitchValue(false);

  const { searchValue, setSearchValue, offset, setOffset } =
    useListQueryParams<PropmtsListRequest>();

  const { data, isFetching } = useGetPromptsQuery({
    limit: PAGE_SIZE,
    offset,
    search: searchValue ?? '',
  });

  const promptsListColumns = usePromptsTableColumns();

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Prompts</h1>
          <p className="text-p5 text-gray-2">{(data && data.total) ?? 0} prompts in total</p>
        </div>
        <Button
          label="New Prompt"
          withIcon="plus"
          variant={ButtonVariant.PRIMARY}
          className="w-40"
          onClick={openCreateOrUpdatePromptModal}
        />
      </div>
      <SearchInput
        defaultValue={searchValue}
        onChange={setSearchValue}
        placeholder="Search prompts"
        className="mt-5"
      />
      {isFetching && <TableLoader className="mt-6" />}
      {data && data.items.length === 0 && (
        <EmptyState iconName="list" label="No prompts here yet" />
      )}
      {!isFetching && data && data.items.length > 0 && (
        <Table
          className="mt-6"
          data={data.items}
          columns={promptsListColumns}
          setOffset={setOffset}
          offset={offset}
          totalCount={data.total}
        />
      )}
      <CreateOrUpdatePromptModal
        isOpen={isCreateOrUpdatePromptModalOpen}
        close={closeCreateOrUpdatePromptModal}
      />
    </SidebarLayout>
  );
};
