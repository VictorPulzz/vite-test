import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import React, { FC } from 'react';

import { SectionContainer } from '~/view/components/SectionContainer';
import { FetchProjectEnvironmentsListQuery } from '~/view/pages/ProjectDetails/__generated__/schema';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';

import { CreateNewEnvironmentModal } from './components/CreateNewEnvironmentModal';
import { EnvironmentsList } from './components/EnvironmentsList';

interface Props {
  environments: FetchProjectEnvironmentsListQuery['projectEnvironmentList'];
}

export const DevelopmentEnvironments: FC<Props> = ({ environments }) => {
  const {
    value: isCreateNewEnvironmentModalOpen,
    on: openCreateNewEnvironmentModal,
    off: closeCreateNewEnvironmentModal,
  } = useSwitchValue(false);

  return (
    <div>
      <SectionContainer title="Environments">
        {environments.length === 0 && (
          <EmptyState iconName="repositories" label="No environments here yet" />
        )}
        {!!environments.length && <EnvironmentsList environments={environments} />}
        <Button
          variant={ButtonVariant.SECONDARY}
          label="Create new environment"
          className="mt-6 w-[180px]"
          onClick={openCreateNewEnvironmentModal}
        />
      </SectionContainer>
      <CreateNewEnvironmentModal
        isOpen={isCreateNewEnvironmentModalOpen}
        close={closeCreateNewEnvironmentModal}
      />
    </div>
  );
};
