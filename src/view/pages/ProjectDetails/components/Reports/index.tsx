import React, { FC } from 'react';

import { DateField } from '~/view/ui/components/form/DateField';
// import { InlineFields } from '~/view/ui/components/form/InlineFields';
import { SelectField } from '~/view/ui/components/form/SelectField';

import { ReportsCard } from './components/ReportCard';
import { useGetReportsForm } from './hooks/useFilterByUserForm';

// TODO remove HistoryUsersType when backend will be ready
export type HistoryUsersType = {
  id: number;
  action: string;
  madeBy: string;
  dateAndTime: string;
};

// TODO remove historyTestData when backend will be ready
const reportsTestData = [
  {
    id: 1,
    reportName: 'PM Weekly Report',
    reportDate: 'Alex C.',
    reportedBy: '28 Mar 2023',
  },
  {
    id: 2,
    reportName: 'PM Weekly Report',
    reportDate: 'Alex C.',
    reportedBy: '28 Mar 2023',
  },
  {
    id: 3,
    reportName: 'Designer Weekly Report',
    reportDate: 'John Doe.',
    reportedBy: '19 Apr 2023',
  },
  {
    id: 4,
    reportName: 'PM Weekly Report',
    reportDate: 'Alex C.',
    reportedBy: '28 Mar 2023',
  },
  {
    id: 5,
    reportName: 'Designer Weekly Report',
    reportDate: 'John Doe.',
    reportedBy: '19 Apr 2023',
  },
];

export const Reports: FC = () => {
  const {
    form: { control },
  } = useGetReportsForm();

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="shadow-4 bg-white rounded-md p-7">
          <div className="flex justify-between items-center">
            <h2 className="text-p1 font-bold">Reports</h2>
            <span className="text-blue text-p2">Edit reporting rules</span>
          </div>
          <div className="flex items-center gap-3">
            <SelectField
              name="submittedBy"
              options={[]}
              control={control}
              label=""
              className="w-64 mt-3"
              placeholder="Filter by user"
            />
            <DateField
              name="submittedDateRange"
              control={control}
              label=""
              required
              className="w-64"
              placeholder="Date range"
            />
          </div>
          <div className="flex flex-col gap-4">
            {reportsTestData.map((report: any) => {
              const { reportName, reportDate, reportedBy } = report;
              return (
                <ReportsCard
                  key={report.id}
                  reportName={reportName}
                  reportDate={reportDate}
                  reportedBy={reportedBy}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
