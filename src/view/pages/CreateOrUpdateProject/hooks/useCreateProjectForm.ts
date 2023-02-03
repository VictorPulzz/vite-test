import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { DateFormat } from '~/constants/dates';
import { formErrors } from '~/constants/form';
import { ProjectPhaseChoice } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { numberValidation } from '~/utils/validations';

import { useCreateProjectMutation } from '../__generated__/schema';

const formSchema = z
  .object({
    name: z.string().refine(value => value !== '', formErrors.REQUIRED),
    phase: z.string(),
    hoursEstimated: z
      .string()
      .refine(value => value !== '', formErrors.REQUIRED)
      .and(numberValidation),
    startDate: z
      .date()
      .nullable()
      .refine(value => value !== null, formErrors.REQUIRED),
    endDate: z.date().nullable(),
    design: z.string(),
    roadmap: z.string(),
    notes: z.string(),
    clientTeamMembers: z
      .object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        position: z.string(),
        notes: z.string(),
      })
      .array(),
  })
  .superRefine((value, ctx) => {
    if (value.endDate && value.startDate) {
      if (value.startDate > value.endDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['startDate'],
          message: formErrors.INVALID_RANGE,
        });
      }
    }
  });

type CreateProjectFormValues = z.infer<typeof formSchema>;

interface UseCreateProjectFormReturn {
  form: UseFormReturn<CreateProjectFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<CreateProjectFormValues>>;
}

interface UseCreateProjectFormProps {
  onSubmitSuccessful?: () => void;
}

const defaultValues: CreateProjectFormValues = {
  name: '',
  phase: '',
  hoursEstimated: '',
  startDate: null,
  endDate: null,
  design: '',
  roadmap: '',
  notes: '',
  clientTeamMembers: [],
};

export function useCreateProjectForm({
  onSubmitSuccessful,
}: UseCreateProjectFormProps): UseCreateProjectFormReturn {
  const form = useForm<CreateProjectFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const [createProject] = useCreateProjectMutation();

  const handleSubmit = useCallback(
    async (values: CreateProjectFormValues) => {
      try {
        await createProject({
          variables: {
            input: {
              name: values.name,
              hoursEstimated: +values.hoursEstimated,
              startDate: format(new Date(values.startDate ?? ''), DateFormat.YMD),
              endDate: format(new Date(values.endDate ?? ''), DateFormat.YMD),
              design: values.design,
              roadmap: values.roadmap,
              notes: values.notes,
              phase: ProjectPhaseChoice.SIGNED,
            },
          },
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<CreateProjectFormValues>(e, {
          fields: ['name'],
          setFormError: form.setError,
        });
      }
    },
    [createProject, form.setError, onSubmitSuccessful],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
