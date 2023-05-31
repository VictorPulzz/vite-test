import React, { FC, useMemo } from 'react';
import { generatePath, Navigate, useParams } from 'react-router';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { useHasAccess } from '~/view/hooks/useHasAccess';

import { NoAccessMessage } from '../../../NoAccessMessage';

export const AvailableProjectRouteRedirect: FC = () => {
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;

  const canReadProjectOverview = useHasAccess(Permission.READ_PROJECT_OVERVIEW);
  const canReadProjectInfo = useHasAccess(Permission.READ_PROJECT_INFO);
  const canReadProjectTeam = useHasAccess(Permission.READ_PROJECT_TEAM);
  const canReadProjectDevelopment = useHasAccess(Permission.READ_PROJECT_DEVELOPMENT);
  const canReadWriteProjectDocs = useHasAccess(Permission.READ_WRITE_PROJECT_DOCS);
  const canReadProjectHistory = useHasAccess(Permission.READ_PROJECT_HISTORY);
  const canReadWriteProjectIntegrations = useHasAccess(Permission.READ_WRITE_PROJECT_INTEGRATIONS);

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
    <Navigate to={generatePath(availableProjectDetailsRoutes[0], { id: projectId })} replace />
  ) : (
    <NoAccessMessage />
  );
};
