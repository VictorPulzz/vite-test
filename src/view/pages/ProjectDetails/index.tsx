import { Button, ButtonVariant } from '@ui/components/common/Button';
import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { generatePath } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import comingSoon from '~/view/assets/images/coming-soon.svg';
import { SectionContainer } from '~/view/components/SectionContainer';
import { TabLayout } from '~/view/layouts/TabLayout';
import { Loader } from '~/view/ui/components/common/Loader';
import { Tabs } from '~/view/ui/components/common/Tabs';

import { useFetchProjectDetailsQuery } from './__generated__/schema';
import { Development } from './components/Development';
import { Docs } from './components/Docs';
import { History } from './components/History';
import { Info } from './components/Info';
import { Reports } from './components/Reports';
import { Team } from './components/Team';
import styles from './styles.module.scss';

export const ProjectDetailsPage: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;

  const { data, loading } = useFetchProjectDetailsQuery({
    variables: {
      data: { id: projectId },
    },
  });

  const DocumentTabs = useMemo(
    () => (
      <Tabs
        className={styles['tabs']}
        contentClassName="bg-gray-7 p-7 flex-auto"
        items={[
          {
            title: 'Overview',
            element: (
              <div className="flex justify-center items-center h-[calc(70vh+2rem)]">
                <img src={comingSoon} alt="feature" />
              </div>
            ),
          },
          {
            title: 'Info',
            element: (
              <>
                {loading && <Loader full colorful />}
                {data && <Info projectInfo={data.project} />}
              </>
            ),
          },
          {
            title: 'Team',
            element: <Team />,
          },
          {
            title: 'Development',
            element: <Development />,
          },
          {
            title: 'Docs',
            element: (
              <SectionContainer containerClassName="min-h-[calc(100vh-12rem)]">
                <Docs withHeading projectId={projectId} />
              </SectionContainer>
            ),
          },
          {
            title: 'Reports',
            element: <Reports />,
          },
          {
            title: 'History',
            element: <History projectId={projectId} />,
          },
        ]}
      />
    ),
    [data, loading, projectId],
  );

  return (
    <TabLayout tabs={loading || DocumentTabs}>
      {loading && <Loader full colorful />}
      {data && (
        <div className="bg-white">
          <div className="flex items-center justify-between px-7 pt-7">
            <div className="flex items-center gap-4">
              <Button
                variant={ButtonVariant.SECONDARY}
                withIcon="left-arrow"
                onClick={() => navigate(ROUTES.PROJECTS)}
              />
              <div className="flex flex-col">
                <h2 className="text-h4 font-bold">{data?.project.name}</h2>
                <span className="text-c1 text-gray-2 leading-none">
                  Created{' '}
                  {format(new Date(data?.project.createdAt ?? new Date()), DateFormat.D_MMM_Y)} • by{' '}
                  {data?.project.createdBy?.fullName}
                </span>
              </div>
            </div>
            <Button
              variant={ButtonVariant.SECONDARY}
              label="Edit project"
              withIcon="edit"
              onClick={() => navigate(generatePath(ROUTES.EDIT_PROJECT, { id: projectId }))}
              className="w-[140px]"
            />
          </div>
        </div>
      )}
    </TabLayout>
  );
};
