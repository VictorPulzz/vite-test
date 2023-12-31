import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { ProjectEnvironmentChoice } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import {
  FetchProjectIntegrationsListDocument,
  useCreateNewProjectIntegrationMutation,
} from '../../../../../../../__generated__/schema';

const formSchema = z.object({
  name: z.string().min(1),
  environment: z
    .nativeEnum(ProjectEnvironmentChoice)
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
  credential: z.object({
    url: z.string(),
    login: z.string(),
    password: z.string(),
  }),
  keys: z
    .object({
      title: z.string().min(1),
      value: z.string().min(1),
    })
    .array(),
});

type CreateNewIntegrationFormValues = z.infer<typeof formSchema>;

interface UseCreateNewIntegrationFormReturn {
  form: UseFormReturn<CreateNewIntegrationFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<CreateNewIntegrationFormValues>>;
  resetForm?(): void;
}

interface UseCreateNewIntegrationFormProps {
  onSubmitSuccessful?(): void;
}

const defaultValues: CreateNewIntegrationFormValues = {
  name: '',
  environment: null,
  credential: {
    url: '',
    login: '',
    password: '',
  },
  keys: [],
};

export function useCreateNewIntegrationForm({
  onSubmitSuccessful,
}: UseCreateNewIntegrationFormProps): UseCreateNewIntegrationFormReturn {
  const form = useForm<CreateNewIntegrationFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const params = useParams();
  const projectId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const [createNewProjectIntegration] = useCreateNewProjectIntegrationMutation();

  const handleSubmit = useCallback(
    async (values: CreateNewIntegrationFormValues) => {
      try {
        await createNewProjectIntegration({
          variables: {
            input: {
              projectId,
              ...values,
            },
          },
          refetchQueries: [FetchProjectIntegrationsListDocument],
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<CreateNewIntegrationFormValues>(e, {
          fields: ['name'],
          setFormError: form.setError,
        });
      }
    },
    [createNewProjectIntegration, form.setError, onSubmitSuccessful, projectId],
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
