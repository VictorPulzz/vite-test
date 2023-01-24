import React, { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProgressBarWithSteps } from '~/view/components/ProgressBarWithSteps';
import { Tabs } from '~/view/components/Tabs';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { TextLink } from '~/view/ui/components/common/TextLink';

import { useFetchProjectDetailsQuery } from './__generated__/schema';
import { PROJECT_DETAILS_TABS } from './consts';
import styles from './styles.module.scss';

export const ProjectDetailsPage: FC = () => {
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;

  const { data, loading } = useFetchProjectDetailsQuery({
    variables: {
      data: { id: projectId },
    },
  });

  const [activeTabId, setActiveTabId] = useState<number>(1);

  const handleActiveTabChange = useCallback((index: number) => setActiveTabId(index), []);

  // TODO remove test progressBar data
  const currentStep = 3;

  return (
    <SidebarLayout>
      <DetailLayout title="Project details">
        {loading ? (
          <span>LOADING</span>
        ) : (
          <div className="flex flex-col p-6 gap-5">
            <div className="shadow-4 bg-white rounded-md w-full p-7">
              <ProgressBarWithSteps currentStep={currentStep} />
            </div>
            <div className="flex gap-5">
              <div className="shadow-4 bg-white rounded-md p-7 w-[382px] min-w-[382px]">
                <div className={styles['section']}>
                  <h2 className="mb-3 text-p1 font-bold">Project info</h2>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Name</span>
                      <span className="text-p3 text-blue leading-none">{data?.project.name}</span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Phase</span>
                      <span className="text-p3 text-blue leading-none">Development</span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Status</span>
                      <span className="text-p3 text-primary leading-none">Pre-release</span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Estimated dates</span>
                      <span className="text-p3 text-primary leading-none">
                        2 Mar 2020 - 25 Dec 2022
                      </span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Estimated hours</span>
                      <span className="text-p3 text-primary leading-none">1047</span>
                    </div>
                    <div className="flex flex-col gap-[2px] break-words">
                      <span className="text-c1 text-gray-2">Design link</span>
                      <TextLink
                        external
                        to="https://www.figma.com/file/8T6cuBdFJeUz4jwBzfZE7h/Untitled?node-id=1%3A4275&t=YqWzSw0DCpWG9RMx-0"
                        className="text-p3 text-blue leading-none hover:underline"
                      >
                        https://www.figma.com/file/8T6cuBdFJeUz4jwBzfZE7h/Untitled?node-id=1%3A4275&t=YqWzSw0DCpWG9RMx-0
                      </TextLink>
                    </div>
                  </div>
                </div>
                <div className={styles['section']}>
                  <h2 className="mb-3 text-p1 font-bold">Client details</h2>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Name</span>
                      <span className="text-p3 leading-none">Brendan</span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Phone number</span>
                      <span className="text-p3 leading-none">0347265937</span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Notes</span>
                      <span className="text-p3 leading-none">Some useful notes here</span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Client team</span>
                      <div className="flex justify-between">
                        <span className="text-p3 leading-none">Taylor (Manager)</span>
                        <span className="text-p3 leading-none">+61726485996</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shadow-4 bg-white rounded-md flex-auto p7">
                <Tabs
                  activeTabId={activeTabId}
                  tabs={PROJECT_DETAILS_TABS}
                  onChange={handleActiveTabChange}
                  tabsClassName="border-b-[1px] border-solid text-gray-6 pt-7 px-7"
                  tabsPanelClassName="p-6"
                >
                  {activeTabId === 1 && <span>Participants</span>}
                  {activeTabId === 2 && <span>Docs</span>}
                  {activeTabId === 3 && <span>Credentials</span>}
                  {activeTabId === 4 && <span>Estimations</span>}
                  {activeTabId === 5 && <span>Notes</span>}
                  {activeTabId === 6 && <span>History</span>}
                  {activeTabId === 7 && <span>Repositories</span>}
                </Tabs>
              </div>
            </div>
          </div>
        )}
      </DetailLayout>
    </SidebarLayout>
  );
};
