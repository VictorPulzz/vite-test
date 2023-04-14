import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import React, { FC } from 'react';

import { Permission } from '~/constants/permissions';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { FetchProjectEnvironmentsListQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { CreateNewEnvironmentModal } from './components/CreateNewEnvironmentModal';
import { EnvironmentsList } from './components/EnvironmentsList';

interface Props {
  environments: FetchProjectEnvironmentsListQuery['projectEnvironmentList'];
}

export const DevelopmentEnvironments: FC<Props> = ({ environments }) => {
  const canCreateProjectEnvs = useHasAccess(Permission.CREATE_PROJECT_ENVS);

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
        {canCreateProjectEnvs && (
          <Button
            variant={ButtonVariant.SECONDARY}
            label="Create new environment"
            className="mt-6 w-[180px]"
            onClick={openCreateNewEnvironmentModal}
          />
        )}
      </SectionContainer>
      <CreateNewEnvironmentModal
        isOpen={isCreateNewEnvironmentModalOpen}
        close={closeCreateNewEnvironmentModal}
      />
    </div>
  );
};
