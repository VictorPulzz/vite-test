import { makeQueryString } from '@appello/common/lib/utils';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import React, { FC } from 'react';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { RepositoryType } from '~/services/gql/__generated__/globalTypes';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { FetchProjectRepositoriesListQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

// import { RequestNewRepositoryModal } from './components/RequestNewRepositoryModal';
import { REPOSITORIES_TABLE_COLUMNS, REPOSITORIES_TABLE_COLUMNS_NO_DETAILS } from './consts';

interface Props {
  repositories: FetchProjectRepositoriesListQuery['projectRepositoryList'];
  projectId: number;
}

export const DevelopmentRepositories: FC<Props> = ({ repositories, projectId }) => {
  const canCreateRepository = useHasAccess(Permission.CREATE_REPOSITORY);
  const canReadRepoDetails = useHasAccess(Permission.READ_REPO_DETAILS);

  // TODO Remove comments when requests functionality will be ready
  // const {
  //   value: isRequestNewRepositoryModalOpen,
  //   on: openRequestNewRepositoryModal,
  //   off: closeRequestNewRepositoryModal,
  // } = useSwitchValue(false);

  return (
    <div>
      <SectionContainer title="Repositories">
        {repositories.length === 0 && (
          <EmptyState iconName="repositories" label="No repositories here yet" />
        )}
        {!!repositories.length && (
          <Table
            className="mt-3"
            data={repositories as RepositoryType[]}
            columns={
              canReadRepoDetails
                ? REPOSITORIES_TABLE_COLUMNS
                : REPOSITORIES_TABLE_COLUMNS_NO_DETAILS
            }
          />
        )}
        {canCreateRepository && (
          <Button
            variant={ButtonVariant.SECONDARY}
            label="Create new repo"
            className="mt-3 w-[140px]"
            to={`${ROUTES.ADD_REPOSITORY}${makeQueryString({ projectId })}`}
          />
        )}
      </SectionContainer>
      {/* <RequestNewRepositoryModal
        isOpen={isRequestNewRepositoryModalOpen}
        close={closeRequestNewRepositoryModal}
      /> */}
    </div>
  );
};
