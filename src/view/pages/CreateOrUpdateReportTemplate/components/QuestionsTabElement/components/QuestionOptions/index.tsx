import { Icon, TextField } from '@appello/web-ui';
import { nanoid } from '@reduxjs/toolkit';
import clsx from 'clsx';
import React, { FC, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { ReportTemplateFormValues } from '~/view/pages/CreateOrUpdateReportTemplate/hooks/useReportTemplateForm';

import styles from './styles.module.scss';

interface Props {
  questionIndex: number;
}

export const QuestionOptions: FC<Props> = ({ questionIndex }) => {
  const { control, watch, formState } = useFormContext<ReportTemplateFormValues>();

  const { append: appendOption, remove: removeOption } = useFieldArray<ReportTemplateFormValues>({
    control,
    name: `questions.${questionIndex}.options`,
  });

  const optionsFields = watch(`questions.${questionIndex}.options`);

  const option = {
    id: nanoid(6),
    text: '',
    isNew: true,
  };

  const errorMessage = useMemo(
    () =>
      formState.errors.questions
        ? formState.errors.questions[questionIndex]?.options?.message
        : null,
    [formState.errors.questions, questionIndex],
  );

  return (
    <div className="flex flex-col mt-4">
      {optionsFields.map((option, index) => (
        <div className="flex items-center gap-3 justify-between" key={option.id}>
          <div className="flex items-baseline gap-2 flex-auto">
            <span className="text-p4 text-gray-1">{index + 1}.</span>
            <TextField
              className={clsx(styles['input'])}
              control={control}
              name={`questions.${questionIndex}.options.${index}.text`}
              placeholder="Option *"
            />
          </div>
          <button className="hover:opacity-80" type="button" onClick={() => removeOption(index)}>
            <Icon className="text-gray-1" name="close" size={16} />
          </button>
        </div>
      ))}
      <button className="text-left mt-3" type="button" onClick={() => appendOption(option)}>
        <h2 className="text-p4 text-gray-1 hover:underline">+ Add option</h2>
      </button>
      {errorMessage && optionsFields.length === 0 && (
        <span className="text-red text-p4">{errorMessage}</span>
      )}
    </div>
  );
};
