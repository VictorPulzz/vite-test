import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { DocumentTemplateType } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import { useDocumentGenerateMutation } from '../__generated__/schema';

const formSchema = z.object({
  templateFields: z
    .object({
      name: z.string(),
      value: z.string(),
    })
    .array(),
});

export type GenerateDocumentFormValues = z.infer<typeof formSchema>;

interface UseGenerateDocumentFormReturn {
  form: UseFormReturn<GenerateDocumentFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<GenerateDocumentFormValues>>;
  resetForm?(): void;
}

interface UseGenerateDocumentProps {
  onSubmitSuccessful?(): void;
  template: DocumentTemplateType;
}

const defaultValues: GenerateDocumentFormValues = {
  templateFields: [{ name: '', value: '' }],
};

export function useGenerateDocumentForm({
  onSubmitSuccessful,
  template,
}: UseGenerateDocumentProps): UseGenerateDocumentFormReturn {
  const form = useForm<GenerateDocumentFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fields = template?.fields?.map(field => ({ value: '', name: field.name }));
    form.setValue('templateFields', fields ?? []);
  }, [form, template?.fields]);

  const [documentGenerate] = useDocumentGenerateMutation();

  const handleSubmit = useCallback(
    async (values: GenerateDocumentFormValues) => {
      try {
        const prepeareValues = template?.fields?.map((field, index) => ({
          name: field.name,
          value: values.templateFields[index].value,
        }));
        //  TODO add project id from response projectCreateUpdate
        await documentGenerate({
          variables: {
            input: {
              projectId: 39,
              templateId: template?.id,
              fields: prepeareValues,
            },
          },
        });

        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<GenerateDocumentFormValues>(e, {
          setFormError: form.setError,
        });
      }
    },
    [documentGenerate, form.setError, onSubmitSuccessful, template?.fields, template?.id],
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
