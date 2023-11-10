import { nanoid } from '@reduxjs/toolkit';
import React, { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { ReportTemplateFormValues } from '../../hooks/useReportTemplateForm';
import { QuestionItem } from './components/QuestionItem';

export const QuestionsTabElement: FC = () => {
  const { control, watch } = useFormContext<ReportTemplateFormValues>();

  const { append: appendQuestion, remove: removeQuestion } =
    useFieldArray<ReportTemplateFormValues>({
      control,
      name: 'questions',
    });

  const questionsFields = watch('questions');

  const question = {
    id: nanoid(6),
    type: null,
    questionText: '',
    showOnOverview: false,
    isNew: true,
    options: [],
  };

  return (
    <div className="w-[700px] h-full m-auto flex flex-col">
      <div className="flex flex-col gap-5">
        {questionsFields.map((field, index) => (
          <QuestionItem
            key={field.id}
            questionIndex={index}
            questionType={field.type}
            removeQuestion={removeQuestion}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <button className="w-[200px]" type="button" onClick={() => appendQuestion(question)}>
          <h3 className="p-8 text-p2 text-blue hover:underline">+ Add question</h3>
        </button>
      </div>
    </div>
  );
};
