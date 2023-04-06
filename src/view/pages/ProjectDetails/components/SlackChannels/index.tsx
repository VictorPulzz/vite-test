import React, { FC } from 'react';

import { ProjectSlackType } from '~/services/gql/__generated__/globalTypes';
import { SectionContainer } from '~/view/components/SectionContainer';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Table } from '~/view/ui/components/common/Table';
import { TableLoader } from '~/view/ui/components/common/TableLoader';

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
      {data && data.project.projectChannels?.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <EmptyState iconName="list" label="No slack channels here yet" />
        </div>
      )}
      {!loading && data?.project.projectChannels && data.project.projectChannels?.length > 0 && (
        <Table
          className="mt-2"
          data={data?.project.projectChannels as ProjectSlackType[]}
          columns={SLACK_CHANNELS_TABLE_COLUMNS}
        />
      )}
    </SectionContainer>
  );
};
