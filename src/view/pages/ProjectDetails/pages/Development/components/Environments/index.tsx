import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import React, { FC } from 'react';

import { RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { NewRequestModal } from '~/view/components/NewRequestModal';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';
import {
  FetchEnvsRequestsListQuery,
  FetchProjectEnvironmentsListQuery,
} from '~/view/pages/ProjectDetails/__generated__/schema';

import { CreateOrUpdateEnvironmentModal } from './components/CreateOrUpdateEnvironmentModal';
import { EnvironmentsList } from './components/EnvironmentsList';

interface Props {
  environments: FetchProjectEnvironmentsListQuery['projectEnvironmentList'];
  envsRequests: FetchEnvsRequestsListQuery['requestList']['results'];
  projectId: number;
}

export const DevelopmentEnvironments: FC<Props> = ({ environments, envsRequests, projectId }) => {
  const { canWriteProjectEnvs } = useUserPermissions();

  const {
    value: isCreateOrUpdateEnvironmentModalOpen,
    on: openCreateOrUpdateEnvironmentModal,
    off: closeCreateOrUpdateEnvironmentModal,
  } = useSwitchValue(false);

  const {
    value: isNewRequestModalOpen,
    on: openNewRequestModal,
    off: closeNewRequestModal,
  } = useSwitchValue(false);

  return (
    <div>
      <SectionContainer title="Environments">
        {environments.length === 0 && envsRequests.length === 0 && (
          <EmptyState iconName="repositories" label="No environments here yet" />
        )}
        {(!!environments.length || !!envsRequests.length) && (
          <EnvironmentsList environments={environments} envsRequests={envsRequests} />
        )}
        <Button
          variant={ButtonVariant.SECONDARY}
          label={`${canWriteProjectEnvs ? 'Create' : 'Request'} new environment`}
          className="mt-6 w-[190px]"
          onClick={canWriteProjectEnvs ? openCreateOrUpdateEnvironmentModal : openNewRequestModal}
        />
      </SectionContainer>
      <CreateOrUpdateEnvironmentModal
        isOpen={isCreateOrUpdateEnvironmentModalOpen}
        close={closeCreateOrUpdateEnvironmentModal}
      />
      {isNewRequestModalOpen && (
        <NewRequestModal
          isOpen={isNewRequestModalOpen}
          close={closeNewRequestModal}
          requestType={RequestTypeChoice.CREATION_ENVIRONMENT}
          projectId={projectId}
        />
      )}
    </div>
  );
};
