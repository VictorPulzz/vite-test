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
  status: z.string(),
  estimatedStartDate: z.date().nullable(),
  estimatedEndDate: z.date().nullable(),
  designLink: z.string(),
  notes: z.string(),
  clientName: z.string(),
  clientPhone: z.string(),
  clientEmail: z.string(),
  clientNotes: z.string(),
  clientTeamMembers: z
    .object({
      name: z.string(),
      position: z.string(),
      email: z.string(),
      phone: z.string(),
    })
    .array(),
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
  status: '',
  estimatedStartDate: null,
  estimatedEndDate: null,
  designLink: '',
  notes: '',
  clientName: '',
  clientPhone: '',
  clientEmail: '',
  clientNotes: '',
  clientTeamMembers: [{ name: '', position: '', email: '', phone: '' }],
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
        status: prefilledData.status ?? '',
        estimatedStartDate: prefilledData.estimatedStartDate ?? null,
        estimatedEndDate: prefilledData.estimatedEndDate ?? null,
        designLink: prefilledData.designLink ?? '',
        notes: prefilledData.notes ?? '',
        clientName: prefilledData.clientName ?? '',
        clientPhone: prefilledData.clientPhone ?? '',
        clientEmail: prefilledData.clientEmail ?? '',
        clientNotes: prefilledData.clientNotes ?? '',
        clientTeamMembers: prefilledData.clientTeamMembers ?? [],
  });
    }
  }, [form, prefilledData]); */

  const handleSubmit = useCallback(
    async (values: ProjectFormValues) => {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: useProjectForm.ts:138 ~ values', values);
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
