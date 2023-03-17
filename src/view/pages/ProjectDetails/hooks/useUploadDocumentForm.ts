import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import { FetchDocumentsDocument, useUploadDocumentMutation } from '../__generated__/schema';

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
  onSubmitSuccessful?: () => void;
  projectId?: number;
}

const defaultValues: UploadDocumentFormValues = {
  categoryId: null,
  document: null,
};

export function useUploadDocumentForm({
  onSubmitSuccessful,
  projectId,
}: UseUploadDocumentFormProps): UseUploadDocumentFormReturn {
  const form = useForm<UploadDocumentFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [uploadDocument] = useUploadDocumentMutation();

  const handleSubmit = useCallback(
    async (values: UploadDocumentFormValues) => {
      try {
        await uploadDocument({
          variables: {
            input: {
              categoryId: values.categoryId,
              file: values.document,
              projectId: projectId || undefined,
              internal: !projectId,
            },
          },
          refetchQueries: [FetchDocumentsDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<UploadDocumentFormValues>(e, {
          fields: ['categoryId', 'document'],
          setFormError: form.setError,
        });
      }
    },
    [form.setError, onSubmitSuccessful, projectId, uploadDocument],
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
