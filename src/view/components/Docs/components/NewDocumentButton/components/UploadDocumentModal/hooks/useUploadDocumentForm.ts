import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import {
  FetchInternalDocumentsDocument,
  FetchProjectDocumentsDocument,
  FetchUserDocumentsDocument,
  useUploadInternalDocumentMutation,
  useUploadProjectDocumentMutation,
  useUploadUserDocumentMutation,
} from '~/view/components/Docs/__generated__/schema';
import { DocsType } from '~/view/components/Docs/types';

const formSchema = z.object({
  categoryId: z
    .number()
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
  document: z
    .instanceof(File)
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
});

type UploadDocumentFormValues = z.infer<typeof formSchema>;

interface UseUploadDocumentFormReturn {
  form: UseFormReturn<UploadDocumentFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<UploadDocumentFormValues>>;
  resetForm?: () => void;
}

interface UseUploadDocumentFormProps {
  onSubmitSuccessful?(): void;
  projectId?: number;
  userId?: number;
  type: DocsType;
}

const defaultValues: UploadDocumentFormValues = {
  categoryId: null,
  document: null,
};

export function useUploadDocumentForm({
  onSubmitSuccessful,
  projectId,
  userId,
  type,
}: UseUploadDocumentFormProps): UseUploadDocumentFormReturn {
  const form = useForm<UploadDocumentFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [uploadInternalDocument] = useUploadInternalDocumentMutation();
  const [uploadProjectDocument] = useUploadProjectDocumentMutation();
  const [uploadUserDocument] = useUploadUserDocumentMutation();

  const handleSubmit = useCallback(
    async (values: UploadDocumentFormValues) => {
      const docsValues = {
        input: {
          categoryId: values.categoryId,
          file: values.document as File,
          projectId: projectId || undefined,
          userId: userId || undefined,
        },
      };
      try {
        if (type === DocsType.INTERNAL) {
          await uploadInternalDocument({
            variables: docsValues,
            refetchQueries: [FetchInternalDocumentsDocument],
          });
        }
        if (type === DocsType.PROJECT) {
          await uploadProjectDocument({
            variables: docsValues,
            refetchQueries: [FetchProjectDocumentsDocument],
          });
        }
        if (type === DocsType.USER) {
          await uploadUserDocument({
            variables: docsValues,
            refetchQueries: [FetchUserDocumentsDocument],
          });
        }
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<UploadDocumentFormValues>(e, {
          fields: ['categoryId', 'document'],
          setFormError: form.setError,
        });
      }
    },
    [
      form.setError,
      onSubmitSuccessful,
      projectId,
      type,
      uploadInternalDocument,
      uploadProjectDocument,
      uploadUserDocument,
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
