import { ApolloError } from '@apollo/client';
import { getGqlError } from '@appello/common/lib/services/gql/utils';
import { pick } from '@appello/common/lib/utils/object/pick';
import { IconContainer } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC, useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { SectionContainer } from '~/view/components/SectionContainer';

import { PROJECT_STATS_TITLES, StatsTitlesType } from './consts';

interface Props {
  projectStats: { [key: string]: Nullable<number> };
  projectId: number;
  projectEstimatedHours: number;
  error?: ApolloError;
}

export const ProjectStatsSection: FC<Props> = ({
  projectStats,
  error,
  projectId,
  projectEstimatedHours,
}) => {
  const navigate = useNavigate();
  const errorText = getGqlError(error?.graphQLErrors)?.explain?.non_field;

  const projectStatsData = useMemo(
    () => (projectStats ? pick(projectStats, Object.keys(PROJECT_STATS_TITLES)) : null),
    [projectStats],
  );

  const statsData = useMemo(() => {
    return Object.entries(projectStatsData || {}).map(([key, value]) => ({
      stat:
        PROJECT_STATS_TITLES[key as keyof StatsTitlesType] ===
        PROJECT_STATS_TITLES['estimatedHours']
          ? projectEstimatedHours
          : value || 0,
      title: PROJECT_STATS_TITLES[key as keyof StatsTitlesType],
      canChangeColor:
        PROJECT_STATS_TITLES[key as keyof StatsTitlesType] ===
        PROJECT_STATS_TITLES['remainingHours'],
    }));
  }, [projectEstimatedHours, projectStatsData]);

  const isSmallPercentageOfRemainingHours = useMemo(
    () =>
      projectStats
        ? ((projectStatsData?.remainingHours || 0) / projectEstimatedHours) * 100 <= 30
        : null,
    [projectEstimatedHours, projectStats, projectStatsData?.remainingHours],
  );

  return (
    <SectionContainer
      title="Project overview"
      rightHeaderElement={
        <button
          type="button"
          onClick={() => navigate(generatePath(ROUTES.EDIT_PROJECT, { id: projectId }))}
          className="text-blue text-p2 hover:underline"
        >
          Edit estimated hours
        </button>
      }
    >
      {error && (
        <div className="flex items-center gap-2">
          <IconContainer
            name="information"
            className="w-8 h-8 bg-red/10"
            iconClassName="w-4 h-4 text-red"
          />
          <span className="text-red text-p4">{errorText}</span>
        </div>
      )}
      <div className="mt-4 grid gap-3 grid-cols-3">
        {statsData.map((item, index) => (
          <div key={index} className="p-4 border-solid border border-gray-5 rounded-md">
            <h3
              className={clsx(
                'text-h4 text-blue font-bold leading-none',
                item.canChangeColor && isSmallPercentageOfRemainingHours && 'text-orange',
              )}
            >
              {item.stat}
            </h3>
            <span className="text-p5 text-black-2 ">{item.title}</span>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};
