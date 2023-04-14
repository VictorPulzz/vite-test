import { EmptyState } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import { TableLoader } from '@appello/web-ui';
import React, { FC } from 'react';

import { SectionContainer } from '~/view/components/SectionContainer';

import { useFetchProjectSlackChannelsQuery } from '../../__generated__/schema';
import { SLACK_CHANNELS_TABLE_COLUMNS } from './consts';

interface Props {
  projectId: number;
}

export const SlackChannels: FC<Props> = ({ projectId }) => {
  const { data, loading } = useFetchProjectSlackChannelsQuery({
    variables: {
      data: { id: projectId },
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <SectionContainer title="Slack channels" containerClassName="h-full">
      {loading && <TableLoader className="mt-2" />}
      {data && data.project.slackChannels?.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <EmptyState iconName="list" label="No slack channels here yet" />
        </div>
      )}
      {!loading && data?.project.slackChannels && data.project.slackChannels?.length > 0 && (
        <Table
          className="mt-2"
          data={data?.project.slackChannels}
          columns={SLACK_CHANNELS_TABLE_COLUMNS}
        />
      )}
    </SectionContainer>
  );
};
