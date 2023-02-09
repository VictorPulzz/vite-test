import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import React, { FC } from 'react';

import { ProjectEnvironmentType } from '~/services/gql/__generated__/globalTypes';
import { SectionContainer } from '~/view/components/SectionContainer';
import { FetchProjectEnvironmentsListQuery } from '~/view/pages/ProjectDetails/__generated__/schema';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Table } from '~/view/ui/components/common/Table';

import { RequestNewEnvironmentModal } from './components/RequestNewEnvironmentModal';
import { ENVIRONMENTS_TABLE_COLUMNS } from './consts';

interface Props {
  environments: FetchProjectEnvironmentsListQuery['projectEnvironmentList'];
}

export const DevelopmentEnvironments: FC<Props> = ({ environments }) => {
  const {
    value: isRequestNewEnvironmentModalOpen,
    on: openRequestNewEnvironmentModal,
    off: closeRequestNewEnvironmentModal,
  } = useSwitchValue(false);

  return (
    <div>
      <SectionContainer title="Environments">
        {environments.length === 0 && (
          <EmptyState iconName="repositories" label="No environments here yet" />
        )}
        {!!environments.length && (
          <Table
            className="mt-3"
            data={environments as ProjectEnvironmentType[]}
            columns={ENVIRONMENTS_TABLE_COLUMNS}
          />
        )}
        <Button
          variant={ButtonVariant.SECONDARY}
          label="Request new environment"
          className="mt-3 w-[180px]"
          onClick={openRequestNewEnvironmentModal}
        />
      </SectionContainer>
      <RequestNewEnvironmentModal
        isOpen={isRequestNewEnvironmentModalOpen}
        close={closeRequestNewEnvironmentModal}
      />
    </div>
  );
};
