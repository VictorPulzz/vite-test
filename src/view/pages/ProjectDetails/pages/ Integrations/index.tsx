import { Loader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router';

import { useFetchProjectIntegrationsQuery } from '../../__generated__/schema';
import { BitbucketSection } from './components/BitbucketSection';
import { SlackChannelsSection } from './components/SlackChannelsSection';

export const Integrations: FC = () => {
  const params = useParams();
  const projectId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

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
          <Loader colorful full />
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
