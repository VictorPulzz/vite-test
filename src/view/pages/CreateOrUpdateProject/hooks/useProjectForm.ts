import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { ProjectPhaseChoice, StatusEnum } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { numberValidation } from '~/utils/validations';
import { transformProjectPrefilledData } from '~/view/pages/CreateOrUpdateProject/utils';

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
    endDate: z
      .date()
      .nullable()
      .refine(value => value !== null, formErrors.REQUIRED),
    design: z.string(),
    roadmap: z.string(),
    notes: z.string(),
    // TODO add validations on fields below when backend will be ready
    isGenerateDesignAndPrototypeAgreement: z.boolean(),
    isGenerateServiceAgreement: z.boolean(),
    companyName: z.string(),
    companyAcn: z.string(),
    depositHours: z.string().and(numberValidation),
    hourlyRate: z.string().and(numberValidation),
    address: z.string(),
    abn: z.string(),
    clientTeamMembers: z
      .object({
        fullName: z.string(),
        email: z.string(),
        phone: z.string(),
        position: z.string(),
        notes: z.string(),
        pointContact: z.boolean(),
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

export type ProjectFormValues = z.infer<typeof formSchema>;

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
  isGenerateDesignAndPrototypeAgreement: false,
  isGenerateServiceAgreement: false,
  companyName: '',
  companyAcn: '',
  depositHours: '',
  hourlyRate: '',
  address: '',
  abn: '',
  clientTeamMembers: [],
};

export function useProjectForm({
  onSubmitSuccessful,
  prefilledData,
  id,
}: UseProjectFormProps): UseProjectFormReturn {
  const form = useForm<ProjectFormValues>({
    defaultValues,
    // TODO fix transformPrefilledData when backend will be ready
    values: prefilledData ? transformProjectPrefilledData(prefilledData) : undefined,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const [projectCreateUpdate] = useCreateOrUpdateProjectMutation();

  const handleSubmit = useCallback(
    async (values: ProjectFormValues) => {
      try {
        await projectCreateUpdate({
          variables: {
            input: {
              id,
              name: values.name,
              hoursEstimated: +values.hoursEstimated,
              startDate: values.startDate
                ? formatISO(values.startDate, { representation: 'date' })
                : '',
              endDate: values.endDate ? formatISO(values.endDate, { representation: 'date' }) : '',
              design: values.design,
              roadmap: values.roadmap,
              notes: values.notes,
              phase: ProjectPhaseChoice.PRE_SIGNED,
              status: StatusEnum.IN_PROGRESS,
              clientTeam: values.clientTeamMembers ?? [],
              // TODO add rest fields
            },
          },
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<ProjectFormValues>(e, {
          fields: ['name', 'startDate', 'endDate', 'design', 'roadmap', 'notes'],
          setFormError: form.setError,
        });
      }
    },
    [projectCreateUpdate, form.setError, id, onSubmitSuccessful],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
