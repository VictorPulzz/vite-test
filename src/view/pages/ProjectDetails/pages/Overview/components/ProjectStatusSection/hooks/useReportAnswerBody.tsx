import { format, parseISO } from 'date-fns';
import React from 'react';

import { DateFormat } from '~/constants/dates';
import { ReportQuestionTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { formatDistanceDay } from '~/utils/formatDistanceDay';
import { ProjectReportAnswerType } from '~/view/pages/ProjectDetails/types';

interface UseReportAnswerBodyProps {
  questionType?: ReportQuestionTypeChoice;
  answer: ProjectReportAnswerType['answer'];
}

export function useReportAnswerBody({ questionType, answer }: UseReportAnswerBodyProps) {
  switch (questionType) {
    case ReportQuestionTypeChoice.FREE_TEXT:
      return answer?.text;
    case ReportQuestionTypeChoice.YES_OR_NO:
      return convertUppercaseToReadable(answer?.yesNo || '');
    case ReportQuestionTypeChoice.CHECKBOXES:
      return answer?.checkboxes?.map(option => <span key={option.id}> • {option.text};</span>);
    case ReportQuestionTypeChoice.SINGLE_CHOICE:
      return answer?.singleChoice?.text;
    case ReportQuestionTypeChoice.DATE:
      return (
        answer?.date && (
          <p className="flex items-center gap-1 text-p5 flex-shrink-0">
            <span>{format(new Date(answer.date), DateFormat.DMY)}</span>
            <span className="text-gray-2">({formatDistanceDay(parseISO(answer.date))})</span>
          </p>
        )
      );
    default:
      return null;
  }
}
