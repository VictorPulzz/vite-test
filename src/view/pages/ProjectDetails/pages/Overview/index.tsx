import { Loader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useUserPermissions } from '~/view/hooks/useUserPermissions';
import { useUserProfile } from '~/view/hooks/useUserProfile';

import {
  useFetchProjectEstimatedHoursQuery,
  useFetchProjectStatsQuery,
  useFetchProjectStatusReportAnswersQuery,
} from '../../__generated__/schema';
import { ProjectStatsSection } from './components/ProjectStatsSection';
import { ProjectStatusSection } from './components/ProjectStatusSection';

export const Overview: FC = () => {
  const { canReadProjectStatistics } = useUserPermissions();
  const { isAdminOrPM } = useUserProfile();

  const params = useParams();
  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  const {
    data: projectStatsData,
    loading: isLoadingProjectStats,
    error: projectStatsError,
  } = useFetchProjectStatsQuery({
    variables: {
      data: { id: projectId },
    },
    skip: !canReadProjectStatistics,
    fetchPolicy: 'cache-and-network',
  });

  const { data: projectEstimatedHours, loading: isLoadingProjectEstimatedHours } =
    useFetchProjectEstimatedHoursQuery({
      variables: {
        data: { id: projectId },
      },
      skip: !canReadProjectStatistics,
    });

  const { data: projectStatus, loading: isLoadingProjectStatus } =
    useFetchProjectStatusReportAnswersQuery({
      variables: {
        data: { id: projectId },
      },
      skip: !isAdminOrPM,
      fetchPolicy: 'cache-and-network',
    });

  const isLoading =
    isLoadingProjectStats || isLoadingProjectEstimatedHours || isLoadingProjectStatus;

  return (
    <>
      {isLoading && (
        <div className="flex h-full items-center">
          <Loader full colorful />
        </div>
      )}
      <div className="flex flex-col gap-5">
        {(projectStatsData || projectStatsError) && canReadProjectStatistics && (
          <ProjectStatsSection
            projectStats={projectStatsData?.projectStats.stats || {}}
            projectStartData={projectStatsData?.projectStats.startDate || ''}
            projectId={projectId}
            projectEstimatedHours={projectEstimatedHours?.project.hoursEstimated || 0}
            error={projectStatsError}
          />
        )}
        {isAdminOrPM && projectStatus && projectStatus.projectReportAnswers.length > 0 && (
          <ProjectStatusSection projectStatus={projectStatus.projectReportAnswers} />
        )}
      </div>
    </>
  );
};
