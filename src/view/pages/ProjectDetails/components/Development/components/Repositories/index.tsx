import { makeQueryString } from '@appello/common/lib/utils';
import React, { FC } from 'react';

import { ROUTES } from '~/constants/routes';
import { RepositoryType } from '~/services/gql/__generated__/globalTypes';
import { SectionContainer } from '~/view/components/SectionContainer';
import { FetchProjectRepositoriesListQuery } from '~/view/pages/ProjectDetails/__generated__/schema';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Table } from '~/view/ui/components/common/Table';

// import { RequestNewRepositoryModal } from './components/RequestNewRepositoryModal';
import { REPOSITORIES_TABLE_COLUMNS } from './consts';

interface Props {
  repositories: FetchProjectRepositoriesListQuery['projectRepositoryList'];
  projectId: number;
}

export const DevelopmentRepositories: FC<Props> = ({ repositories, projectId }) => {
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
            columns={REPOSITORIES_TABLE_COLUMNS}
          />
        )}
        <Button
          variant={ButtonVariant.SECONDARY}
          label="Create new repo"
          className="mt-3 w-[140px]"
          to={`${ROUTES.ADD_REPOSITORY}${makeQueryString({ projectId })}`}
        />
      </SectionContainer>
      {/* <RequestNewRepositoryModal
        isOpen={isRequestNewRepositoryModalOpen}
        close={closeRequestNewRepositoryModal}
      /> */}
    </div>
  );
};
