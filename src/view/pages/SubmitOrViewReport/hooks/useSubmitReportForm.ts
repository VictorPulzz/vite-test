import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { YesOrNoChoice } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import { useSubmitReportMutation } from '../../ProjectDetails/__generated__/schema';
import { ReportQuestionsResultType } from '../../ProjectDetails/types';
import { setQuestionsDefaultValues } from '../utils';

const formSchema = z.object({
  text: z
    .object({
      questionId: z.number(),
      text: z.string(),
    })
    .array(),
  date: z
    .object({
      questionId: z.number(),
      date: z.date().nullable(),
    })
    .array(),
  yesNo: z
    .object({
      questionId: z.number(),
      yesNo: z.nativeEnum(YesOrNoChoice).nullable(),
    })
    .array(),
  checkboxes: z
    .object({
      questionId: z.number(),
      checkboxes: z.array(z.number()).nullable(),
    })
    .array(),
  singleChoice: z
    .object({
      questionId: z.number(),
      singleChoiceId: z.number().nullable(),
    })
    .array(),
});

export type SubmitReportFormValues = z.infer<typeof formSchema>;

interface UseSubmitReportFormReturn {
  form: UseFormReturn<SubmitReportFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<SubmitReportFormValues>>;
}

interface UseSubmitReportFormProps {
  reportId: number;
  questions: ReportQuestionsResultType;
  onSubmitSuccessful?: () => void;
}

const defaultValues: SubmitReportFormValues = {
  text: [],
  date: [],
  yesNo: [],
  checkboxes: [],
  singleChoice: [],
};

export function useSubmitReportForm({
  reportId,
  questions,
  onSubmitSuccessful,
}: UseSubmitReportFormProps): UseSubmitReportFormReturn {
  const form = useForm<SubmitReportFormValues>({
    defaultValues,
    values: questions ? setQuestionsDefaultValues(questions) : undefined,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [submitReport] = useSubmitReportMutation();

  const handleSubmit = useCallback(
    async (values: SubmitReportFormValues) => {
      try {
        const prepareAnswers = Object.values({
          ...values,
          date: values.date.map(i => ({
            questionId: i.questionId,
            date: i.date ? formatISO(i.date, { representation: 'date' }) : '',
          })),
        }).flat();

        await submitReport({
          variables: {
            input: {
              id: reportId,
              answers: prepareAnswers,
            },
          },
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<SubmitReportFormValues>(e, {
          setFormError: form.setError,
        });
      }
    },
    [form.setError, onSubmitSuccessful, reportId, submitReport],
  );

  return useMemo(
    () => ({
      form,
      handleSubmit: form.handleSubmit(handleSubmit),
    }),
    [form, handleSubmit],
  );
}
