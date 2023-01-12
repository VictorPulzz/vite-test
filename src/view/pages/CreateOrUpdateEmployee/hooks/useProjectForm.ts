import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import {
  FetchProjectQuery,
  useCreateOrUpdateProjectMutation,
} from '~/view/pages/CreateOrUpdateProject/__generated__/schema';

const formSchema = z.object({
  name: z.string(),
  clientName: z.string(),
  phase: z.string(),
  status: z.string(),
  designLink: z.string(),
  hoursEstimated: z.number(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  pm: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      photo: z.union([z.string(), z.instanceof(File)]).nullable(),
      isActive: z.boolean(),
    })
    .array(),
  qa: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      photo: z.union([z.string(), z.instanceof(File)]).nullable(),
      isActive: z.boolean(),
    })
    .array(),
  frontDev: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      photo: z.union([z.string(), z.instanceof(File)]).nullable(),
      isActive: z.boolean(),
    })
    .array(),
  backDev: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      photo: z.union([z.string(), z.instanceof(File)]).nullable(),
      isActive: z.boolean(),
    })
    .array(),
  designer: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      photo: z.union([z.string(), z.instanceof(File)]).nullable(),
      isActive: z.boolean(),
    })
    .array(),
  notes: z.string(),
});

type ProjectFormValues = z.infer<typeof formSchema>;

interface UseProjectFormReturn {
  form: UseFormReturn<ProjectFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ProjectFormValues>>;
}

interface UseClientFormProps {
  onSubmitSuccessful?: () => void;
  prefilledData?: FetchProjectQuery['project'];
  id?: number;
}

const defaultValues: ProjectFormValues = {
  name: '',
  clientName: '',
  phase: '',
  status: '',
  designLink: '',
  hoursEstimated: 0,
  startDate: null,
  endDate: null,
  pm: [],
  qa: [],
  frontDev: [],
  backDev: [],
  designer: [],
  notes: '',
};

export function useProjectForm({
  onSubmitSuccessful,
  id,
}: UseClientFormProps): UseProjectFormReturn {
  const form = useForm<ProjectFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const [createOrUpdateProject] = useCreateOrUpdateProjectMutation();

  /* useEffect(() => {
    if (prefilledData) {
      form.reset({
        name: prefilledData.name ?? '',
        /!* clientName: prefilledData.clientName ?? '',
        phase: prefilledData.phase ?? '',
        status: prefilledData.status ?? '',
        designLink: prefilledData.designLink ?? '',
        hoursEstimated: prefilledData.hoursEstimated ?? 0,
        startDate: prefilledData.startDate ?? null,
        endDate: prefilledData.endDate ?? null,
        pm: prefilledData.pm ?? [],
        qa: prefilledData.qa ?? [],
        frontDev: prefilledData.frontDev ?? [],
        backDev: prefilledData.backDev ?? [],
        notes: prefilledData.notes ?? '', *!/
      });
    }
  }, [form, prefilledData]); */

  const handleSubmit = useCallback(
    async (values: ProjectFormValues) => {
      try {
        await createOrUpdateProject({
          variables: {
            input: {
              id,
              name: values.name,
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
    [createOrUpdateProject, form.setError, id, onSubmitSuccessful],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
