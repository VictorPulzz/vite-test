import React, { FC } from 'react';

import { DevelopmentEnvironments } from './components/Environments';
import { DevelopmentIntegrations } from './components/Integrations';
import { DevelopmentRepositories } from './components/Repositories';

export const Development: FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <DevelopmentRepositories />
      <DevelopmentEnvironments />
      <DevelopmentIntegrations />
    </div>
  );
};
