import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { RepositoryTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import { useCreateRepositoryMutation } from '../__generated__/schema';

const formSchema = z.object({
  name: z.string().refine(value => value !== '', formErrors.REQUIRED),
  projectId: z
    .number()
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
  type: z
    .nativeEnum(RepositoryTypeChoice)
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),

  boilerplateId: z
    .number()
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
  gitRepoId: z.string().refine(value => value !== '', formErrors.REQUIRED),
  gitSlug: z.string().refine(value => value !== '', formErrors.REQUIRED),
  useTerraform: z.boolean(),
  withRelay: z.boolean(),
  awsSecrets: z.boolean(),
});

type CreateRepositoryFormValues = z.infer<typeof formSchema>;

interface UseCreateRepositoryFormReturn {
  form: UseFormReturn<CreateRepositoryFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<CreateRepositoryFormValues>>;
}

interface UseCreateRepositoryFormProps {
  onSubmitSuccessful?: () => void;
}

const defaultValues: CreateRepositoryFormValues = {
  name: '',
  projectId: null,
  type: null,
  boilerplateId: null,
  gitRepoId: '',
  gitSlug: '',
  useTerraform: false,
  withRelay: false,
  awsSecrets: false,
};

export function useCreateRepositoryForm({
  onSubmitSuccessful,
}: UseCreateRepositoryFormProps): UseCreateRepositoryFormReturn {
  const form = useForm<CreateRepositoryFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const [createRepository] = useCreateRepositoryMutation();

  const handleSubmit = useCallback(
    async (values: CreateRepositoryFormValues) => {
      try {
        await createRepository({
          variables: {
            input: {
              ...values,
              projectId: values.projectId as number,
              type: values.type as RepositoryTypeChoice,
            },
          },
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<CreateRepositoryFormValues>(e, {
          fields: ['name'],
          setFormError: form.setError,
        });
      }
    },
    [createRepository, form.setError, onSubmitSuccessful],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
