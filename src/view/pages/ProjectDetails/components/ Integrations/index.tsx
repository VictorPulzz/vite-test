import { Loader } from '@appello/web-ui';
import React, { FC } from 'react';

import { useFetchProjectIntegrationsQuery } from '../../__generated__/schema';
import { BitbucketSection } from './components/BitbucketSection';
import { SlackChannelsSection } from './components/SlackChannelsSection';

interface Props {
  projectId: number;
}

export const Integrations: FC<Props> = ({ projectId }) => {
  const { data, loading } = useFetchProjectIntegrationsQuery({
    variables: {
      data: { id: projectId },
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <div className="h-full">
      {loading && (
        <div className="flex h-full items-center">
          <Loader full colorful />
        </div>
      )}
      {!loading && (
        <div className="flex flex-col gap-5">
          <BitbucketSection
            gitGroupId={data?.projectIntegrationPage.gitGroupId ?? ''}
            projectId={projectId}
          />
          <SlackChannelsSection slackChannels={data?.projectIntegrationPage.slackChannels} />
        </div>
      )}
    </div>
  );
};
