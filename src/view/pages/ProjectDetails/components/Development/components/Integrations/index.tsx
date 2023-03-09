import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import React, { FC } from 'react';

import { SectionContainer } from '~/view/components/SectionContainer';
import { FetchProjectIntegrationsListQuery } from '~/view/pages/ProjectDetails/__generated__/schema';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';

import { IntegrationsList } from './components/IntegrationsList';
import { RequestNewIntegrationModal } from './components/RequestNewIntegrationModal';

interface Props {
  integrations: FetchProjectIntegrationsListQuery['projectIntegrationList'];
}

export const DevelopmentIntegrations: FC<Props> = ({ integrations }) => {
  const {
    value: isRequestNewIntegrationModalOpen,
    on: openRequestNewIntegrationModal,
    off: closeRequestNewIntegrationModal,
  } = useSwitchValue(false);

  return (
    <div>
      <SectionContainer title="Integrations">
        {integrations.length === 0 && (
          <EmptyState iconName="repositories" label="No integrations here yet" />
        )}
        {!!integrations.length && <IntegrationsList integrations={integrations} />}
        <Button
          variant={ButtonVariant.SECONDARY}
          label="Create new integration"
          className="mt-6 w-[180px]"
          onClick={openRequestNewIntegrationModal}
        />
      </SectionContainer>
      <RequestNewIntegrationModal
        isOpen={isRequestNewIntegrationModalOpen}
        close={closeRequestNewIntegrationModal}
      />
    </div>
  );
};
