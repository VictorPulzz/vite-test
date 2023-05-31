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

import { transformDocumentTemplatePrefilledData } from '../utils';

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

export type DocumentTemplateFormValues = z.infer<typeof formSchema>;

interface UseDocumentTemplateFormReturn {
  form: UseFormReturn<DocumentTemplateFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<DocumentTemplateFormValues>>;
  resetForm?(): void;
}

interface UseDocumentTemplateFormProps {
  onSubmitSuccessful?(): void;
  prefilledData?: FetchDocumentTemplateInfoQuery['documentTemplate'];
}

const defaultValues: DocumentTemplateFormValues = {
  name: '',
  url: '',
  description: '',
  fields: [],
};

export function useDocumentTemplateForm({
  onSubmitSuccessful,
  prefilledData,
}: UseDocumentTemplateFormProps): UseDocumentTemplateFormReturn {
  const form = useForm<DocumentTemplateFormValues>({
    defaultValues,
    values: prefilledData ? transformDocumentTemplatePrefilledData(prefilledData) : undefined,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [createOrUpdateDocumentTemplate] = useCreateOrUpdateDocumentTemplateMutation();

  const handleSubmit = useCallback(
    async (values: DocumentTemplateFormValues) => {
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
        processGqlErrorResponse<DocumentTemplateFormValues>(e, {
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
