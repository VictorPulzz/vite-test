import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Table } from '~/view/ui/components/common/Table';

import { AddRepositoryModal } from './components/AddRepositoryModal';
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
  },
  {
    projectId: 4,
    repositoryId: 2,
    repositoryName: 'Pic-up-customer-mobile',
    projectName: 'PicUp',
    gitUrl: 'https://bitbucket.org/appello/pic-up-customer-mobile',
    createdAt: '29/10/2022',
    platform: 'Mobile',
  },
];

export const Repositories: FC = () => {
  const {
    value: isAddRepositoryModalOpen,
    on: openAddRepositoryModal,
    off: closeAddRepositoryModal,
  } = useSwitchValue(false);
  // TODO remove participantsTestData when backend will be ready
  //   const participantsTestData = new Array(9).fill(participantTestData);

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
    repositoriesList: repositoriesTestData,
  };

  return (
    <>
      {data.loading && <span>LOADING</span>}
      {data && data.repositoriesList.length === 0 && (
        <EmptyState iconName="repositories" label="No repositories here yet" />
      )}
      {!data.loading && data && data.repositoriesList.length > 0 && (
        <Table className="px-2" data={data.repositoriesList} columns={REPOSITORIES_TABLE_COLUMNS} />
      )}

      <Button
        variant={ButtonVariant.SECONDARY}
        label="Request new repo"
        className={`mt-3 w-[136px] ${!data.repositoriesList.length && 'mx-auto'}`}
        onClick={openAddRepositoryModal}
      />
      <AddRepositoryModal isOpen={isAddRepositoryModalOpen} close={closeAddRepositoryModal} />
    </>
  );
};
