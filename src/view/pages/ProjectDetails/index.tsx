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
import { RequestAccessMessage } from '~/view/components/RequestAccessMessage';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { TabLayout } from '~/view/layouts/TabLayout';

import { useFetchProjectPreviewQuery } from './__generated__/schema';
import { useProjectTabs } from './hooks/useProjectTabs';
import styles from './styles.module.scss';

export const ProjectDetailsPage: FC = () => {
  const canWriteProject = useHasAccess(Permission.WRITE_PROJECT);

  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;

  const { data, loading } = useFetchProjectPreviewQuery({
    variables: {
      data: { id: projectId },
    },
    fetchPolicy: 'cache-and-network',
  });

  const projectTabs = useProjectTabs({ projectId, inTeam: !!data?.projectPreview.inTeam });

  const projectTabsElement = useMemo(
    () => (
      <Tabs
        className={styles['tabs']}
        contentClassName="bg-gray-7 p-7 flex-auto"
        items={projectTabs}
      />
    ),
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
