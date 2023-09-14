import { format } from 'date-fns';
import React, { FC } from 'react';

import { DateFormat } from '~/constants/dates';
import { ReportQuestionTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { SectionContainer } from '~/view/components/SectionContainer';
import { ReportAnswersResultType } from '~/view/pages/ProjectDetails/types';

interface Props {
  title: string;
  answers: ReportAnswersResultType;
}

export const ReportAnswers: FC<Props> = ({ title, answers }) => {
  return (
    <SectionContainer title={title} containerClassName="my-[40px] w-[840px] mx-auto ">
      {answers.map(answer => (
        <div
          key={answer.question.id}
          className="py-4 text-p5 border-solid border-b border-gray-7 last:border-b-0 flex flex-col gap-2"
        >
          <span className="text-p4 font-bold">{answer.question.questionText}</span>
          {answer.question.type === ReportQuestionTypeChoice.FREE_TEXT && (
            <span>{answer.text}</span>
          )}
          {answer.question.type === ReportQuestionTypeChoice.DATE && answer.date && (
            <span>{format(new Date(answer.date), DateFormat.D_MMM_Y)}</span>
          )}
          {answer.question.type === ReportQuestionTypeChoice.YES_OR_NO && answer.yesNo && (
            <span>{convertUppercaseToReadable(answer.yesNo)}</span>
          )}
          {answer.question.type === ReportQuestionTypeChoice.CHECKBOXES && (
            <div className="flex flex-col gap-1">
              {answer.checkboxes?.map(checkboxAnswer => (
                <span key={checkboxAnswer.id}>• {checkboxAnswer.text}</span>
              ))}
            </div>
          )}
          {answer.question.type === ReportQuestionTypeChoice.SINGLE_CHOICE && (
            <span>{answer.singleChoice?.text}</span>
          )}
        </div>
      ))}
    </SectionContainer>
  );
};
