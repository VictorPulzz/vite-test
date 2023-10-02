import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import {
  FetchDocumentTemplateInfoQuery,
  FetchDocumentTemplatesListDocument,
  useCreateOrUpdateDocumentTemplateMutation,
} from '~/view/pages/AdminSettingsDocumentTemplates/__generated__/schema';

const formSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
  description: z.string(),
  fields: z
    .object({
      name: z.string().min(1),
      description: z.string().min(1),
    })
    .array(),
});

export type ReportTemplateFormValues = z.infer<typeof formSchema>;

interface UseReportTemplateFormReturn {
  form: UseFormReturn<ReportTemplateFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ReportTemplateFormValues>>;
  resetForm?(): void;
}

interface UseReportTemplateFormProps {
  onSubmitSuccessful?(): void;
  prefilledData?: FetchDocumentTemplateInfoQuery['documentTemplate'];
}

const defaultValues: ReportTemplateFormValues = {
  name: '',
  url: '',
  description: '',
  fields: [],
};

export function useReportTemplateForm({
  onSubmitSuccessful,
  prefilledData,
}: UseReportTemplateFormProps): UseReportTemplateFormReturn {
  const form = useForm<ReportTemplateFormValues>({
    defaultValues,
    // values: prefilledData ? transformReportTemplatePrefilledData(prefilledData) : undefined,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [createOrUpdateDocumentTemplate] = useCreateOrUpdateDocumentTemplateMutation();

  const handleSubmit = useCallback(
    async (values: ReportTemplateFormValues) => {
      try {
        await createOrUpdateDocumentTemplate({
          variables: {
            input: {
              id: prefilledData?.id,
              ...values,
            },
          },
          refetchQueries: [FetchDocumentTemplatesListDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<ReportTemplateFormValues>(e, {
          fields: ['name', 'url', 'description', 'fields'],
          setFormError: form.setError,
        });
      }
    },
    [createOrUpdateDocumentTemplate, form.setError, onSubmitSuccessful, prefilledData?.id],
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
