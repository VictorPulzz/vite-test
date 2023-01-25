import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import {
  FetchProjectQuery,
  useCreateProjectMutation,
} from '~/view/pages/CreateProject/__generated__/schema';

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

type CreateProjectFormValues = z.infer<typeof formSchema>;

interface UseCreateProjectFormReturn {
  form: UseFormReturn<CreateProjectFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<CreateProjectFormValues>>;
}

interface UseCreateProjectFormProps {
  onSubmitSuccessful?: () => void;
  prefilledData?: FetchProjectQuery['project'];
  id?: number;
}

const defaultValues: CreateProjectFormValues = {
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

export function useCreateProjectForm({
  onSubmitSuccessful,
  id,
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
              id,
              name: values.name,
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
    [createProject, form.setError, id, onSubmitSuccessful],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
