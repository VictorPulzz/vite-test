import { Loader, Modal, ModalProps, TextLink } from '@appello/web-ui';
import React, { FC } from 'react';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { useFetchProjectStatusReportAnswerQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { useReportAnswerBody } from '../../../../hooks/useReportAnswerBody';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  reportAnswerId: number;
}

export const ReportAnswerModal: FC<Props> = ({ isOpen, close, reportAnswerId }) => {
  const { data, loading } = useFetchProjectStatusReportAnswerQuery({
    variables: {
      data: { id: reportAnswerId },
    },
  });

  const { answer, reportedBy } = data?.projectReportAnswerById || {};

  const reportAnswerBody = useReportAnswerBody({
    questionType: answer?.question?.type,
    answer,
  });

  return (
    <Modal isOpen={isOpen} close={close} contentClassName="w-[500px]">
      {loading && (
        <div className="flex items-center h-[310px]">
          <Loader full colorful />
        </div>
      )}
      {!loading && (
        <>
          <h2 className="text-h5">{answer?.question?.questionText}</h2>
          <div className="mt-1 text-p6 text-gray-2 flex items-center gap-1">
            <span>Reported by</span>
            <TextLink
              to={generatePath(ROUTES.USER_DETAILS, {
                id: reportedBy?.id,
              })}
              className="text-accent underline hover:no-underline"
            >
              {reportedBy?.fullName}
            </TextLink>
          </div>
          <div className="text-p4 mt-4 max-h-[384px] overflow-auto">
            <div className="flex flex-col gap-2">{reportAnswerBody}</div>
          </div>
        </>
      )}
    </Modal>
  );
};
