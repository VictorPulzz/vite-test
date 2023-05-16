import { Tab } from '@appello/web-ui';
import React from 'react';
import { generatePath, Outlet } from 'react-router';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { NoAccessMessage } from '~/view/components/NoAccessMessage';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';

interface UseProjectTabsOptions {
  projectId: number;
  inTeam?: boolean;
}

export function useProjectTabs({ projectId, inTeam }: UseProjectTabsOptions): Tab[] {
  const canReadProjectOverview = useHasAccess(Permission.READ_PROJECT_OVERVIEW);
  const canReadProjectInfo = useHasAccess(Permission.READ_PROJECT_INFO);
  const canReadProjectTeam = useHasAccess(Permission.READ_PROJECT_TEAM);
  const canReadProjectDevelopment = useHasAccess(Permission.READ_PROJECT_DEVELOPMENT);
  const canReadWriteProjectDocs = useHasAccess(Permission.READ_WRITE_PROJECT_DOCS);
  const canReadProjectHistory = useHasAccess(Permission.READ_PROJECT_HISTORY);
  const canReadWriteProjectIntegrations = useHasAccess(Permission.READ_WRITE_PROJECT_INTEGRATIONS);

  return [
    {
      title: 'Overview',
      element: canReadProjectOverview ? <Outlet /> : <NoAccessMessage className="h-full" />,
      path: generatePath(ROUTES.PROJECT_DETAILS, { id: projectId }),
    },
    {
      title: 'Info',
      element: canReadProjectInfo ? <Outlet /> : <NoAccessMessage className="h-full" />,
      path: generatePath(ROUTES.PROJECT_DETAILS_INFO, { id: projectId }),
    },
    {
      title: 'Team',
      element: canReadProjectTeam && inTeam ? <Outlet /> : <NoAccessMessage className="h-full" />,
      path: generatePath(ROUTES.PROJECT_DETAILS_TEAM, { id: projectId }),
    },
    {
      title: 'Development',
      element: canReadProjectDevelopment ? <Outlet /> : <NoAccessMessage className="h-full" />,
      path: generatePath(ROUTES.PROJECT_DETAILS_DEVELOPMENT, { id: projectId }),
    },
    {
      title: 'Docs',
      element: canReadWriteProjectDocs ? (
        <div className="h-full">
          <SectionContainer containerClassName="h-full">
            <Outlet />
          </SectionContainer>
        </div>
      ) : (
        <NoAccessMessage className="h-full" />
      ),
      path: generatePath(ROUTES.PROJECT_DETAILS_DOCUMENTS, { id: projectId }),
    },
    {
      title: 'Reports',
      element: <Outlet />,
      path: generatePath(ROUTES.PROJECT_DETAILS_REPORTS, { id: projectId }),
    },
    {
      title: 'History',
      element: canReadProjectHistory ? <Outlet /> : <NoAccessMessage className="h-full" />,
      path: generatePath(ROUTES.PROJECT_DETAILS_HISTORY, { id: projectId }),
    },
    {
      title: 'Integrations',
      element: canReadWriteProjectIntegrations ? (
        <Outlet />
      ) : (
        <NoAccessMessage className="h-full" />
      ),
      path: generatePath(ROUTES.PROJECT_DETAILS_INTEGRATIONS, { id: projectId }),
    },
  ];
}
