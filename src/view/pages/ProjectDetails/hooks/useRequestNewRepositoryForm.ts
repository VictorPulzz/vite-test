import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { RepositoryTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import {
  FetchProjectRepositoriesListDocument,
  useRequestNewProjectRepositoryMutation,
} from '../__generated__/schema';

const formSchema = z.object({
  type: z
    .nativeEnum(RepositoryTypeChoice)
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
});

type RequestNewRepositoryFormValues = z.infer<typeof formSchema>;

interface UseRequestNewRepositoryFormReturn {
  form: UseFormReturn<RequestNewRepositoryFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<RequestNewRepositoryFormValues>>;
  resetForm?(): void;
}

interface UseRequestNewRepositoryFormProps {
  onSubmitSuccessful?(): void;
}

const defaultValues: RequestNewRepositoryFormValues = {
  type: null,
};

export function useRequestNewRepositoryForm({
  onSubmitSuccessful,
}: UseRequestNewRepositoryFormProps): UseRequestNewRepositoryFormReturn {
  const form = useForm<RequestNewRepositoryFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const params = useParams();
  const projectId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);
  // TODO change requestNewProjectRepository to requestCreate mutation
  const [requestNewProjectRepository] = useRequestNewProjectRepositoryMutation();

  const handleSubmit = useCallback(
    async (values: RequestNewRepositoryFormValues) => {
      try {
        // eslint-disable-next-line no-console
        console.log('🚀 ~ file: useRequestNewRepositoryForm.ts:54 ~ values:', values);
        await requestNewProjectRepository({
          variables: {
            input: {
              id: projectId,
              // platform: values.platform,
            },
          },
          refetchQueries: [FetchProjectRepositoriesListDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<RequestNewRepositoryFormValues>(e, {
          fields: ['type'],
          setFormError: form.setError,
        });
      }
    },
    [form.setError, onSubmitSuccessful, projectId, requestNewProjectRepository],
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
