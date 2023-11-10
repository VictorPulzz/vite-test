import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { makeQueryString } from '@appello/common/lib/utils';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import React, { FC } from 'react';

import { ROUTES } from '~/constants/routes';
import { RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { NewRequestModal } from '~/view/components/NewRequestModal';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';
import { FetchProjectRepositoriesListQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { useDevelopmentReposTableColumns } from './hooks/useDevelopmentReposTableColumns';

interface Props {
  repositories: FetchProjectRepositoriesListQuery['projectRepositoryList']['projectRepositories'];
  projectId: number;
}

export const DevelopmentRepositories: FC<Props> = ({ repositories, projectId }) => {
  const { canCreateRepository } = useUserPermissions();

  const reposTableColumns = useDevelopmentReposTableColumns();

  const {
    value: isNewRequestModalOpen,
    on: openNewRequestModal,
    off: closeNewRequestModal,
  } = useSwitchValue(false);

  return (
    <div>
      <SectionContainer title="Repositories">
        {repositories?.length === 0 && (
          <EmptyState iconName="repositories" label="No repositories here yet" />
        )}
        {!!repositories?.length && (
          <Table className="mt-3" columns={reposTableColumns} data={repositories} />
        )}
        {canCreateRepository ? (
          <Button
            className="mt-3 w-[140px]"
            label="Create new repo"
            to={`${ROUTES.ADD_REPOSITORY}${makeQueryString({ projectId })}`}
            variant={ButtonVariant.SECONDARY}
          />
        ) : (
          <Button
            className="mt-3 w-[140px]"
            label="Request new repo"
            variant={ButtonVariant.SECONDARY}
            onClick={openNewRequestModal}
          />
        )}
      </SectionContainer>
      {isNewRequestModalOpen && (
        <NewRequestModal
          close={closeNewRequestModal}
          isOpen={isNewRequestModalOpen}
          projectId={projectId}
          requestType={RequestTypeChoice.CREATION_REPOSITORY}
        />
      )}
    </div>
  );
};
