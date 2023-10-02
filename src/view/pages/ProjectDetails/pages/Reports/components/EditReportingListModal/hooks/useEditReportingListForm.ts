import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { useUpdateProjectReportTemplatesActivityMutation } from '~/view/pages/ProjectDetails/__generated__/schema';

const formSchema = z.object({
  reports: z.array(z.number()),
});

type EditReportingListFormValues = z.infer<typeof formSchema>;

interface UseEditReportingListFormReturn {
  form: UseFormReturn<EditReportingListFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<EditReportingListFormValues>>;
  resetForm?: () => void;
}

interface UseEditReportingListFormProps {
  activeReportsIds: number[];
  projectId: number;
  onSubmitSuccessful?: () => void;
}

const defaultValues: EditReportingListFormValues = {
  reports: [],
};

export function useEditReportingListForm({
  activeReportsIds,
  projectId,
  onSubmitSuccessful,
}: UseEditReportingListFormProps): UseEditReportingListFormReturn {
  const form = useForm<EditReportingListFormValues>({
    defaultValues,
    values: activeReportsIds ? { reports: activeReportsIds } : undefined,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [updateProjectReportTemplatesActivity] = useUpdateProjectReportTemplatesActivityMutation();

  const handleSubmit = useCallback(
    async (values: EditReportingListFormValues) => {
      try {
        await updateProjectReportTemplatesActivity({
          variables: {
            input: {
              id: projectId,
              reportTemplates: values.reports,
            },
          },
          refetchQueries: [],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<EditReportingListFormValues>(e, {
          fields: ['reports'],
          setFormError: form.setError,
        });
      }
    },
    [form.setError, onSubmitSuccessful, projectId, updateProjectReportTemplatesActivity],
  );

  return useMemo(
    () => ({
      form,
      handleSubmit: form.handleSubmit(handleSubmit),
      resetForm: () => form.reset(defaultValues),
    }),
    [form, handleSubmit],
  );
}
