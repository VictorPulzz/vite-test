import { format } from 'date-fns';

import { DateFormat } from '~/constants/dates';

import { StatKey } from './consts';

export const getProjectStatsTitle = (key: StatKey, startDate: string): string => {
  const titles = {
    estimatedHours: 'Total hours estimated (manually added)',
    peopleWorkedTotal: 'Team members worked on project in last 28 days',
    hoursTrackedTotal: `Total hours tracked since project start ${
      startDate && format(new Date(startDate), DateFormat.D_MMM_Y)
    }`,
    daysWorkedTotal: `Total days on the project since project start ${
      startDate && format(new Date(startDate), DateFormat.D_MMM_Y)
    }`,
    remainingHours: 'Total hours remaining',
    estimatedDays: 'Total days estimated for the project ',
  };

  return titles[key];
};
