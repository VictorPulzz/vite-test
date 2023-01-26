import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

// import { FetchRepositoryDetailsQuery } from '../__generated__/schema';

const formSchema = z.object({
  name: z.string(),
});

type UpdateRepositoryFormValues = z.infer<typeof formSchema>;

interface UseUpdateRepositoryFormReturn {
  form: UseFormReturn<UpdateRepositoryFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<UpdateRepositoryFormValues>>;
}

interface UseUpdateRepositoryFormProps {
  onSubmitSuccessful?: () => void;
  // prefilledData: FetchRepositoryDetailsQuery['repository'];
  id?: number;
}
// TODO remove when backend will be ready
const defaultValues: UpdateRepositoryFormValues = {
  name: '',
};

export function useUpdateRepositoryForm({
  onSubmitSuccessful,
  id,
}: UseUpdateRepositoryFormProps): UseUpdateRepositoryFormReturn {
  // TODO set this defaultValues when backend will be ready
  // const defaultValues: UpdateProjectFormValues = useMemo(() => {
  //   return {
  //     name: prefilledData.name ?? '',
  //   };
  // }, []);

  const form = useForm<UpdateRepositoryFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  // const [updateRepository] = useUpdateRepositoryMutation();

  const handleSubmit = useCallback(
    async (values: UpdateRepositoryFormValues) => {
      // eslint-disable-next-line prettier/prettier, no-console
      console.log('🚀 ~ file: useUpdateRepositoryForm.ts:88 ~ values', values);
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: useUpdateRepositoryForm.ts:62 ~ id', id);
      try {
        // await updateRepository({
        //   variables: {
        //     input: {
        //       id,
        //       name: values.name,
        //     },
        //   },
        // });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<UpdateRepositoryFormValues>(e, {
          fields: ['name'],
          setFormError: form.setError,
        });
      }
    },
    [form.setError, id, onSubmitSuccessful],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
