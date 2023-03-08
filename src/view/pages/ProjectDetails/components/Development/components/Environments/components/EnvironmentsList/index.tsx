import React, { FC } from 'react';

import { ProjectEnvironmentType } from '~/services/gql/__generated__/globalTypes';
import { FetchProjectEnvironmentsListQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { EnvironmentsListItem } from './components/EnvironmentsListItem';

interface Props {
  environments: FetchProjectEnvironmentsListQuery['projectEnvironmentList'];
}

export const EnvironmentsList: FC<Props> = ({ environments }) => {
  return (
    <div className="grid grid-cols-2 gap-5 mt-2">
      {environments.map(environment => (
        <EnvironmentsListItem
          key={environment.id}
          environment={environment as ProjectEnvironmentType}
        />
      ))}
    </div>
  );
};
