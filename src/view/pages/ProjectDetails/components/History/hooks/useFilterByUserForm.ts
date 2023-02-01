import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

const formSchema = z.object({
  user: z.string(),
});

type ProjectHistoryFormValues = z.infer<typeof formSchema>;

interface UseFilterByUserFormReturn {
  form: UseFormReturn<ProjectHistoryFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ProjectHistoryFormValues>>;
}

const defaultValues: ProjectHistoryFormValues = {
  user: '',
};

export function useFilterByUserForm(): UseFilterByUserFormReturn {
  const form = useForm<ProjectHistoryFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  // TODO fix when backend will be ready
  const handleSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (values: ProjectHistoryFormValues) => {
      try {
        /* empty */
      } catch (e) {
        processGqlErrorResponse<ProjectHistoryFormValues>(e, {
          fields: ['user'],
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
