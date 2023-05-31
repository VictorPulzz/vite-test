import { Tab } from '@appello/web-ui';
import React from 'react';
import { generatePath, Outlet } from 'react-router';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';

interface UseProjectTabsOptions {
  projectId: number;
  inTeam: boolean;
}

export function useProjectTabs({ projectId, inTeam }: UseProjectTabsOptions): Tab[] {
  const canReadProjectOverview = useHasAccess(Permission.READ_PROJECT_OVERVIEW);
  const canReadProjectInfo = useHasAccess(Permission.READ_PROJECT_INFO);
  const canReadProjectTeam = useHasAccess(Permission.READ_PROJECT_TEAM);
  const canReadProjectDevelopment = useHasAccess(Permission.READ_PROJECT_DEVELOPMENT);
  const canReadWriteProjectDocs = useHasAccess(Permission.READ_WRITE_PROJECT_DOCS);
  const canReadProjectHistory = useHasAccess(Permission.READ_PROJECT_HISTORY);
  const canReadWriteProjectIntegrations = useHasAccess(Permission.READ_WRITE_PROJECT_INTEGRATIONS);

  const projectTabs: (Tab | false)[] = [
    canReadProjectOverview && {
      title: 'Overview',
      element: <Outlet />,
      path: generatePath(ROUTES.PROJECT_DETAILS, { id: projectId }),
    },
    canReadProjectInfo && {
      title: 'Info',
      element: <Outlet />,
      path: generatePath(ROUTES.PROJECT_DETAILS_INFO, { id: projectId }),
    },
    canReadProjectTeam &&
      inTeam && {
        title: 'Team',
        element: <Outlet />,
        path: generatePath(ROUTES.PROJECT_DETAILS_TEAM, { id: projectId }),
      },
    canReadProjectDevelopment && {
      title: 'Development',
      element: <Outlet />,
      path: generatePath(ROUTES.PROJECT_DETAILS_DEVELOPMENT, { id: projectId }),
    },
    canReadWriteProjectDocs && {
      title: 'Docs',
      element: (
        <div className="h-full">
          <SectionContainer containerClassName="h-full">
            <Outlet />
          </SectionContainer>
        </div>
      ),
      path: generatePath(ROUTES.PROJECT_DETAILS_DOCUMENTS, { id: projectId }),
    },
    {
      title: 'Reports',
      element: <Outlet />,
      path: generatePath(ROUTES.PROJECT_DETAILS_REPORTS, { id: projectId }),
    },
    canReadProjectHistory && {
      title: 'History',
      element: <Outlet />,
      path: generatePath(ROUTES.PROJECT_DETAILS_HISTORY, { id: projectId }),
    },
    canReadWriteProjectIntegrations && {
      title: 'Integrations',
      element: <Outlet />,
      path: generatePath(ROUTES.PROJECT_DETAILS_INTEGRATIONS, { id: projectId }),
    },
  ];

  return projectTabs.filter((tab): tab is Tab => !!tab);
}
