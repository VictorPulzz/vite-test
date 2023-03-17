import React, { FC } from 'react';

import { ProjectIntegrationType } from '~/services/gql/__generated__/globalTypes';
import { FetchProjectIntegrationsListQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { IntegrationsListItem } from './components/IntegrationsListItem';

interface Props {
  integrations: FetchProjectIntegrationsListQuery['projectIntegrationList'];
}

export const IntegrationsList: FC<Props> = ({ integrations }) => {
  return (
    <div className="grid grid-cols-2 gap-5 mt-2">
      {integrations.map(integration => (
        <IntegrationsListItem
          key={integration.id}
          integration={integration as ProjectIntegrationType}
        />
      ))}
    </div>
  );
};
