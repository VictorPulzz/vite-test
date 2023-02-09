import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import React, { FC } from 'react';

import { ProjectIntegrationType } from '~/services/gql/__generated__/globalTypes';
import { SectionContainer } from '~/view/components/SectionContainer';
import { FetchProjectIntegrationsListQuery } from '~/view/pages/ProjectDetails/__generated__/schema';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Table } from '~/view/ui/components/common/Table';

import { RequestNewIntegrationModal } from './components/RequestNewIntegrationModal';
import { INTEGRATIONS_TABLE_COLUMNS } from './consts';

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
        {!!integrations.length && (
          <Table
            className="mt-3"
            data={integrations as ProjectIntegrationType[]}
            columns={INTEGRATIONS_TABLE_COLUMNS}
          />
        )}
        <Button
          variant={ButtonVariant.SECONDARY}
          label="Request new integration"
          className="mt-3 w-[180px]"
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
