import { Button, ButtonVariant } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import { Tabs } from '@appello/web-ui';
import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { generatePath } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { NoAccessMessage, NoAccessMessageVariant } from '~/view/components/NoAccessMessage';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { TabLayout } from '~/view/layouts/TabLayout';

import { useFetchProjectPreviewQuery } from './__generated__/schema';
import { Development } from './components/Development';
import { Docs } from './components/Docs';
import { History } from './components/History';
import { Info } from './components/Info';
import { Overview } from './components/Overview';
import { Reports } from './components/Reports';
import { SlackChannels } from './components/SlackChannels';
import { Team } from './components/Team';
import styles from './styles.module.scss';

export const ProjectDetailsPage: FC = () => {
  const canEditProject = useHasAccess(Permission.EDIT_PROJECT);
  const canReadProjectOverview = useHasAccess(Permission.READ_PROJECT_OVERVIEW);
  const canReadProjectInfo = useHasAccess(Permission.READ_PROJECT_INFO);
  const canReadProjectTeam = useHasAccess(Permission.READ_PROJECT_TEAM);
  const canReadProjectDevelopment = useHasAccess(Permission.READ_PROJECT_DEVELOPMENT);
  const canReadProjectDocs = useHasAccess(Permission.READ_PROJECT_DOCS);
  const canReadProjectHistory = useHasAccess(Permission.READ_PROJECT_HISTORY);

  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;

  const { data, loading } = useFetchProjectPreviewQuery({
    variables: {
      data: { id: projectId },
    },
    fetchPolicy: 'cache-and-network',
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
            element: canReadProjectTeam ? <Team /> : <NoAccessMessage className="h-[70vh]" />,
          },
          {
            title: 'Development',
            element: canReadProjectDevelopment ? (
              <Development />
            ) : (
              <NoAccessMessage className="h-[70vh]" />
            ),
          },
          {
            title: 'Docs',
            element: canReadProjectDocs ? (
              <div className="h-full">
                <SectionContainer containerClassName="h-full">
                  <Docs isProjectDetailsPage projectId={projectId} />
                </SectionContainer>
              </div>
            ) : (
              <NoAccessMessage className="h-[70vh]" />
            ),
          },
          {
            title: 'Slack',
            element: <SlackChannels projectId={projectId} />,
          },
          {
            title: 'Reports',
            element: <Reports />,
          },
          {
            title: 'History',
            element: canReadProjectHistory ? (
              <History projectId={projectId} />
            ) : (
              <NoAccessMessage className="h-[70vh]" />
            ),
          },
        ]}
      />
    ),
    [
      canReadProjectDevelopment,
      canReadProjectDocs,
      canReadProjectHistory,
      canReadProjectInfo,
      canReadProjectOverview,
      canReadProjectTeam,
      projectId,
    ],
  );

  return (
    <TabLayout tabs={!loading && data?.projectPreview.inTeam && DocumentTabs}>
      {loading && <Loader full colorful />}
      {!loading && data && data.projectPreview.inTeam && (
        <div className="bg-white">
          <div className="flex items-center justify-between px-7 pt-7 gap-6">
            <div className="flex items-center gap-4">
              <Button
                variant={ButtonVariant.SECONDARY}
                withIcon="left-arrow"
                onClick={() => navigate(-1)}
              />
              <div className="flex flex-col w-[65vw]">
                <h2 className="text-h4 font-bold break-words leading-6">
                  {data.projectPreview.name}
                </h2>
                <span className="text-p5 text-gray-2">
                  Created {format(new Date(data.projectPreview.createdAt), DateFormat.D_MMM_Y)} • by{' '}
                  {data.projectPreview.createdBy?.fullName}
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
      {!loading && data && !data.projectPreview.inTeam && (
        <DetailLayout contentClassName="flex-auto">
          <NoAccessMessage
            className="h-full"
            title={data.projectPreview.name}
            projectId={data.projectPreview.id}
            variant={NoAccessMessageVariant.REQUEST}
            requestType={RequestTypeChoice.ACCESS_PROJECT}
          />
        </DetailLayout>
      )}
    </TabLayout>
  );
};
