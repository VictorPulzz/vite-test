import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import { FetchProjectDetailsQuery } from '../__generated__/schema';

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

type UpdateProjectFormValues = z.infer<typeof formSchema>;

interface UseUpdateProjectFormReturn {
  form: UseFormReturn<UpdateProjectFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<UpdateProjectFormValues>>;
}

interface UseUpdateProjectFormProps {
  onSubmitSuccessful?: () => void;
  prefilledData: FetchProjectDetailsQuery['project'];
  id?: number;
}
// TODO remove when backend will be ready
const defaultValues: UpdateProjectFormValues = {
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

export function useUpdateProjectForm({
  onSubmitSuccessful,
  id,
}: UseUpdateProjectFormProps): UseUpdateProjectFormReturn {
  // TODO set this defaultValues when backend will be ready
  // const defaultValues: UpdateProjectFormValues = useMemo(() => {
  //   return {
  //     name: prefilledData.name ?? '',
  //     status: prefilledData.status ?? '',
  //     estimatedStartDate: prefilledData.estimatedStartDate ?? null,
  //     estimatedEndDate: prefilledData.estimatedEndDate ?? null,
  //     designLink: prefilledData.designLink ?? '',
  //     notes: prefilledData.notes ?? '',
  //     clientName: prefilledData.clientName ?? '',
  //     clientPhone: prefilledData.clientPhone ?? '',
  //     clientEmail: prefilledData.clientEmail ?? '',
  //     clientNotes: prefilledData.clientNotes ?? '',
  //     clientTeamMembers: prefilledData.clientTeamMembers ?? [],
  //   };
  // }, []);

  const form = useForm<UpdateProjectFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  // const [updateProject] = useUpdateProjectMutation();

  const handleSubmit = useCallback(
    async (values: UpdateProjectFormValues) => {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: useUpdateProjectForm.ts:91 ~ values', values);
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: useUpdateProjectForm.ts:64 ~ id', id);
      try {
        // await updateProject({
        //   variables: {
        //     input: {
        //       id,
        //       name: values.name,
        //     },
        //   },
        // });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<UpdateProjectFormValues>(e, {
          fields: ['name'],
          setFormError: form.setError,
        });
      }
    },
    [form.setError, id, onSubmitSuccessful],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
