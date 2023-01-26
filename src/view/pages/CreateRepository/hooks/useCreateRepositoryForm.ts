import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
// import { useCreateRepositoryMutation } from '~/view/pages/CreateProject/__generated__/schema';

const formSchema = z.object({
  name: z.string(),
  project: z.string(),
  platform: z.string(),
  forkFrom: z.string(),
  gitRepoId: z.string(),
  gitSlug: z.string(),
  createEmpty: z.boolean(),
  useTf: z.boolean(),
  withRelay: z.boolean(),
  aws: z.boolean(),
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
  project: '',
  platform: '',
  forkFrom: '',
  gitRepoId: '',
  gitSlug: '',
  createEmpty: false,
  useTf: false,
  withRelay: false,
  aws: false,
};

export function useCreateRepositoryForm({
  onSubmitSuccessful,
}: UseCreateRepositoryFormProps): UseCreateRepositoryFormReturn {
  const form = useForm<CreateRepositoryFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  //   const [createRepository] = useCreateRepositoryMutation();

  const handleSubmit = useCallback(
    async (values: CreateRepositoryFormValues) => {
      try {
        // eslint-disable-next-line prettier/prettier, no-console
        console.log('🚀 ~ file: useCreateRepositoryForm.ts:58 ~ values', values);
        // await createRepository({
        //   variables: {
        //     input: {
        //       name: values.name,
        //     },
        //   },
        // });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<CreateRepositoryFormValues>(e, {
          fields: ['name'],
          setFormError: form.setError,
        });
      }
    },
    [form.setError, onSubmitSuccessful],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
