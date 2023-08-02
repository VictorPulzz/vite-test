import { Loader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import {
  useFetchProjectEstimatedHoursQuery,
  useFetchProjectStatsQuery,
} from '../../__generated__/schema';
import { ProjectStatsSection } from './components/ProjectStatsSection';

export const Overview: FC = () => {
  const params = useParams();
  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  const {
    data: projectStatsData,
    loading: isLoadingProjectStats,
    error,
  } = useFetchProjectStatsQuery({
    variables: {
      data: { id: projectId },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: projectEstimatedHours, loading: isLoadingProjectEstimatedHours } =
    useFetchProjectEstimatedHoursQuery({
      variables: {
        data: { id: projectId },
      },
    });

  const isLoading = isLoadingProjectStats || isLoadingProjectEstimatedHours;

  return (
    <>
      {isLoading && (
        <div className="flex h-full items-center">
          <Loader full colorful />
        </div>
      )}
      {(projectStatsData || error) && (
        <div className="flex flex-col gap-5">
          <ProjectStatsSection
            projectStats={projectStatsData?.projectStats || {}}
            projectId={projectId}
            projectEstimatedHours={projectEstimatedHours?.project.hoursEstimated || 0}
            error={error}
          />
        </div>
      )}
    </>
  );
};
