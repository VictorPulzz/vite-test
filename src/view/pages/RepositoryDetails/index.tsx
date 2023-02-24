import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RepositoryPlatformChoice } from '~/services/gql/__generated__/globalTypes';
import { Tabs } from '~/view/components/Tabs';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Badge, BadgeColor } from '~/view/ui/components/common/Badge';
import { Icon } from '~/view/ui/components/common/Icon';
import { TextLink } from '~/view/ui/components/common/TextLink';

import { Participants } from './components/Partisipants';
import { UpdateRepositoryModal } from './components/UpdateRepositoryModal';
// import { useFetchRepositoryDetailsQuery } from './__generated__/schema';
import { REPOSITORY_DETAILS_TABS } from './consts';
import styles from './styles.module.scss';

// TODO remove repositoriesTestData when backend will be ready
const repositoriesTestData = [
  {
    projectId: 2,
    repositoryId: 1,
    repositoryName: 'Pic-up-web-frontend',
    projectName: 'PicUp',
    gitUrl: 'https://bitbucket.org/appello/pic-up-web-frontend',
    gitTerraformUrl: 'https://bitbucket.org/appello/pic-up-web-frontend',
    createdAt: '28/10/2022',
    platform: 'Web',
  },
  {
    projectId: 4,
    repositoryId: 2,
    repositoryName: 'Pic-up-customer-mobile',
    projectName: 'PicUp',
    gitUrl: 'https://bitbucket.org/appello/pic-up-customer-mobile',
    gitTerraformUrl: null,
    createdAt: '29/10/2022',
    platform: 'Mobile',
  },
];

export const RepositoryDetailsPage: FC = () => {
  const {
    value: isUpdateRepositoryModalOpen,
    on: openUpdateRepositoryModal,
    off: closeUpdateRepositoryModal,
  } = useSwitchValue(false);

  const params = useParams();
  const repositoryId = params.id ? Number(params.id) : 0;

  // TODO remove employeeById when backend will be ready
  const repositoryById = useMemo(
    () => repositoriesTestData.find(repository => repository.repositoryId === repositoryId),
    [repositoryId],
  );

  // const { data, loading } = useFetchRepositoryDetailsQuery({
  //   variables: {
  //     data: { id: repositoryId },
  //   },
  // });

  // TODO remove when backend will be ready
  const loading = false;

  const [activeTabId, setActiveTabId] = useState<number>(1);

  const handleActiveTabChange = useCallback((index: number) => setActiveTabId(index), []);

  return (
    <SidebarLayout>
      <DetailLayout title="Repository details">
        {loading ? (
          <span>LOADING</span>
        ) : (
          <div className="flex gap-5 p-6">
            <div className="shadow-4 bg-white rounded-md p-7 w-[382px] min-w-[382px]">
              <div className={styles['section']}>
                <div className="flex gap-2 mb-3 ">
                  <h2 className="text-p1 font-bold">Info</h2>
                  <button
                    type="button"
                    className="hover:opacity-70"
                    onClick={openUpdateRepositoryModal}
                  >
                    <Icon name="pencil" size={14} className="text-blue " />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Name</span>
                    <span className="text-p3 text-blue leading-none">
                      {repositoryById?.repositoryName}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Project</span>
                    <span className="text-p3 text-blue leading-none">
                      {repositoryById?.projectName}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Git url</span>
                    <TextLink
                      external
                      to={repositoryById?.gitUrl}
                      className="text-p3 text-blue leading-none hover:underline"
                    >
                      {repositoryById?.gitUrl}
                    </TextLink>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Created at</span>
                    <span className="text-p3 text-primary leading-none">
                      {repositoryById?.createdAt}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Git Terraform url</span>
                    {repositoryById?.gitTerraformUrl ? (
                      <TextLink
                        external
                        to={repositoryById?.gitTerraformUrl}
                        className="text-p3 text-blue leading-none hover:underline"
                      >
                        {repositoryById?.gitTerraformUrl ?? '-'}
                      </TextLink>
                    ) : (
                      <span className="text-p3 text-primary leading-none">-</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Platform</span>
                    <Badge
                      color={
                        repositoryById?.platform.toUpperCase() === RepositoryPlatformChoice.DESKTOP
                          ? BadgeColor.GREEN
                          : BadgeColor.GRAY
                      }
                    >
                      {repositoryById?.platform}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-4 bg-white rounded-md flex-auto p7">
              <Tabs
                activeTabId={activeTabId}
                tabs={REPOSITORY_DETAILS_TABS}
                onChange={handleActiveTabChange}
                tabsClassName="border-b-[1px] border-solid text-gray-6 pt-7 px-7"
                tabsPanelClassName="p-6"
              >
                {activeTabId === 1 && <Participants />}
              </Tabs>
            </div>
            <UpdateRepositoryModal
              isOpen={isUpdateRepositoryModalOpen}
              close={closeUpdateRepositoryModal}
            />
          </div>
        )}
      </DetailLayout>
    </SidebarLayout>
  );
};
