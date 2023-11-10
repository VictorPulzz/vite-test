import React, { FC, useMemo } from 'react';
import { generatePath, Navigate, useParams } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

import { NoAccessMessage } from '../../../NoAccessMessage';

export const AvailableProjectRouteRedirect: FC = () => {
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;

  const {
    canReadProjectOverview,
    canReadProjectInfo,
    canReadProjectTeam,
    canReadProjectDevelopment,
    canReadWriteProjectDocs,
    canReadProjectHistory,
    canReadWriteProjectIntegrations,
  } = useUserPermissions();

  const availableProjectDetailsRoutes = useMemo(
    () =>
      [
        canReadProjectOverview && ROUTES.PROJECT_DETAILS_OVERVIEW,
        canReadProjectInfo && ROUTES.PROJECT_DETAILS_INFO,
        canReadProjectTeam && ROUTES.PROJECT_DETAILS_TEAM,
        canReadProjectDevelopment && ROUTES.PROJECT_DETAILS_DEVELOPMENT,
        canReadWriteProjectDocs && ROUTES.PROJECT_DETAILS_DOCUMENTS,
        ROUTES.PROJECT_DETAILS_REPORTS,
        canReadProjectHistory && ROUTES.PROJECT_DETAILS_HISTORY,
        canReadWriteProjectIntegrations && ROUTES.PROJECT_DETAILS_INTEGRATIONS,
      ].filter((route): route is string => !!route),
    [
      canReadProjectDevelopment,
      canReadProjectHistory,
      canReadProjectInfo,
      canReadProjectOverview,
      canReadProjectTeam,
      canReadWriteProjectDocs,
      canReadWriteProjectIntegrations,
    ],
  );

  return availableProjectDetailsRoutes.length > 0 ? (
    <Navigate replace to={generatePath(availableProjectDetailsRoutes[0], { id: projectId })} />
  ) : (
    <NoAccessMessage />
  );
};
