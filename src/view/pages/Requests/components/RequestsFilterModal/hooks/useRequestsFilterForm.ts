import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { RequestsFilterModalProps } from '~/view/pages/Requests/components/RequestsFilterModal';

const formSchema = z.object({
  type: z.nativeEnum(RequestTypeChoice).nullable(),
  createdBy: z.number().nullable(),
  assignedTo: z.number().nullable(),
});

type RequestsFilterFormValues = z.infer<typeof formSchema>;

interface UseRequestsFilterFormReturn {
  form: UseFormReturn<RequestsFilterFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<RequestsFilterFormValues>>;
  resetForm: () => void;
}

interface UseRequestsFilterFormProps extends Pick<RequestsFilterModalProps, 'setFilter'> {
  onSubmitSuccessful: () => void;
}

const defaultValues: RequestsFilterFormValues = {
  type: null,
  createdBy: null,
  assignedTo: null,
};

export function useRequestsFilterForm({
  setFilter,
  onSubmitSuccessful,
}: UseRequestsFilterFormProps): UseRequestsFilterFormReturn {
  const form = useForm<RequestsFilterFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = useCallback(
    (values: RequestsFilterFormValues) => {
      setFilter({
        ...values,
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
