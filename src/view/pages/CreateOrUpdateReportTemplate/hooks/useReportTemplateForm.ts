import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import {
  ReportEmailNotificationChoice,
  ReportQuestionTypeChoice,
  ReportRepeatChoice,
  WeekDayChoice,
} from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { getRandomNumber } from '~/utils/getRandomNumber';

import {
  FetchReportTemplateInfoQuery,
  useCreateReportTemplateMutation,
  useUpdateReportTemplateMutation,
} from '../../AdminSettingsReportTemplates/__generated__/schema';
import { reportTemplateErrors } from '../consts';
import { transformReportTemplatePrefilledData } from '../utils';

const formSchema = z
  .object({
    name: z.string().min(1),
    description: z.string(),
    filledById: z
      .number()
      .nullable()
      .refine(value => value !== null, formErrors.REQUIRED),
    reportDay: z
      .nativeEnum(WeekDayChoice)
      .nullable()
      .refine(value => value !== null, formErrors.REQUIRED),
    time: z.string().refine(value => value !== '', formErrors.REQUIRED),
    repeat: z
      .nativeEnum(ReportRepeatChoice)
      .nullable()
      .refine(value => value !== null, formErrors.REQUIRED),
    emailNotification: z
      .nativeEnum(ReportEmailNotificationChoice)
      .nullable()
      .refine(value => value !== null, formErrors.REQUIRED),
    sendTo: z.array(z.number()),
    applyToAllProjects: z.boolean(),
    questions: z
      .object({
        id: z.number(),
        type: z
          .nativeEnum(ReportQuestionTypeChoice)
          .nullable()
          .refine(value => value !== null, formErrors.REQUIRED),
        questionText: z.string().min(1).max(300, formErrors.fieldMaxLength(300)),
        showOnOverview: z.boolean(),
        options: z
          .object({
            id: z.number(),
            text: z.string().min(1).max(90, formErrors.fieldMaxLength(90)),
          })
          .array(),
      })
      .array(),
  })
  .superRefine((value, ctx) => {
    if (value.questions) {
      value.questions.forEach((field, index) => {
        if (
          (field.type === ReportQuestionTypeChoice.CHECKBOXES ||
            field.type === ReportQuestionTypeChoice.SINGLE_CHOICE) &&
          field.options.length === 0
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: reportTemplateErrors.EMPTY_OPTIONS_LIST,
            path: ['questions', index, 'options'],
          });
        }
      });
    }
  });

export type ReportTemplateFormValues = z.infer<typeof formSchema>;

interface UseReportTemplateFormReturn {
  form: UseFormReturn<ReportTemplateFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ReportTemplateFormValues>>;
}

interface UseReportTemplateFormProps {
  prefilledData?: FetchReportTemplateInfoQuery['reportTemplate'];
  onSubmitSuccessful?: () => void;
}

const defaultValues: ReportTemplateFormValues = {
  name: '',
  description: '',
  filledById: null,
  reportDay: null,
  time: '',
  repeat: null,
  emailNotification: null,
  sendTo: [],
  applyToAllProjects: false,
  questions: [
    {
      id: getRandomNumber(),
      type: null,
      questionText: '',
      showOnOverview: false,
      options: [],
    },
  ],
};

export function useReportTemplateForm({
  prefilledData,
  onSubmitSuccessful,
}: UseReportTemplateFormProps): UseReportTemplateFormReturn {
  const form = useForm<ReportTemplateFormValues>({
    defaultValues,
    values: prefilledData ? transformReportTemplatePrefilledData(prefilledData) : undefined,
    resolver: zodResolver(formSchema),
  });

  const [createReportTemplate] = useCreateReportTemplateMutation();
  const [updateReportTemplate] = useUpdateReportTemplateMutation();

  const handleSubmit = useCallback(
    async (values: ReportTemplateFormValues) => {
      try {
        const questions = values.questions.map(question => ({
          type: question.type as ReportQuestionTypeChoice,
          questionText: question.questionText,
          options: question.options.map(option => ({ text: option.text })),
          showOnOverview: question.showOnOverview,
        }));

        if (prefilledData) {
          await updateReportTemplate({
            variables: {
              input: {
                ...values,
                id: prefilledData.id,
                questions,
              },
            },
            // TODO add refetch project overview status section later
            // refetchQueries: [],
          });
        } else
          await createReportTemplate({
            variables: {
              input: {
                ...values,
                questions,
              },
            },
            // TODO add refetch project overview status section later
            // refetchQueries: [],
          });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<ReportTemplateFormValues>(e, {
          fields: [
            'name',
            'description',
            'filledById',
            'reportDay',
            'time',
            'repeat',
            'emailNotification',
            'sendTo',
            'applyToAllProjects',
            'questions',
          ],
          setFormError: form.setError,
        });
      }
    },
    [createReportTemplate, form.setError, onSubmitSuccessful, prefilledData, updateReportTemplate],
  );

  return useMemo(
    () => ({
      form,
      handleSubmit: form.handleSubmit(handleSubmit),
    }),
    [form, handleSubmit],
  );
}
