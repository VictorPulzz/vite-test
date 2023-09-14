import { Icon, TextField } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { getRandomNumber } from '~/utils/getRandomNumber';
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
    id: getRandomNumber(),
    text: '',
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
        <div key={option.id} className="flex items-center gap-3 justify-between">
          <div className="flex items-baseline gap-2 flex-auto">
            <span className="text-p4 text-gray-1">{index + 1}.</span>
            <TextField
              name={`questions.${questionIndex}.options.${index}.text`}
              control={control}
              placeholder="Option *"
              className={clsx(styles['input'])}
            />
          </div>
          <button type="button" className="hover:opacity-80" onClick={() => removeOption(index)}>
            <Icon name="close" size={16} className="text-gray-1" />
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
