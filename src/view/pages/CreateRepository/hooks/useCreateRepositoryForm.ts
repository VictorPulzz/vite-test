import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { RepositoryTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { isNil } from '~/utils/isNil';
import { FetchRepositoriesDocument } from '~/view/pages/Repositories/__generated__/schema';

import { FetchProjectRepositoriesListDocument } from '../../ProjectDetails/__generated__/schema';
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
  technologies: z.array(z.number()).refine(value => value.length !== 0, formErrors.REQUIRED),
  boilerplateId: z.number().nullable(),
  gitRepoId: z.string(),
  gitSlug: z.string(),
  useTerraform: z.boolean(),
  withRelay: z.boolean(),
  awsSecrets: z.boolean(),
  withExistingRepo: z.boolean(),
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
  technologies: [],
  boilerplateId: null,
  gitRepoId: '',
  gitSlug: '',
  useTerraform: false,
  withRelay: false,
  awsSecrets: false,
  withExistingRepo: false,
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
              technologies: !isNil(values.technologies) ? values.technologies : [],
              type: values.type as RepositoryTypeChoice,
            },
          },
          refetchQueries: [FetchRepositoriesDocument, FetchProjectRepositoriesListDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<CreateRepositoryFormValues>(e, {
          fields: ['name', 'type', 'technologies', 'gitRepoId', 'gitSlug'],
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
