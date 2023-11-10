import { Button, ButtonVariant, Loader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import { matchPath, useLocation, useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import {
  useFetchReportAnswersQuery,
  useFetchReportQuestionsQuery,
} from '../ProjectDetails/__generated__/schema';
import { ReportAnswers } from './components/ReportAnswers';
import { ReportQuestions } from './components/ReportQuestions';
import { useSubmitReportForm } from './hooks/useSubmitReportForm';

export const SubmitOrViewReportPage: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const reportId = useMemo(
    () => (params.reportId ? Number(params.reportId) : 0),
    [params.reportId],
  );

  const isSubmitReportPage = useMemo(
    () => !!matchPath(ROUTES.PROJECT_DETAILS_REPORTS_SUBMIT, location.pathname),
    [location.pathname],
  );

  const { data: reportQuestions, loading: isLoadingReportQuestions } = useFetchReportQuestionsQuery(
    {
      variables: {
        data: { id: reportId },
      },
      skip: !isSubmitReportPage,
      fetchPolicy: 'cache-and-network',
    },
  );

  const { data: reportAnswers, loading: isLoadingReportAnswers } = useFetchReportAnswersQuery({
    variables: {
      data: { id: reportId },
    },
    skip: isSubmitReportPage,
    fetchPolicy: 'cache-and-network',
  });

  const { form, handleSubmit } = useSubmitReportForm({
    reportId,
    questions: reportQuestions?.report.questions || [],
    onSubmitSuccessful: () => navigate(-1),
  });

  const isLoading = isLoadingReportQuestions || isLoadingReportAnswers;

  return (
    <FormProvider {...form}>
      <SidebarLayout>
        {isLoading && <Loader colorful full />}
        {!isLoading && (
          <DetailLayout
            contentClassName="my-4 mx-6 flex-auto"
            rightHeaderElement={
              isSubmitReportPage ? (
                <Button
                  className="w-36"
                  isLoading={form.formState.isSubmitting}
                  label="Sumbit"
                  variant={ButtonVariant.PRIMARY}
                  withIcon="check"
                  onClick={handleSubmit}
                />
              ) : undefined
            }
            title={
              <div className="flex flex-col w-[65vw]">
                <h2 className="text-h4 font-bold break-words leading-6">
                  {isSubmitReportPage ? reportQuestions?.report.name : reportAnswers?.report.name}
                </h2>
                <span className="text-p5 text-gray-2">
                  {isSubmitReportPage
                    ? reportQuestions?.report.project?.name
                    : reportAnswers?.report.project?.name}
                </span>
              </div>
            }
          >
            {isSubmitReportPage ? (
              <ReportQuestions questions={reportQuestions?.report.questions || []} />
            ) : (
              <ReportAnswers
                answers={reportAnswers?.report.answers || []}
                title={reportAnswers?.report.name ?? ''}
              />
            )}
          </DetailLayout>
        )}
      </SidebarLayout>
    </FormProvider>
  );
};
