import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

const formSchema = z.object({
  submittedBy: z.string(),
  submittedReportsDateRange: z.date().nullable(),
  submittedClientsDateRange: z.date().nullable(),
});

type ProjectReportsFormValues = z.infer<typeof formSchema>;

interface UseGetReportsFormReturn {
  form: UseFormReturn<ProjectReportsFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ProjectReportsFormValues>>;
}

const defaultValues: ProjectReportsFormValues = {
  submittedBy: '',
  submittedReportsDateRange: null,
  submittedClientsDateRange: null,
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
          fields: ['submittedBy', 'submittedReportsDateRange', 'submittedClientsDateRange'],
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
