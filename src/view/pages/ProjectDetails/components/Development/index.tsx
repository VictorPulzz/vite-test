import React, { FC } from 'react';

import { DevelopmentEnvironments } from './components/Environments';
import { DevelopmentRepositories } from './components/Repositories';

export const Development: FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <DevelopmentRepositories />
      <DevelopmentEnvironments />
      <DevelopmentRepositories />
    </div>
  );
};
