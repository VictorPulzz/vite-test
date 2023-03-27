import { Button, ButtonVariant } from '@ui/components/common/Button';
import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { generatePath } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { NoAccessMessage } from '~/view/components/NoAccessMessage';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { TabLayout } from '~/view/layouts/TabLayout';
import { Loader } from '~/view/ui/components/common/Loader';
import { Tabs } from '~/view/ui/components/common/Tabs';

import { useFetchProjectPreviewQuery } from './__generated__/schema';
import { Development } from './components/Development';
import { Docs } from './components/Docs';
import { History } from './components/History';
import { Info } from './components/Info';
import { Overview } from './components/Overview';
import { Reports } from './components/Reports';
import { Team } from './components/Team';
import styles from './styles.module.scss';

export const ProjectDetailsPage: FC = () => {
  const canEditProject = useHasAccess(Permission.EDIT_PROJECT);
  const canReadProjectOverview = useHasAccess(Permission.READ_PROJECT_OVERVIEW);
  const canReadProjectInfo = useHasAccess(Permission.READ_PROJECT_INFO);
  const canReadProjectDocs = useHasAccess(Permission.READ_PROJECT_DOCS);

  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;

  const { data, loading } = useFetchProjectPreviewQuery({
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
            element: canReadProjectOverview ? (
              <Overview />
            ) : (
              <NoAccessMessage className="h-[70vh]" />
            ),
          },
          {
            title: 'Info',
            element: canReadProjectInfo ? (
              <Info projectId={projectId} />
            ) : (
              <NoAccessMessage className="h-[70vh]" />
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
            element: canReadProjectDocs ? (
              <SectionContainer containerClassName="min-h-[calc(100vh-12rem)]">
                <Docs isProjectDetailsPage projectId={projectId} />
              </SectionContainer>
            ) : (
              <NoAccessMessage className="h-[70vh]" />
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
    [canReadProjectDocs, canReadProjectInfo, canReadProjectOverview, projectId],
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
                <h2 className="text-h4 font-bold">{data?.projectPreview.name}</h2>
                <span className="text-c1 text-gray-2 leading-none">
                  Created{' '}
                  {format(
                    new Date(data?.projectPreview.createdAt ?? new Date()),
                    DateFormat.D_MMM_Y,
                  )}{' '}
                  • by {data?.projectPreview.createdBy?.fullName}
                </span>
              </div>
            </div>
            {canEditProject && (
              <Button
                variant={ButtonVariant.SECONDARY}
                label="Edit project"
                withIcon="edit"
                onClick={() => navigate(generatePath(ROUTES.EDIT_PROJECT, { id: projectId }))}
                className="w-[140px]"
              />
            )}
          </div>
        </div>
      )}
    </TabLayout>
  );
};
