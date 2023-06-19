import { Tab } from '@appello/web-ui';
import React from 'react';
import { generatePath, Outlet } from 'react-router';

import { ROUTES } from '~/constants/routes';

interface UseLeadTabsOptions {
  leadId: string;
}

export function useLeadTabs({ leadId }: UseLeadTabsOptions): Tab[] {
  const leadTabs: (Tab | false)[] = [
    {
      title: 'Details',
      element: <Outlet />,
      path: generatePath(ROUTES.LEAD_DETAILS, { id: leadId }),
    },
    {
      title: 'Messages',
      element: <Outlet />,
      path: generatePath(ROUTES.LEAD_MESSAGES, { id: leadId }),
    },
  ];

  return leadTabs.filter((tab): tab is Tab => !!tab);
}
