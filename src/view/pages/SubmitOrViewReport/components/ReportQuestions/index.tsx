import { DateField, RadioGroupField, SelectField, TextAreaField } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { ReportQuestionTypeChoice, YesOrNoChoice } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { ChexboxGroupField } from '~/view/components/ChexboxGroupField';
import { SectionContainer } from '~/view/components/SectionContainer';
import { ReportQuestionsResultType } from '~/view/pages/ProjectDetails/types';

import { SubmitReportFormValues } from '../../hooks/useSubmitReportForm';
import { REPORT_QUESTION_LABEL } from './consts';

interface Props {
  questions: ReportQuestionsResultType;
}

export const ReportQuestions: FC<Props> = ({ questions }) => {
  const { control } = useFormContext<SubmitReportFormValues>();

  const yesOrNoChoiceOptions = enumToSelectOptions(YesOrNoChoice);

  const renderQuestions = useCallback(
    (questionType: ReportQuestionTypeChoice) =>
      questions
        .filter(question => question.type === questionType)
        .map((item, index) => (
          <SectionContainer
            key={item.id}
            withHeader={false}
            containerClassName={clsx(
              (item.type === ReportQuestionTypeChoice.DATE ||
                item.type === ReportQuestionTypeChoice.YES_OR_NO) &&
                'flex items-start justify-between',
            )}
          >
            <div>
              <h3 className="text-p5 text-gray-1">{REPORT_QUESTION_LABEL[item.type]}</h3>
              <p className="text-p2 font-medium">{item.questionText}</p>
            </div>
            {item.type === ReportQuestionTypeChoice.FREE_TEXT && (
              <TextAreaField
                textAreaClassName="text-p5 mt-4"
                name={`text.${index}.text`}
                control={control}
                placeholder="Your answer"
              />
            )}
            {item.type === ReportQuestionTypeChoice.DATE && (
              <DateField
                name={`date.${index}.date`}
                control={control}
                className="w-[180px] flex-shrink-0"
                placeholder="Select"
              />
            )}
            {item.type === ReportQuestionTypeChoice.YES_OR_NO && (
              <SelectField
                name={`yesNo.${index}.yesNo`}
                control={control}
                className="w-[180px] flex-shrink-0"
                placeholder="Select"
                options={yesOrNoChoiceOptions}
              />
            )}
            {item.type === ReportQuestionTypeChoice.CHECKBOXES && (
              <ChexboxGroupField
                name={`checkboxes.${index}.checkboxes`}
                className="mt-4"
                control={control}
                items={item.options.map(option => ({ value: option.id, label: option.text }))}
                inColumn
              />
            )}
            {item.type === ReportQuestionTypeChoice.SINGLE_CHOICE && (
              <RadioGroupField
                name={`singleChoice.${index}.singleChoiceId`}
                className="mt-4"
                control={control}
                items={item.options.map(option => ({ value: option.id, label: option.text }))}
              />
            )}
          </SectionContainer>
        )),
    [control, questions, yesOrNoChoiceOptions],
  );

  return (
    <div className="my-[40px] w-[700px] mx-auto flex flex-col gap-5">
      {renderQuestions(ReportQuestionTypeChoice.FREE_TEXT)}
      {renderQuestions(ReportQuestionTypeChoice.DATE)}
      {renderQuestions(ReportQuestionTypeChoice.YES_OR_NO)}
      {renderQuestions(ReportQuestionTypeChoice.CHECKBOXES)}
      {renderQuestions(ReportQuestionTypeChoice.SINGLE_CHOICE)}
    </div>
  );
};
