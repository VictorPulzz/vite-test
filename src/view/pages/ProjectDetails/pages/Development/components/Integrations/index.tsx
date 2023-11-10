import { useSwitchValue } from '@appello/common';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import React, { FC } from 'react';

import { RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { NewRequestModal } from '~/view/components/NewRequestModal';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';
import {
  FetchIntegrationsRequestsListQuery,
  FetchProjectIntegrationsListQuery,
} from '~/view/pages/ProjectDetails/__generated__/schema';

import { CreateNewIntegrationModal } from './components/CreateNewIntegrationModal';
import { IntegrationsList } from './components/IntegrationsList';

interface Props {
  integrations: FetchProjectIntegrationsListQuery['projectIntegrationList'];
  integrationsRequests: FetchIntegrationsRequestsListQuery['requestList']['results'];
  projectId: number;
}

export const DevelopmentIntegrations: FC<Props> = ({
  integrations,
  integrationsRequests,
  projectId,
}) => {
  const { canWriteProjectIntegrations } = useUserPermissions();

  const {
    value: isCreateNewIntegrationModalOpen,
    on: openCreateNewIntegrationModal,
    off: closeCreateNewIntegrationModal,
  } = useSwitchValue(false);

  const {
    value: isNewRequestModalOpen,
    on: openNewRequestModal,
    off: closeNewRequestModal,
  } = useSwitchValue(false);

  return (
    <div>
      <SectionContainer title="Integrations">
        {integrations.length === 0 && integrationsRequests.length === 0 && (
          <EmptyState iconName="repositories" label="No integrations here yet" />
        )}
        {(!!integrations.length || !!integrationsRequests.length) && (
          <IntegrationsList
            integrations={integrations}
            integrationsRequests={integrationsRequests}
          />
        )}
        <Button
          className="mt-6 w-[190px]"
          label={`${canWriteProjectIntegrations ? 'Create' : 'Request'} new integration`}
          variant={ButtonVariant.SECONDARY}
          onClick={
            canWriteProjectIntegrations ? openCreateNewIntegrationModal : openNewRequestModal
          }
        />
      </SectionContainer>
      <CreateNewIntegrationModal
        close={closeCreateNewIntegrationModal}
        isOpen={isCreateNewIntegrationModalOpen}
      />
      {isNewRequestModalOpen && (
        <NewRequestModal
          close={closeNewRequestModal}
          isOpen={isNewRequestModalOpen}
          projectId={projectId}
          requestType={RequestTypeChoice.CREATION_INTEGRATION}
        />
      )}
    </div>
  );
};
