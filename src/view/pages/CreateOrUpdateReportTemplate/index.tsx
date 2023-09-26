import { omit } from '@appello/common/lib/utils/object/omit';
import { Button, ButtonVariant, Loader, Tabs } from '@appello/web-ui';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast';
import { matchPath, useLocation, useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import { TabLayout } from '~/view/layouts/TabLayout';

import { useFetchReportTemplateInfoQuery } from '../AdminSettingsReportTemplates/__generated__/schema';
import { useFetchRolesListQuery } from '../Users/__generated__/schema';
import { QuestionsTabElement } from './components/QuestionsTabElement';
import { SettingsTabElement } from './components/SettingsTabElement';
import { reportTemplateErrors } from './consts';
import { useReportTemplateForm } from './hooks/useReportTemplateForm';

enum ReportTemplateTab {
  SETTINGS = 0,
  QUESTIONS = 1,
}

export const TOAST_TIMER = 2000;

export const CreateOrUpdateReportTemplatePage: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const reportId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const [selectedTab, setSelectedTab] = useState<ReportTemplateTab>(ReportTemplateTab.SETTINGS);

  const { data: reportTemplateInfo, loading: isLoadingReportTemplateInfo } =
    useFetchReportTemplateInfoQuery({
      variables: {
        input: { id: reportId ?? 0 },
      },
      skip: !reportId,
    });

  const { data: rolesList, loading: isLoadingRolesList } = useFetchRolesListQuery();
  const { data: usersList, loading: isLoadingUsersList } = useFetchUserGlossaryListQuery();

  const isCreateReportPage = useMemo(
    () => !!matchPath(ROUTES.ADMIN_SETTINGS_REPORT_TEMPLATES_ADD, location.pathname),
    [location.pathname],
  );

  const reportTemplateTabsElement = useMemo(
    () => (
      <Tabs
        contentClassName="bg-gray-7"
        selected={selectedTab}
        onSelect={setSelectedTab}
        items={[
          {
            title: 'Settings',
            element: (
              <SettingsTabElement
                roles={rolesList?.rolesList || []}
                users={usersList?.userGlossaryList.results || []}
              />
            ),
          },
          {
            title: 'Questions',
            element: (
              <div className="h-full p-7">
                <QuestionsTabElement />
              </div>
            ),
          },
        ]}
      />
    ),
    [usersList?.userGlossaryList.results, rolesList?.rolesList, selectedTab],
  );

  const { form, handleSubmit } = useReportTemplateForm({
    prefilledData: reportTemplateInfo?.reportTemplate,
    onSubmitSuccessful: () => navigate(-1),
  });

  const questionsField = form.watch('questions');
  const errors = form.formState.errors;

  const isLoading = isLoadingReportTemplateInfo || isLoadingRolesList || isLoadingUsersList;

  useEffect(() => {
    if (Object.keys(omit(errors, ['questions'])).length) {
      toast.error(reportTemplateErrors.FILL_ALL_REQUIRED_FIELDS, { duration: TOAST_TIMER });
      setTimeout(() => setSelectedTab(ReportTemplateTab.SETTINGS), TOAST_TIMER / 4);
    }
    if (Object.keys(errors).length === 1 && errors.questions) {
      toast.error(reportTemplateErrors.FILL_VALID_QUESTIONS_VALUES, { duration: TOAST_TIMER });
      setTimeout(() => setSelectedTab(ReportTemplateTab.QUESTIONS), TOAST_TIMER / 4);
    }
  }, [errors, errors.questions]);

  return (
    <FormProvider {...form}>
      <TabLayout tabs={!isLoading && reportTemplateTabsElement}>
        {isLoading && <Loader full colorful />}
        {!isLoading && (
          <div className="bg-white">
            <div className="flex items-center justify-between px-7 pt-7 gap-6">
              <div className="flex items-center gap-4">
                <Button
                  variant={ButtonVariant.SECONDARY}
                  withIcon="left-arrow"
                  onClick={() => navigate(-1)}
                />
                <div className="flex flex-col w-[65vw]">
                  <h2 className="text-h4 font-bold break-words leading-6">
                    {isCreateReportPage
                      ? 'New report template'
                      : reportTemplateInfo?.reportTemplate.name}
                  </h2>
                  <span className="text-p5 text-gray-2">
                    {questionsField.length} {questionsField.length === 1 ? 'question' : 'questions'}{' '}
                    in total
                  </span>
                </div>
              </div>
              <Button
                variant={ButtonVariant.PRIMARY}
                label={`${isCreateReportPage ? 'Create' : 'Save'} template`}
                className="w-36"
                onClick={handleSubmit}
                isLoading={form.formState.isSubmitting}
              />
            </div>
          </div>
        )}
      </TabLayout>
    </FormProvider>
  );
};
