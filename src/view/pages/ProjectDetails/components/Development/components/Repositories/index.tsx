import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { makeQueryString } from '@appello/common/lib/utils';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import React, { FC } from 'react';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { NewRequestModal } from '~/view/components/NewRequestModal';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { FetchProjectRepositoriesListQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { useDevelopmentReposTableColumns } from './hooks/useDevelopmentReposTableColumns';

interface Props {
  repositories: FetchProjectRepositoriesListQuery['projectRepositoryList'];
  projectId: number;
}

export const DevelopmentRepositories: FC<Props> = ({ repositories, projectId }) => {
  const canCreateRepository = useHasAccess(Permission.CREATE_REPOSITORY);

  const reposTableColumns = useDevelopmentReposTableColumns();

  const {
    value: isNewRequestModalOpen,
    on: openNewRequestModal,
    off: closeNewRequestModal,
  } = useSwitchValue(false);

  return (
    <div>
      <SectionContainer title="Repositories">
        {repositories.length === 0 && (
          <EmptyState iconName="repositories" label="No repositories here yet" />
        )}
        {!!repositories.length && (
          <Table className="mt-3" data={repositories} columns={reposTableColumns} />
        )}
        {canCreateRepository ? (
          <Button
            variant={ButtonVariant.SECONDARY}
            label="Create new repo"
            className="mt-3 w-[140px]"
            to={`${ROUTES.ADD_REPOSITORY}${makeQueryString({ projectId })}`}
          />
        ) : (
          <Button
            variant={ButtonVariant.SECONDARY}
            label="Request new repo"
            className="mt-3 w-[140px]"
            onClick={openNewRequestModal}
          />
        )}
      </SectionContainer>
      {isNewRequestModalOpen && (
        <NewRequestModal
          isOpen={isNewRequestModalOpen}
          close={closeNewRequestModal}
          requestType={RequestTypeChoice.CREATION_REPOSITORY}
          projectId={projectId}
        />
      )}
    </div>
  );
};
