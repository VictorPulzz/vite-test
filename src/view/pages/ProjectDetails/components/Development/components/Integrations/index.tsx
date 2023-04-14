import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import React, { FC } from 'react';

import { Permission } from '~/constants/permissions';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { FetchProjectIntegrationsListQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { CreateNewIntegrationModal } from './components/CreateNewIntegrationModal';
import { IntegrationsList } from './components/IntegrationsList';

interface Props {
  integrations: FetchProjectIntegrationsListQuery['projectIntegrationList'];
}

export const DevelopmentIntegrations: FC<Props> = ({ integrations }) => {
  const canCreateProjectIntegrations = useHasAccess(Permission.CREATE_PROJECT_INTEGRATIONS);

  const {
    value: isCreateNewIntegrationModalOpen,
    on: openCreateNewIntegrationModal,
    off: closeCreateNewIntegrationModal,
  } = useSwitchValue(false);

  return (
    <div>
      <SectionContainer title="Integrations">
        {integrations.length === 0 && (
          <EmptyState iconName="repositories" label="No integrations here yet" />
        )}
        {!!integrations.length && <IntegrationsList integrations={integrations} />}
        {canCreateProjectIntegrations && (
          <Button
            variant={ButtonVariant.SECONDARY}
            label="Create new integration"
            className="mt-6 w-[180px]"
            onClick={openCreateNewIntegrationModal}
          />
        )}
      </SectionContainer>
      <CreateNewIntegrationModal
        isOpen={isCreateNewIntegrationModalOpen}
        close={closeCreateNewIntegrationModal}
      />
    </div>
  );
};
