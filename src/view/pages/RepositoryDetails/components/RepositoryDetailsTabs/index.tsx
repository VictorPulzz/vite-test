import { Tabs } from '@appello/web-ui';
import React, { FC } from 'react';

import { ROUTES } from '~/constants/routes';

import { Participants } from './components/Participants';

export const RepositoryDetailsTabs: FC = () => {
  return (
    <div className="shadow-4 bg-white rounded-md flex-auto">
      <Tabs
        className="pt-3"
        items={[
          {
            title: 'Participants',
            element: <Participants />,
            path: ROUTES.REPOSITORY_DETAILS,
          },
        ]}
      />
    </div>
  );
};
