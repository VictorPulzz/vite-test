import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { SectionContainer } from '~/view/components/SectionContainer';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { Table } from '~/view/ui/components/common/Table';

import { RequestNewRepositoryModal } from './components/RequestNewRepositoryModal';
import { REPOSITORIES_TABLE_COLUMNS } from './consts';

// TODO remove repositoriesTestData when backend will be ready
const repositoriesTestData = [
  {
    projectId: 2,
    repositoryId: 1,
    repositoryName: 'Pic-up-web-frontend',
    projectName: 'PicUp',
    gitUrl: 'https://bitbucket.org/appello/pic-up-web-frontend',
    createdAt: '28/10/2022',
    platform: 'Web',
    type: 'Frontend',
  },
  {
    projectId: 4,
    repositoryId: 2,
    repositoryName: 'Pic-up-customer-mobile',
    projectName: 'PicUp',
    gitUrl: 'https://bitbucket.org/appello/pic-up-customer-mobile',
    createdAt: '29/10/2022',
    platform: 'Mobile',
    type: 'Backend',
  },
];

export const DevelopmentRepositories: FC = () => {
  const {
    value: isRequestNewRepositoryModalOpen,
    on: openRequestNewRepositoryModal,
    off: closeRequestNewRepositoryModal,
  } = useSwitchValue(false);

  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const projectId = params.id ? Number(params.id) : 0;

  // const { data, loading } = useFetchDevelopmentRepositoriesQuery({
  //   variables: {
  //     data: { id: projectId },
  //   },
  // });

  // TODO remove test data later
  const data = {
    loading: false,
    repositoriesList: repositoriesTestData,
  };

  return (
    <div>
      <SectionContainer title="Repositories">
        {!!data.repositoriesList.length && (
          <Table
            className="mt-3"
            data={data.repositoriesList}
            columns={REPOSITORIES_TABLE_COLUMNS}
          />
        )}
        <Button
          variant={ButtonVariant.SECONDARY}
          label="Request new repo"
          className="mt-3 w-[140px]"
          onClick={openRequestNewRepositoryModal}
        />
      </SectionContainer>
      <RequestNewRepositoryModal
        isOpen={isRequestNewRepositoryModalOpen}
        close={closeRequestNewRepositoryModal}
      />
    </div>
  );
};
