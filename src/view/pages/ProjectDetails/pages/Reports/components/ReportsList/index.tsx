import React, { FC } from 'react';

import { ProjectReportsResultType } from '~/view/pages/ProjectDetails/types';

import { ReportsListItem } from './components/ReportsListItem';

interface Props {
  reports: ProjectReportsResultType[];
  isAdminOrPM: boolean;
}

export const ReportsList: FC<Props> = ({ reports, isAdminOrPM }) => {
  return (
    <div className="mt-5 flex flex-col gap-5">
      {reports.map(report => (
        <ReportsListItem key={report.id} report={report} isAdminOrPM={isAdminOrPM} />
      ))}
    </div>
  );
};
