import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { DocumentTemplateType } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import { useDocumentGenerateMutation } from '../../CreateOrUpdateProject/__generated__/schema';
import { FetchDocumentsDocument } from '../__generated__/schema';

const formSchema = z
  .object({
    templateId: z
      .number()
      .nullable()
      .refine(value => value !== null, formErrors.REQUIRED),
    categoryId: z
      .number()
      .nullable()
      .refine(value => value !== null, formErrors.REQUIRED),
    templateFields: z
      .object({
        value: z.string(),
        name: z.string(),
      })
      .array(),
  })
  .superRefine((value, ctx) => {
    if (value.templateFields) {
      value.templateFields.forEach((field, index) => {
        if (field.value === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: formErrors.REQUIRED,
            path: ['templateFields', index, 'value'],
          });
        }
      });
    }
  });

type GenerateDocumentFormValues = z.infer<typeof formSchema>;

interface UseGenerateDocumentFormReturn {
  form: UseFormReturn<GenerateDocumentFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<GenerateDocumentFormValues>>;
  resetForm?: () => void;
}

interface UseAddNewMemberFormProps {
  onSubmitSuccessful?: () => void;
  template: DocumentTemplateType;
  projectId?: number;
}

const defaultValues: GenerateDocumentFormValues = {
  templateId: null,
  categoryId: null,
  templateFields: [{ value: '', name: '' }],
};

export function useGenerateDocumentForm({
  onSubmitSuccessful,
  template,
  projectId,
}: UseAddNewMemberFormProps): UseGenerateDocumentFormReturn {
  const form = useForm<GenerateDocumentFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const templateFields = useMemo(
    () => template?.fields?.map(field => ({ value: '', name: field.name })),
    [template?.fields],
  );

  useEffect(() => {
    form.setValue('templateFields', templateFields ?? []);
  }, [form, templateFields]);

  const [documentGenerate] = useDocumentGenerateMutation();

  const handleSubmit = useCallback(
    async (values: GenerateDocumentFormValues) => {
      try {
        await documentGenerate({
          variables: {
            input: {
              categoryId: values.categoryId,
              templateId: values.templateId as number,
              fields: values.templateFields,
              projectId: projectId || undefined,
              // TODO add internal field
              // internal: !projectId,
            },
          },
          refetchQueries: [FetchDocumentsDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<GenerateDocumentFormValues>(e, {
          fields: ['templateId', 'categoryId'],
          setFormError: form.setError,
        });
      }
    },
    [documentGenerate, form.setError, onSubmitSuccessful, projectId],
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
