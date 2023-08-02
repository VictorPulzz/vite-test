export type StatsKeys =
  | 'estimatedHours'
  | 'peopleWorkedTotal'
  | 'hoursTrackedTotal'
  | 'daysWorkedTotal'
  | 'remainingHours'
  | 'estimatedDays';

export type StatsTitlesType = Record<StatsKeys, string>;

export const PROJECT_STATS_TITLES: StatsTitlesType = {
  estimatedHours: 'Total hours estimated (manually added)',
  peopleWorkedTotal: 'Total team working on project',
  hoursTrackedTotal: 'Total hours tracked on HubStaff (updated just now)',
  daysWorkedTotal: 'Total days on the project',
  remainingHours: 'Total hours remaining',
  estimatedDays: 'Total days estimated for the project ',
};
