import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import React, { FC } from 'react';

import { Permission } from '~/constants/permissions';
import { RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { NewRequestModal } from '~/view/components/NewRequestModal';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';
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
  const canCreateProjectIntegrations = useHasAccess(Permission.CREATE_PROJECT_INTEGRATIONS);

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
        {integrations.length === 0 && (
          <EmptyState iconName="repositories" label="No integrations here yet" />
        )}
        {!!integrations.length && (
          <IntegrationsList
            integrations={integrations}
            integrationsRequests={integrationsRequests}
          />
        )}
        <Button
          variant={ButtonVariant.SECONDARY}
          label={`${canCreateProjectIntegrations ? 'Create' : 'Request'} new integration`}
          className="mt-6 w-[190px]"
          onClick={
            canCreateProjectIntegrations ? openCreateNewIntegrationModal : openNewRequestModal
          }
        />
      </SectionContainer>
      <CreateNewIntegrationModal
        isOpen={isCreateNewIntegrationModalOpen}
        close={closeCreateNewIntegrationModal}
      />
      {isNewRequestModalOpen && (
        <NewRequestModal
          isOpen={isNewRequestModalOpen}
          close={closeNewRequestModal}
          requestType={RequestTypeChoice.CREATION_INTEGRATION}
          projectId={projectId}
        />
      )}
    </div>
  );
};
