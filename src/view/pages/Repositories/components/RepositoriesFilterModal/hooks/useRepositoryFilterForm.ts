import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { RepositoryTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { RepositoriesFilterModalProps } from '~/view/pages/Repositories/components/RepositoriesFilterModal';

const formSchema = z.object({
  technologies: z.array(z.number()),
  type: z.nativeEnum(RepositoryTypeChoice).nullable(),
});

type RepositoriesFilterFormValues = z.infer<typeof formSchema>;

interface UseRepositoryFilterFormReturn {
  form: UseFormReturn<RepositoriesFilterFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<RepositoriesFilterFormValues>>;
  resetForm: () => void;
}

interface UseRepositoriesFilterFormProps extends Pick<RepositoriesFilterModalProps, 'setFilter'> {
  onSubmitSuccessful: () => void;
}

const defaultValues: RepositoriesFilterFormValues = {
  technologies: [],
  type: null,
};

export function useRepositoryFilterForm({
  setFilter,
  onSubmitSuccessful,
}: UseRepositoriesFilterFormProps): UseRepositoryFilterFormReturn {
  const form = useForm<RepositoriesFilterFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = useCallback(
    async (values: RepositoriesFilterFormValues) => {
      setFilter({
        technologies: values.technologies.length ? values.technologies : undefined,
        type: values.type,
      });
      onSubmitSuccessful();
    },
    [onSubmitSuccessful, setFilter],
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
