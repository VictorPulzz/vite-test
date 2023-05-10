import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import {
  FetchDocumentTemplatesListDocument,
  useCreateDocumentTemplateMutation,
} from '~/view/pages/AdminSettingsDocumentTemplates/__generated__/schema';
import { DocumentTemplatesResultType } from '~/view/pages/AdminSettingsDocumentTemplates/types';

const formSchema = z.object({
  name: z.string().refine(value => value !== '', formErrors.REQUIRED),
  url: z.string().refine(value => value !== '', formErrors.REQUIRED),
  // TODO add description field when backend will be ready
  // description: z.string(),
  fields: z
    .object({
      name: z.string().refine(value => value !== '', formErrors.REQUIRED),
      description: z.string().refine(value => value !== '', formErrors.REQUIRED),
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
  prefilledData?: DocumentTemplatesResultType;
}

const defaultValues: DocumentTemplateFormValues = {
  name: '',
  url: '',
  // description: '',
  fields: [],
};

export function useDocumentTemplateForm({
  onSubmitSuccessful,
  prefilledData,
}: UseDocumentTemplateFormProps): UseDocumentTemplateFormReturn {
  const form = useForm<DocumentTemplateFormValues>({
    defaultValues,
    // values: prefilledData ? transformDocumentTemplatePrefilledData(prefilledData) : undefined,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const isEditMode = !!prefilledData;

  const [createDocumentTemplate] = useCreateDocumentTemplateMutation();
  // const [updateDocumentTemplate] = useUpdateDocumentTemplateMutation();

  const handleSubmit = useCallback(
    async (values: DocumentTemplateFormValues) => {
      try {
        if (isEditMode) {
          // await updateDocumentTemplate({
          //   variables: {
          //     input: {
          //       id: prefilledData.id,
          //       ...values,
          //     },
          //   },
          //   refetchQueries: [FetchDocumentTemplatesListDocument],
          // });
        } else
          await createDocumentTemplate({
            variables: {
              input: {
                ...values,
              },
            },
            refetchQueries: [FetchDocumentTemplatesListDocument],
          });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<DocumentTemplateFormValues>(e, {
          // TODO add description field when backend will be ready
          fields: ['name', 'url', 'fields'],
          setFormError: form.setError,
        });
      }
    },
    [createDocumentTemplate, form.setError, isEditMode, onSubmitSuccessful],
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
