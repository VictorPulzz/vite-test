import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { RepositoryTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import { useCreateRepositoryMutation } from '../__generated__/schema';

const formSchema = z.object({
  name: z.string(),
  projectId: z.number().nullable(),
  type: z.nativeEnum(RepositoryTypeChoice).nullable(),
  boilerplateId: z.number().nullable(),
  gitRepoId: z.string(),
  gitSlug: z.string(),
  createEmpty: z.boolean(),
  useTerraform: z.boolean(),
  withRelay: z.boolean(),
  awsSecrets: z.boolean(),
});

type RepositoryFormValues = z.infer<typeof formSchema>;

interface UseRepositoryFormReturn {
  form: UseFormReturn<RepositoryFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<RepositoryFormValues>>;
}

interface UseRepositoryFormProps {
  onSubmitSuccessful?: () => void;
}

const defaultValues: RepositoryFormValues = {
  name: '',
  projectId: null,
  type: null,
  boilerplateId: null,
  gitRepoId: '',
  gitSlug: '',
  createEmpty: false,
  useTerraform: false,
  withRelay: false,
  awsSecrets: false,
};

export function useRepositoryForm({
  onSubmitSuccessful,
}: UseRepositoryFormProps): UseRepositoryFormReturn {
  const form = useForm<RepositoryFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const [createRepository] = useCreateRepositoryMutation();

  const handleSubmit = useCallback(
    async (values: RepositoryFormValues) => {
      try {
        await createRepository({
          variables: {
            input: {
              name: values.name,
              projectId: Number(values.projectId),
              type: values.type as RepositoryTypeChoice,
              boilerplateId: values.boilerplateId,
              gitRepoId: values.gitRepoId,
              gitSlug: values.gitSlug,
              createEmpty: values.createEmpty,
              useTerraform: values.useTerraform,
              withRelay: values.withRelay,
              awsSecrets: values.awsSecrets,
            },
          },
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<RepositoryFormValues>(e, {
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
