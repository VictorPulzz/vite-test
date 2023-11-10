import { EmptyState } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import React, { FC } from 'react';

import { SectionContainer } from '~/view/components/SectionContainer';
import { FetchProjectIntegrationsQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { SLACK_CHANNELS_TABLE_COLUMNS } from './consts';

interface Props {
  slackChannels: FetchProjectIntegrationsQuery['projectIntegrationPage']['slackChannels'];
}

export const SlackChannelsSection: FC<Props> = ({ slackChannels }) => {
  return (
    <SectionContainer containerClassName="h-full" title="Slack channels">
      {slackChannels?.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <EmptyState iconName="list" label="No slack channels here yet" />
        </div>
      )}
      {slackChannels && slackChannels?.length > 0 && (
        <Table className="mt-2" columns={SLACK_CHANNELS_TABLE_COLUMNS} data={slackChannels} />
      )}
    </SectionContainer>
  );
};
