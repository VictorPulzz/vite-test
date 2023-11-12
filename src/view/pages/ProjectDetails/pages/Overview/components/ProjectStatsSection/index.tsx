import { ApolloError } from '@apollo/client';
import { Nullable, pick } from '@appello/common';
import { getGqlError } from '@appello/services';
import { IconContainer } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC, useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { SectionContainer } from '~/view/components/SectionContainer';

import { StatKey } from './consts';
import { getProjectStatsTitle } from './utils';

interface Props {
  projectStats: { [key: string]: Nullable<number> };
  projectStartData: string;
  projectId: number;
  projectEstimatedHours: number;
  error?: ApolloError;
}

export const ProjectStatsSection: FC<Props> = ({
  projectStats,
  error,
  projectId,
  projectEstimatedHours,
  projectStartData,
}) => {
  const navigate = useNavigate();
  const errorText = getGqlError(error?.graphQLErrors)?.explain?.non_field;

  const projectStatsData = useMemo(
    () => (projectStats ? pick(projectStats, Object.values(StatKey)) : null),
    [projectStats],
  );

  const statsData = useMemo(() => {
    return Object.entries(projectStatsData || {}).map(([key, value]) => ({
      stat: key === StatKey.ESTIMATED_HOURS ? projectEstimatedHours : value || 0,
      title: getProjectStatsTitle(key as StatKey, projectStartData),
      canChangeColor: key === StatKey.REMAINING_HOURS,
    }));
  }, [projectEstimatedHours, projectStartData, projectStatsData]);

  const isSmallPercentageOfRemainingHours = useMemo(
    () =>
      projectStats
        ? ((projectStatsData?.remainingHours || 0) / projectEstimatedHours) * 100 <= 30
        : null,
    [projectEstimatedHours, projectStats, projectStatsData?.remainingHours],
  );

  return (
    <SectionContainer
      rightHeaderElement={
        <button
          className="text-blue text-p2 hover:underline"
          type="button"
          onClick={() => navigate(generatePath(ROUTES.EDIT_PROJECT, { id: projectId }))}
        >
          Edit estimated hours
        </button>
      }
      title="Project overview"
    >
      {error && (
        <div className="flex items-center gap-2">
          <IconContainer
            className="w-8 h-8 bg-red/10"
            iconClassName="w-4 h-4 text-red"
            name="information"
          />
          <span className="text-red text-p4">{errorText}</span>
        </div>
      )}
      <div className="mt-4 grid gap-3 grid-cols-3">
        {statsData.map((item, index) => (
          <div className="p-4 border-solid border border-gray-5 rounded-md" key={index}>
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
