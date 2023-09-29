import { Tab } from '@appello/web-ui';
import React from 'react';
import { generatePath, Outlet } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { SectionContainer } from '~/view/components/SectionContainer';
import { TabCounter } from '~/view/components/TabCounter';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

interface UseProjectTabsOptions {
  projectId: number;
  inTeam: boolean;
  notSubmittedReportsCount: number;
}

export function useProjectTabs({
  projectId,
  inTeam,
  notSubmittedReportsCount = 0,
}: UseProjectTabsOptions): Tab[] {
  const {
    canReadProjectOverview,
    canReadProjectInfo,
    canReadProjectTeam,
    canReadProjectDevelopment,
    canReadWriteProjectDocs,
    canReadProjectReports,
    canReadProjectHistory,
    canReadWriteProjectIntegrations,
  } = useUserPermissions();

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
    canReadProjectReports && {
      title: 'Reports',
      element: <Outlet />,
      path: generatePath(ROUTES.PROJECT_DETAILS_REPORTS, { id: projectId }),
      rightComponent: <TabCounter value={notSubmittedReportsCount} />,
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
