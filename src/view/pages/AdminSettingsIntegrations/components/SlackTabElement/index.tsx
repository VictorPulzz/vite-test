import { useSwitchValue } from '@appello/common';
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
    <SectionContainer containerClassName="h-full" title="Channel templates">
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
            columns={CHANNEL_TEMPLATES_TABLE_COLUMNS}
            data={data.slackTemplateList}
          />
        )}
        {!loading && (
          <Button
            className="w-[170px] mt-3"
            label="Add custom template"
            variant={ButtonVariant.SECONDARY}
            onClick={openCreateOrUpdateChannelTemplateModal}
          />
        )}
      </div>
      <CreateOrUpdateChannelTemplateModal
        close={closeCreateOrUpdateChannelTemplateModal}
        isOpen={isCreateOrUpdateChannelTemplateModal}
      />
    </SectionContainer>
  );
};
