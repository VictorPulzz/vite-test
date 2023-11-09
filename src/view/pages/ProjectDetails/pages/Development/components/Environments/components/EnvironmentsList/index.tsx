import React, { FC } from 'react';

import {
  FetchEnvsRequestsListQuery,
  FetchProjectEnvironmentsListQuery,
} from '~/view/pages/ProjectDetails/__generated__/schema';
import { CardVariant } from '~/view/pages/ProjectDetails/consts';

import { EnvironmentsListItem } from './components/EnvironmentsListItem';

interface Props {
  environments: FetchProjectEnvironmentsListQuery['projectEnvironmentList'];
  envsRequests: FetchEnvsRequestsListQuery['requestList']['results'];
}

export const EnvironmentsList: FC<Props> = ({ environments, envsRequests }) => {
  return (
    <div className="flex flex-col gap-5 mt-2 max-h-[1250px] overflow-auto">
      <div className="flex flex-col gap-5 mt-2">
        {environments.map(environment => (
          <EnvironmentsListItem
            key={environment.id}
            variant={CardVariant.DEFAULT}
            environment={environment}
          />
        ))}
        {envsRequests.map(environment => (
          <EnvironmentsListItem
            key={environment.id}
            variant={CardVariant.REQUEST}
            envRequest={environment}
          />
        ))}
      </div>
    </div>
  );
};
