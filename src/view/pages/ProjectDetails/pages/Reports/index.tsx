import { useSwitchValue } from '@appello/common/lib/hooks';
import { DateInput, EmptyState, Loader, Pagination, Select } from '@appello/web-ui';
import { useSelectOptions } from '@appello/web-ui';
import { formatISO } from 'date-fns';
import React, { FC, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useParams } from 'react-router-dom';

import { ALL_SELECT_OPTION } from '~/constants/select';
import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useUserProfile } from '~/view/hooks/useUserProfile';

import { useFetchProjectReportsQuery } from '../../__generated__/schema';
import { EditReportingListModal } from './components/EditReportingListModal';
import { ReportsList } from './components/ReportsList';
import { PROJECT_REPORTS_PAGE_SIZE } from './consts';

export type ReportFilter = {
  submittedBy: Nullable<number> | undefined;
  dateRange: Nullable<DateRange>;
};

export const Reports: FC = () => {
  const { profile, isAdminOrPM } = useUserProfile();

  const params = useParams();
  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  const {
    value: isEditReportingListModalOpen,
    on: openEditReportingListModal,
    off: closeEditReportingListModal,
  } = useSwitchValue(false);

  // TODO Change offset useState to useListQueryParams later when pageSize will be work correct
  const [offset, setOffset] = useState<number>(0);

  const [reportFilter, setReportFilter] = useState<ReportFilter>({
    submittedBy: undefined,
    dateRange: null,
  });

  const { data: allUsers, loading: isLoadingAllUsers } = useFetchUserGlossaryListQuery({
    skip: !isAdminOrPM,
    fetchPolicy: 'cache-and-network',
  });

  const isSelectedBothDates = useMemo(
    () => Object.values(reportFilter.dateRange || {}).every(date => !!date),
    [reportFilter.dateRange],
  );

  const {
    data: reports,
    loading: isLoadingReports,
    fetchMore,
  } = useFetchProjectReportsQuery({
    variables: {
      pagination: {
        limit: PROJECT_REPORTS_PAGE_SIZE,
        offset,
      },
      filters: {
        projectId,
        submittedBy: isAdminOrPM ? reportFilter.submittedBy : profile.id,
        dateRange: isSelectedBothDates
          ? {
              start: reportFilter.dateRange?.from
                ? formatISO(reportFilter.dateRange?.from, { representation: 'date' })
                : undefined,
              end: reportFilter.dateRange?.to
                ? formatISO(reportFilter.dateRange?.to, { representation: 'date' })
                : undefined,
            }
          : {},
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const usersOptions = [
    ALL_SELECT_OPTION,
    ...useSelectOptions(allUsers?.userGlossaryList.results, {
      value: 'id',
      label: 'fullName',
    }),
  ];

  const reportListLenght = reports?.reportList.results.length || 0;
  const isLoading = isLoadingAllUsers || isLoadingReports;
  const hasPagination = Number(reports?.reportList.count) > PROJECT_REPORTS_PAGE_SIZE;

  return (
    <>
      {isLoading && (
        <div className="flex h-full items-center">
          <Loader colorful full />
        </div>
      )}
      {!isLoading && reports && (
        <SectionContainer containerClassName="flex flex-1 flex-col h-full">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-p1 font-bold">Reports</h2>
              <span className="text-p6 text-gray-1">
                You can fill out and submit reports assigned only to you
              </span>
            </div>
            {isAdminOrPM && (
              <button
                className="text-blue text-p2 hover:underline"
                type="button"
                onClick={openEditReportingListModal}
              >
                Edit reporting list
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 mt-3">
            {isAdminOrPM && (
              <Select
                className="w-[260px]"
                options={usersOptions}
                placeholder="Submitted by"
                value={reportFilter.submittedBy}
                onChange={value => setReportFilter({ ...reportFilter, submittedBy: value })}
              />
            )}
            <DateInput
              className="w-[260px]"
              mode="range"
              placeholder="Date range"
              value={reportFilter.dateRange}
              onChange={value => setReportFilter({ ...reportFilter, dateRange: value })}
            />
          </div>
          <div className="flex-auto">
            {isLoading && (
              <div className="flex h-full items-center">
                <Loader colorful full />
              </div>
            )}
            {reportListLenght === 0 && (
              <div className="flex h-full items-center justify-center">
                <EmptyState iconName="list" label="No reports here yet" />
              </div>
            )}
            {!isLoading && reportListLenght > 0 && (
              <ReportsList reports={reports.reportList.results} />
            )}
          </div>
          <div>
            {hasPagination && (
              <Pagination
                itemsCount={reportListLenght}
                offset={offset}
                pageSize={PROJECT_REPORTS_PAGE_SIZE}
                setOffset={setOffset}
                totalCount={reports.reportList.count}
                onPageChange={gqlTableFetchMore(fetchMore)}
              />
            )}
          </div>
          {isEditReportingListModalOpen && (
            <EditReportingListModal
              close={closeEditReportingListModal}
              isOpen={isEditReportingListModalOpen}
            />
          )}
        </SectionContainer>
      )}
    </>
  );
};
