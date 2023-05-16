import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import { TableLoader } from '@appello/web-ui';
import React, { FC } from 'react';

import { SectionContainer } from '~/view/components/SectionContainer';

import { useFetchSlackTemplatesListQuery } from '../../__generated__/schema';
import { CreateOrUpdateChannelTemplateModal } from './components/CreateOrUpdateChannelTemplateModal';
import { CHANNEL_TEMPLATES_TABLE_COLUMNS } from './consts';

export const SlackTabElement: FC = () => {
  const {
    value: isCreateOrUpdateChannelTemplateModal,
    on: openCreateOrUpdateChannelTemplateModal,
    off: closeCreateOrUpdateChannelTemplateModal,
  } = useSwitchValue(false);

  const { data, loading } = useFetchSlackTemplatesListQuery({ fetchPolicy: 'cache-and-network' });

  return (
    <SectionContainer title="Channel templates" containerClassName="h-full">
      <div className="flex flex-col h-full pb-7">
        {loading && <TableLoader className="mt-2" />}
        {data && data.slackTemplateList.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <EmptyState iconName="list" label="No channel templates here yet" />
          </div>
        )}
        {!loading && data && data.slackTemplateList.length > 0 && (
          <Table
            className="mt-2"
            data={data.slackTemplateList}
            columns={CHANNEL_TEMPLATES_TABLE_COLUMNS}
          />
        )}
        {!loading && (
          <Button
            variant={ButtonVariant.SECONDARY}
            label="Add custom template"
            className="w-[170px] mt-3"
            onClick={openCreateOrUpdateChannelTemplateModal}
          />
        )}
      </div>
      <CreateOrUpdateChannelTemplateModal
        isOpen={isCreateOrUpdateChannelTemplateModal}
        close={closeCreateOrUpdateChannelTemplateModal}
      />
    </SectionContainer>
  );
};
