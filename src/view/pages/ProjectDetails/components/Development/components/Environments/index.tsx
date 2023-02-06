import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { SectionContainer } from '~/view/components/SectionContainer';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { Table } from '~/view/ui/components/common/Table';

import { RequestNewEnvironmentModal } from './components/RequestNewEnvironmentModal';
import { ENVIRONMENTS_TABLE_COLUMNS } from './consts';

// TODO remove environmentsTestData when backend will be ready
const environmentsTestData = [
  {
    projectId: 2,
    id: 1,
    name: 'Dev',
    frontendCredentials: {
      url: 'swop-front-dev.appello.xyz',
      login: 'admin@admin.com',
      password: 'admin123',
    },
    backendCredentials: {
      url: 'swop-back-dev.appello.xyz',
      login: 'admin@admin.com',
      password: 'admin123',
    },
  },
  {
    projectId: 2,
    id: 2,
    name: 'Stage',
    frontendCredentials: {
      url: 'swop-front-stage.appello.xyz',
      login: 'admin@admin.com',
      password: 'admin123',
    },
    backendCredentials: {
      url: 'swop-back-stage.appello.xyz',
      login: 'admin@admin.com',
      password: 'admin123',
    },
  },
];

export const DevelopmentEnvironments: FC = () => {
  const {
    value: isRequestNewEnvironmentModalOpen,
    on: openRequestNeEnvironmentyModal,
    off: closeRequestNewEnvironmentModal,
  } = useSwitchValue(false);

  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const projectId = params.id ? Number(params.id) : 0;

  // const { data, loading } = useFetchProjectRepositoriesQuery({
  //   variables: {
  //     data: { id: projectId },
  //   },
  // });

  // TODO remove test data later
  const data = {
    loading: false,
    environmentsList: environmentsTestData,
  };

  return (
    <div>
      <SectionContainer title="Environments">
        <Table className="mt-3" data={data.environmentsList} columns={ENVIRONMENTS_TABLE_COLUMNS} />
        <Button
          variant={ButtonVariant.SECONDARY}
          label="Request new environment"
          className="mt-3 w-[180px]"
          onClick={openRequestNeEnvironmentyModal}
        />
      </SectionContainer>
      <RequestNewEnvironmentModal
        isOpen={isRequestNewEnvironmentModalOpen}
        close={closeRequestNewEnvironmentModal}
      />
    </div>
  );
};
