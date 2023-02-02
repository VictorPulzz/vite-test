import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

const formSchema = z.object({
  submittedBy: z.string(),
  submittedDateRange: z.date().nullable(),
});

type ProjectReportsFormValues = z.infer<typeof formSchema>;

interface UseGetReportsFormReturn {
  form: UseFormReturn<ProjectReportsFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ProjectReportsFormValues>>;
}

const defaultValues: ProjectReportsFormValues = {
  submittedBy: '',
  submittedDateRange: null,
};

export function useGetReportsForm(): UseGetReportsFormReturn {
  const form = useForm<ProjectReportsFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  // TODO fix when backend will be ready
  const handleSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (values: ProjectReportsFormValues) => {
      try {
        /* empty */
      } catch (e) {
        processGqlErrorResponse<ProjectReportsFormValues>(e, {
          fields: ['submittedBy', 'submittedDateRange'],
          setFormError: form.setError,
        });
      }
    },
    [form.setError],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
