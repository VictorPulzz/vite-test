/* eslint-disable no-console */
import {
  Button,
  ButtonVariant,
  Checkbox,
  EmptyState,
  Loader,
  TextLink,
  useListQueryParams,
} from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { convertTimeValueToHMA } from '~/utils/convertTimeValueToHMA';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import {
  useFetchProjectReportTemplatesQuery,
  useFetchReportTemplatesForEditingQuery,
} from '~/view/pages/ProjectDetails/__generated__/schema';

import { EDIT_REPORTING_LIST_PAGE_SIZE } from '../../consts';
import { useEditReportingListForm } from './hooks/useEditReportingListForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

export const EditReportingListModal: FC<Props> = ({ isOpen, close }) => {
  const reportTemplatesListRef = useRef<HTMLDivElement>(null);

  const { offset } = useListQueryParams();

  const [nextOffset, setNextOffset] = useState<number>(0);
  const [isFetching, setFetching] = useState<boolean>(false);

  const params = useParams();
  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  const { data: projectReportTemplates, loading: isLoadingProjectReportTemplates } =
    useFetchProjectReportTemplatesQuery({
      variables: {
        data: { id: projectId },
      },
      fetchPolicy: 'cache-and-network',
    });

  const {
    data: reportTemplates,
    loading: isLoadingReportTemplates,
    fetchMore,
  } = useFetchReportTemplatesForEditingQuery({
    variables: {
      pagination: {
        limit: EDIT_REPORTING_LIST_PAGE_SIZE,
        offset,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const projectReportTemplatesIds = useMemo(() => {
    return projectReportTemplates?.project.reportTemplates
      ? projectReportTemplates?.project.reportTemplates.map(template => template.id)
      : [];
  }, [projectReportTemplates]);

  useEffect(() => {
    if (reportTemplates) {
      setNextOffset(reportTemplates.reportTemplateList.results.length);
    }
  }, [reportTemplates]);

  useEffect(() => {
    if (!reportTemplatesListRef.current) {
      return () => {};
    }

    const handleScroll = async (e: Event): Promise<void> => {
      const element = e.target as HTMLElement;
      console.log('element.scrollHeight', element.scrollHeight);
      console.log('element.scrollTop', element.scrollTop);
      console.log('element.clientHeight', element.clientHeight);
      console.log('element.offsetHeight', element.offsetHeight);
      console.log(
        'condition',
        element.scrollHeight - Math.ceil(element.scrollTop) === element.clientHeight,
      );
      console.log(
        'cond2',
        Math.ceil(element.scrollTop + element.offsetHeight) === element.scrollHeight,
      );

      const isBottomReached =
        !isFetching &&
        element.scrollHeight - element.clientHeight - Math.ceil(element.scrollTop) <=
          window.outerWidth / window.outerWidth;

      if (isBottomReached) {
        try {
          setFetching(true);
          await fetchMore({
            variables: {
              pagination: {
                limit: EDIT_REPORTING_LIST_PAGE_SIZE,
                offset: nextOffset,
              },
            },
            updateQuery: (previousResult, { fetchMoreResult }) => ({
              reportTemplateList: {
                count: fetchMoreResult.reportTemplateList.count,
                results: [
                  ...previousResult.reportTemplateList.results,
                  ...fetchMoreResult.reportTemplateList.results,
                ],
              },
            }),
          });
        } finally {
          setFetching(false);
        }
      }
    };

    reportTemplatesListRef.current.addEventListener('scroll', handleScroll);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      reportTemplatesListRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [fetchMore, isFetching, nextOffset]);

  const { form, handleSubmit, resetForm } = useEditReportingListForm({
    activeReportsIds: projectReportTemplatesIds,
    projectId,
    onSubmitSuccessful: () => close(),
  });

  const reportsField = form.watch('reports');

  const handleChangeReportActivity = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = ev.target;
      if (checked) {
        form.setValue('reports', [...reportsField, +value]);
      } else {
        form.setValue(
          'reports',
          reportsField.filter((channelId: number) => channelId !== +value),
        );
      }
    },
    [form, reportsField],
  );

  const isLoading = isLoadingReportTemplates || isLoadingProjectReportTemplates;

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      contentClassName="w-[28.75rem]"
      title="Edit reporting list"
      onAfterClose={resetForm}
    >
      <>
        <div className="h-[300px] overflow-auto" ref={reportTemplatesListRef}>
          {isLoading && (
            <div className="flex items-center h-full">
              <Loader full colorful />
            </div>
          )}
          {!isLoading &&
            reportTemplates &&
            reportTemplates.reportTemplateList.results.length === 0 && (
              <div className="flex h-full">
                <EmptyState iconName="documentLayout" label="No report templates here yet" />
              </div>
            )}
          {!isLoading &&
            reportTemplates &&
            reportTemplates.reportTemplateList.results.length > 0 && (
              <div className="flex flex-col gap-4 ">
                {reportTemplates.reportTemplateList.results.map(report => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border border-solid border-gray-5 rounded-md"
                  >
                    {report && (
                      <div className="flex items-center gap-3">
                        <Checkbox
                          value={report.id}
                          checked={reportsField.includes(report.id)}
                          onChange={handleChangeReportActivity}
                        />
                        <div className="flex flex-col">
                          <span
                            className={clsx(
                              'text-p5 font-medium',
                              !reportsField.includes(report.id) && 'text-gray-2',
                            )}
                          >
                            {report.name}
                          </span>

                          <span
                            className={clsx(
                              'text-p6 text-gray-1',
                              !reportsField.includes(report.id) && 'text-gray-3',
                            )}
                          >
                            {convertUppercaseToReadable(report.reportDay)} •{' '}
                            {convertTimeValueToHMA(report.time)} •{' '}
                            {convertUppercaseToReadable(report.repeat)}
                          </span>
                        </div>
                      </div>
                    )}
                    <TextLink
                      to={generatePath(ROUTES.ADMIN_SETTINGS_REPORT_TEMPLATES_EDIT, {
                        id: report.id,
                      })}
                      className="text-p5 text-blue hover:underline"
                    >
                      View Template
                    </TextLink>
                  </div>
                ))}
                <div className="absolute left-[210px] bottom-[70px] h-[30px] flex items-center justify-center">
                  {isFetching && nextOffset !== reportTemplates.reportTemplateList.count && (
                    <Loader full colorful dotSize={8} />
                  )}
                </div>
              </div>
            )}
        </div>
        {!isLoading && (
          <div
            className={clsx(
              'mt-8 flex justify-end',
              reportTemplates?.reportTemplateList.results.length === 0 && 'hidden',
            )}
          >
            <Button
              variant={ButtonVariant.PRIMARY}
              onClick={handleSubmit}
              label="Save"
              className="w-40"
              isLoading={form.formState.isSubmitting}
            />
          </div>
        )}
      </>
    </Modal>
  );
};
