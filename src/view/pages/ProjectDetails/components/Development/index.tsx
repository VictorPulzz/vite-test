import React, { FC } from 'react';

import { DevelopmentRepositories } from './components/Repositories';

export const Development: FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <DevelopmentRepositories />
      <DevelopmentRepositories />
      <DevelopmentRepositories />
    </div>
  );
};
