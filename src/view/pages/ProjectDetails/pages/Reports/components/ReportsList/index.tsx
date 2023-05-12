import { DateField } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { useSelectOptions } from '@appello/web-ui';
import React, { FC } from 'react';

import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import comingSoon from '~/view/assets/images/coming-soon.svg';
import { SectionContainer } from '~/view/components/SectionContainer';

import { useGetReportsForm } from '../../hooks/useGetReportsForm';
import { ReportsCard } from './components/ReportCard';

// TODO remove HistoryUsersType when backend will be ready
export type ReportsType = {
  id: number;
  reportName: string;
  reportDate: string;
  reportedBy: string;
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
  const { form } = useGetReportsForm();

  const { data: allUsers } = useFetchUserGlossaryListQuery({
    fetchPolicy: 'cache-and-network',
  });

  const usersOptions = useSelectOptions(allUsers?.userGlossaryList.results, {
    value: 'id',
    label: 'fullName',
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center items-center h-[calc(70vh+2rem)]">
        <img src={comingSoon} alt="feature" />
      </div>
      <SectionContainer>
        <div className="flex justify-between items-center">
          <h2 className="text-p1 font-bold">Reports for clients</h2>
          <span className="text-blue text-p2">Edit reporting rules</span>
        </div>
        <div className="flex items-center gap-3">
          <SelectField
            name="submittedBy"
            options={usersOptions}
            control={form.control}
            label=""
            className="w-64 mt-3"
            placeholder="Filter by user"
          />
          <DateField
            name="submittedReportsDateRange"
            control={form.control}
            label=""
            required
            className="w-64"
            placeholder="Date range"
            // TODO add mode
            // mode="range"
          />
        </div>
        <div className="flex flex-col">
          {reportsTestData.map((report: ReportsType) => {
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
      </SectionContainer>
      <SectionContainer>
        <div className="flex justify-between items-center">
          <h2 className="text-p1 font-bold">Call reports</h2>
          <span className="text-blue text-p2">Edit call reporting rules</span>
        </div>
        <div className="flex items-center gap-3">
          <SelectField
            name="submittedBy"
            options={usersOptions}
            control={form.control}
            label=""
            className="w-64 mt-3"
            placeholder="Filter by user"
          />
          <DateField
            name="submittedClientsDateRange"
            control={form.control}
            label=""
            required
            className="w-64"
            placeholder="Date range"
            // TODO add mode
            // mode="range"
          />
        </div>
        <div className="flex flex-col">
          {reportsTestData.map((report: ReportsType) => {
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
      </SectionContainer>
    </div>
  );
};
