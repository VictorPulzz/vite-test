import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { SectionContainer } from '~/view/components/SectionContainer';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { Table } from '~/view/ui/components/common/Table';

import { RequestNewIntegrationModal } from './components/RequestNewIntegrationModal';
import { INTEGRATIONS_TABLE_COLUMNS } from './consts';

// TODO remove integrationsTestData when backend will be ready
const integrationsTestData = [
  {
    projectId: 2,
    name: 'Stripe',
    credentials: {
      login: 'test@appello.co',
      password: 'admin123',
      devApiKey: 'KMFkaslfa8782riunfhui78cfhfa89ca898sca',
      prodApiKey: 'KMFkaslfa8782riunfhui78cfhfa89ca898gt',
    },
  },
  {
    projectId: 2,
    name: 'Google Maps',
    credentials: {
      login: 'test@appello.co',
      password: 'admin123****',
      devApiKey: 'KMFkaslfa8782riunfhui78cfhfa89ca898sca',
      prodApiKey: 'KMFkaslfa8782riunfhui78cfhfa89ca898gt',
    },
  },
];

export const DevelopmentIntegrations: FC = () => {
  const {
    value: isRequestNewIntegrationModalOpen,
    on: openRequestNewIntegrationModal,
    off: closeRequestNewIntegrationModal,
  } = useSwitchValue(false);

  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const projectId = params.id ? Number(params.id) : 0;

  // const { data, loading } = useFetchDevelopmentIntegrationsQuery({
  //   variables: {
  //     data: { id: projectId },
  //   },
  // });

  // TODO remove test data later
  const data = {
    loading: false,
    integrationsList: integrationsTestData,
  };

  return (
    <div>
      <SectionContainer title="Integrations">
        <Table className="mt-2" data={data.integrationsList} columns={INTEGRATIONS_TABLE_COLUMNS} />
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
