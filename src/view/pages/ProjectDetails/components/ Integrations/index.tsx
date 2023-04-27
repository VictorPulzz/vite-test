import React, { FC } from 'react';

import { BitbucketSection } from './components/BitbucketSection';
// import { SlackChannelsSection } from './components/SlackChannelsSection';

interface Props {
  projectId: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Integrations: FC<Props> = ({ projectId }) => {
  return (
    <div className="flex flex-col gap-5">
      <BitbucketSection />
      {/* <SlackChannelsSection projectId={projectId} /> */}
    </div>
  );
};
