import React, { FC } from 'react';

import {
  FetchIntegrationsRequestsListQuery,
  FetchProjectIntegrationsListQuery,
} from '~/view/pages/ProjectDetails/__generated__/schema';
import { CardVariant } from '~/view/pages/ProjectDetails/consts';

import { IntegrationsListItem } from './components/IntegrationsListItem';

interface Props {
  integrations: FetchProjectIntegrationsListQuery['projectIntegrationList'];
  integrationsRequests: FetchIntegrationsRequestsListQuery['requestList']['results'];
}

export const IntegrationsList: FC<Props> = ({ integrations, integrationsRequests }) => {
  return (
    <div className="grid grid-cols-2 gap-5 mt-2">
      {integrations.map(integration => (
        <IntegrationsListItem
          integration={integration}
          key={integration.id}
          variant={CardVariant.DEFAULT}
        />
      ))}
      {integrationsRequests.map(integration => (
        <IntegrationsListItem
          integrationRequest={integration}
          key={integration.id}
          variant={CardVariant.REQUEST}
        />
      ))}
    </div>
  );
};
