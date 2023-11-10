import { Checkbox, Icon, InlineFields, SelectField, TextField } from '@appello/web-ui';
import React, { FC, useEffect } from 'react';
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form';

import { ReportQuestionTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { SectionContainer } from '~/view/components/SectionContainer';
import { ReportTemplateFormValues } from '~/view/pages/CreateOrUpdateReportTemplate/hooks/useReportTemplateForm';

import { QuestionOptions } from '../QuestionOptions';

interface Props {
  questionType: Nullable<ReportQuestionTypeChoice>;
  questionIndex: number;
  removeQuestion: UseFieldArrayRemove;
}

export const QuestionItem: FC<Props> = ({ questionType, questionIndex, removeQuestion }) => {
  const { control, register, setValue, watch } = useFormContext<ReportTemplateFormValues>();

  const reportQuestionTypesOptions = enumToSelectOptions(ReportQuestionTypeChoice);

  const isVisibleQuestionOptions =
    questionType === ReportQuestionTypeChoice.CHECKBOXES ||
    questionType === ReportQuestionTypeChoice.SINGLE_CHOICE;

  const questionsFields = watch('questions');

  useEffect(() => {
    if (!isVisibleQuestionOptions) {
      setValue(`questions.${questionIndex}.options`, []);
    }
  }, [isVisibleQuestionOptions, questionIndex, setValue]);

  return (
    <SectionContainer>
      <div className="grid grid-cols-[1fr,auto] gap-2 items-start">
        <InlineFields>
          <TextField
            control={control}
            name={`questions.${questionIndex}.questionText`}
            placeholder="Question *"
          />
          <SelectField
            control={control}
            name={`questions.${questionIndex}.type`}
            options={reportQuestionTypesOptions}
            placeholder="Select *"
          />
        </InlineFields>
        {questionsFields.length >= 2 && (
          <button
            className="mt-3 hover:opacity-80"
            type="button"
            onClick={() => removeQuestion(questionIndex)}
          >
            <Icon className="text-gray-1" name="trash" size={18} />
          </button>
        )}
      </div>
      {isVisibleQuestionOptions && <QuestionOptions questionIndex={questionIndex} />}
      <div className="flex justify-end border-solid border-t border-gray-5 mt-5">
        <Checkbox
          {...register(`questions.${questionIndex}.showOnOverview`)}
          className="mt-5 text-gray-1 "
          label="Show on Project Overview page"
        />
      </div>
    </SectionContainer>
  );
};
