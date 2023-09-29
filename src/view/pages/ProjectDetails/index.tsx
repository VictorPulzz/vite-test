import { Button, ButtonVariant } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import { Tabs } from '@appello/web-ui';
import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { generatePath } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { RequestAccessMessage } from '~/view/components/RequestAccessMessage';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';
import { useUserProfile } from '~/view/hooks/useUserProfile';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { TabLayout } from '~/view/layouts/TabLayout';

import {
  useFetchNotSubmittedReportsCountQuery,
  useFetchProjectPreviewQuery,
} from './__generated__/schema';
import { useProjectTabs } from './hooks/useProjectTabs';

export const ProjectDetailsPage: FC = () => {
  const { profile, isAdminOrPM } = useUserProfile();

  const { canWriteProject } = useUserPermissions();

  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;

  const { data, loading } = useFetchProjectPreviewQuery({
    variables: {
      data: { id: projectId },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: notSubmittedReports } = useFetchNotSubmittedReportsCountQuery({
    variables: {
      filters: {
        projectId,
        submittedBy: isAdminOrPM ? null : profile.id,
        submitted: false,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const projectTabs = useProjectTabs({
    projectId,
    inTeam: !!data?.projectPreview.inTeam,
    notSubmittedReportsCount: notSubmittedReports?.reportList.count || 0,
  });

  const projectTabsElement = useMemo(
    () => <Tabs contentClassName="bg-gray-7 p-7 flex-auto" items={projectTabs} />,
    [projectTabs],
  );

  return (
    <TabLayout tabs={!loading && data?.projectPreview.inTeam && projectTabsElement}>
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
            {canWriteProject && (
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
          <RequestAccessMessage
            className="h-full"
            title={data.projectPreview.name}
            projectId={data.projectPreview.id}
            requestType={RequestTypeChoice.ACCESS_PROJECT}
          />
        </DetailLayout>
      )}
    </TabLayout>
  );
};
