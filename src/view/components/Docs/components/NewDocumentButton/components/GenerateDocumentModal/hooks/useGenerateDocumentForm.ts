import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { DocumentTemplateType } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import {
  FetchInternalDocumentsDocument,
  FetchProjectDocumentsDocument,
  FetchUserDocumentsDocument,
  useGenerateInternalDocumentMutation,
  useGenerateProjectDocumentMutation,
  useGenerateUserDocumentMutation,
} from '~/view/components/Docs/__generated__/schema';
import { DocsType } from '~/view/components/Docs/types';

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

interface UseGenerateDocumentFormProps {
  onSubmitSuccessful?: () => void;
  template: DocumentTemplateType;
  projectId: number;
  userId?: number;
  type: DocsType;
}

const defaultValues: GenerateDocumentFormValues = {
  templateId: null,
  categoryId: null,
  templateFields: [],
};

export function useGenerateDocumentForm({
  onSubmitSuccessful,
  template,
  projectId,
  userId,
  type,
}: UseGenerateDocumentFormProps): UseGenerateDocumentFormReturn {
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

  const [generateInternalDocument] = useGenerateInternalDocumentMutation();
  const [generateProjectDocument] = useGenerateProjectDocumentMutation();
  const [generateUserDocument] = useGenerateUserDocumentMutation();

  const handleSubmit = useCallback(
    async (values: GenerateDocumentFormValues) => {
      const docsValues = {
        input: {
          categoryId: values.categoryId,
          templateId: values.templateId as number,
          fields: values.templateFields,
          projectId: projectId || undefined,
          userId: userId || undefined,
        },
      };
      try {
        if (type === DocsType.INTERNAL) {
          await generateInternalDocument({
            variables: docsValues,
            refetchQueries: [FetchInternalDocumentsDocument],
          });
        }
        if (type === DocsType.PROJECT) {
          await generateProjectDocument({
            variables: docsValues,
            refetchQueries: [FetchProjectDocumentsDocument],
          });
        }
        if (type === DocsType.USER) {
          await generateUserDocument({
            variables: docsValues,
            refetchQueries: [FetchUserDocumentsDocument],
          });
        }
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<GenerateDocumentFormValues>(e, {
          fields: ['templateId', 'categoryId'],
          setFormError: form.setError,
        });
      }
    },
    [
      form.setError,
      generateInternalDocument,
      generateProjectDocument,
      generateUserDocument,
      onSubmitSuccessful,
      projectId,
      type,
      userId,
    ],
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
