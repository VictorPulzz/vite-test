import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from 'date-fns';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { ProjectPhaseChoice, StatusEnum } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { numberValidation } from '~/utils/validations';

import { FetchProjectQuery, useCreateOrUpdateProjectMutation } from '../__generated__/schema';

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

type ProjectFormValues = z.infer<typeof formSchema>;

interface UseProjectFormReturn {
  form: UseFormReturn<ProjectFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ProjectFormValues>>;
}

interface UseProjectFormProps {
  onSubmitSuccessful?: () => void;
  prefilledData?: FetchProjectQuery['project'];
  id?: number;
}

const defaultValues: ProjectFormValues = {
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

export function useProjectForm({
  onSubmitSuccessful,
  prefilledData,
  id,
}: UseProjectFormProps): UseProjectFormReturn {
  const form = useForm<ProjectFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const [createorUpdateProject] = useCreateOrUpdateProjectMutation();

  useEffect(() => {
    if (prefilledData) {
      form.reset({
        name: prefilledData.name,
        hoursEstimated: prefilledData.hoursEstimated?.toString(),
        startDate: prefilledData.startDate ? new Date(prefilledData.startDate) : null,
        endDate: prefilledData.endDate ? new Date(prefilledData.endDate) : null,
        design: prefilledData.design ?? '',
        roadmap: prefilledData.roadmap ?? '',
        notes: prefilledData.notes ?? '',
      });
    }
  }, [form, prefilledData]);

  const handleSubmit = useCallback(
    async (values: ProjectFormValues) => {
      try {
        await createorUpdateProject({
          variables: {
            input: {
              // TODO add 'id' when edit project will be ready on backend
              // id,
              name: values.name,
              hoursEstimated: +values.hoursEstimated,
              startDate: values.startDate
                ? formatISO(values.startDate, { representation: 'date' })
                : '',
              endDate: values.endDate ? formatISO(values.endDate, { representation: 'date' }) : '',
              design: values.design,
              roadmap: values.roadmap,
              notes: values.notes,
              phase: ProjectPhaseChoice.SIGNED,
              status: StatusEnum.DESIGN,
            },
          },
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<ProjectFormValues>(e, {
          fields: ['name'],
          setFormError: form.setError,
        });
      }
    },
    [createorUpdateProject, form.setError, id, onSubmitSuccessful],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
