import { useSwitchValue } from '@appello/common';
import { TextLink } from '@appello/web-ui';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { ProjectReportAnswerType } from '~/view/pages/ProjectDetails/types';

import { useReportAnswerBody } from '../../hooks/useReportAnswerBody';
import { ReportAnswerModal } from './components/ReportAnswerModal';

interface Props {
  reportAnswer: ProjectReportAnswerType;
}

export const ProjectStatusReportAnswer: FC<Props> = ({ reportAnswer }) => {
  const {
    value: isReportAnswerModal,
    on: openReportAnswerModal,
    off: closeReportAnswerModal,
  } = useSwitchValue(false);

  const { answer, reportedBy } = reportAnswer;

  const questionTextRef = useRef<HTMLParagraphElement>(null);
  const answerTextRef = useRef<HTMLParagraphElement>(null);

  const [isTruncatedQuestionText, setIsTruncatedQuestionText] = useState<boolean>(false);
  const [isTruncatedAnswerText, setIsTruncatedAnswerText] = useState<boolean>(false);

  useEffect(() => {
    if (questionTextRef.current) {
      const { scrollWidth, clientWidth } = questionTextRef.current;
      setIsTruncatedQuestionText(scrollWidth > clientWidth);
    }
    if (answerTextRef.current) {
      const { scrollWidth, clientWidth } = answerTextRef.current;
      setIsTruncatedAnswerText(scrollWidth > clientWidth);
    }
  }, []);

  const reportAnswerBody = useReportAnswerBody({
    questionType: answer?.question?.type,
    answer: reportAnswer.answer,
  });

  const renderAnswer = useCallback(() => {
    return (
      <div className="flex items-center leading-4 justify-end">
        <div className="text-p5 truncate" ref={answerTextRef}>
          {reportAnswerBody}
        </div>
        {isTruncatedAnswerText && (
          <button
            className="text-accent text-p5 underline hover:no-underline"
            type="button"
            onClick={openReportAnswerModal}
          >
            view
          </button>
        )}
      </div>
    );
  }, [isTruncatedAnswerText, openReportAnswerModal, reportAnswerBody]);

  return (
    <>
      <div className="grid grid-cols-2 gap-10 p-4 border-solid border border-gray-5 rounded-md">
        <div>
          <div className="flex leading-4">
            <p className="text-p5 truncate" ref={questionTextRef}>
              {answer?.question?.questionText}
            </p>
            {isTruncatedQuestionText && (
              <button
                className="text-accent text-p5 underline hover:no-underline"
                type="button"
                onClick={openReportAnswerModal}
              >
                view
              </button>
            )}
          </div>
          <div className="mt-1 text-p6 text-gray-2 flex items-center gap-1">
            <span>Reported by</span>
            <TextLink
              className="text-accent underline hover:no-underline"
              to={generatePath(ROUTES.USER_DETAILS, { id: reportedBy?.id })}
            >
              {reportedBy?.fullName}
            </TextLink>
          </div>
        </div>
        {renderAnswer()}
      </div>
      {isReportAnswerModal && (
        <ReportAnswerModal
          close={closeReportAnswerModal}
          isOpen={isReportAnswerModal}
          reportAnswerId={reportAnswer.id}
        />
      )}
    </>
  );
};
