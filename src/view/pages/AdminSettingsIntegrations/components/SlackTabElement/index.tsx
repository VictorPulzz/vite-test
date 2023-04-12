import { useSwitchValue } from '@appello/common/lib/hooks';
import React, { FC } from 'react';

import { SectionContainer } from '~/view/components/SectionContainer';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Table } from '~/view/ui/components/common/Table';
import { TableLoader } from '~/view/ui/components/common/TableLoader';

import { CreateOrUpdateChannelTemplateModal } from './components/CreateOrUpdateChannelTemplateModal';
import { Accessibility, CHANNEL_TEMPLATES_TABLE_COLUMNS, ChannelTemplatesType } from './consts';

const channelTemplatesItem: ChannelTemplatesType = {
  name: 'Main project channel',
  prefix: 'project',
  users: [
    { id: 1, photo: 'https://picsum.photos/40/40?random=1', fullName: 'Adam Smith' },
    { id: 2, photo: 'https://picsum.photos/40/40?random=2', fullName: 'Adam Smith' },
    { id: 3, photo: 'https://picsum.photos/40/40?random=3', fullName: 'Adam Smith' },
    { id: 4, photo: 'https://picsum.photos/40/40?random=4', fullName: 'Adam Smith' },
    { id: 5, photo: 'https://picsum.photos/40/40?random=5', fullName: 'Adam Smith' },
    { id: 6, photo: 'https://picsum.photos/40/40?random=6', fullName: 'Adam Smith' },
    { id: 7, photo: 'https://picsum.photos/40/40?random=7', fullName: 'Adam Smith' },
    { id: 8, photo: 'https://picsum.photos/40/40?random=8', fullName: 'Adam Smith' },
  ],
  accessibility: Accessibility.PUBLIC,
};

export const SlackTabElement: FC = () => {
  const {
    value: isCreateOrUpdateChannelTemplateModal,
    on: openCreateOrUpdateChannelTemplateModal,
    off: closeCreateOrUpdateChannelTemplateModal,
  } = useSwitchValue(false);

  const data = {
    loading: false,
    channelTemplates: new Array(6).fill(channelTemplatesItem),
  };

  return (
    <SectionContainer title="Channel templates" containerClassName="h-full">
      <div className="flex flex-col h-full pb-7">
        {data.loading && <TableLoader className="mt-2" />}
        {data && data.channelTemplates.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <EmptyState iconName="list" label="No channel templates here yet" />
          </div>
        )}
        {!data.loading && data && data.channelTemplates.length > 0 && (
          <Table
            className="mt-2"
            data={data.channelTemplates}
            columns={CHANNEL_TEMPLATES_TABLE_COLUMNS}
          />
        )}
        <Button
          variant={ButtonVariant.SECONDARY}
          label="Add custom template"
          className="w-[170px] mt-3"
          onClick={openCreateOrUpdateChannelTemplateModal}
        />
      </div>
      <CreateOrUpdateChannelTemplateModal
        isOpen={isCreateOrUpdateChannelTemplateModal}
        close={closeCreateOrUpdateChannelTemplateModal}
        isEditMode={false}
      />
    </SectionContainer>
  );
};
