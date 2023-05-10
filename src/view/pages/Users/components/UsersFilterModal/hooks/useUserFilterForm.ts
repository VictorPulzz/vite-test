import { isNil } from '@appello/common/lib/utils/isNil';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { UsersFilterModalProps } from '~/view/pages/Users/components/UsersFilterModal';

const formSchema = z.object({
  role: z.number().nullable(),
  department: z.number().nullable(),
  status: z.boolean().nullable(),
});

type UsersFilterFormValues = z.infer<typeof formSchema>;

interface UseUsersFilterFormReturn {
  form: UseFormReturn<UsersFilterFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<UsersFilterFormValues>>;
  resetForm: () => void;
}

interface UseUsersFilterFormProps extends Pick<UsersFilterModalProps, 'setFilter'> {
  onSubmitSuccessful: () => void;
}

const defaultValues: UsersFilterFormValues = {
  role: null,
  department: null,
  status: null,
};

export function useUserFilterForm({
  setFilter,
  onSubmitSuccessful,
}: UseUsersFilterFormProps): UseUsersFilterFormReturn {
  const form = useForm<UsersFilterFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = useCallback(
    (values: UsersFilterFormValues) => {
      setFilter({
        roleId: isNil(values.role) ? undefined : [+values.role],
        departmentId: isNil(values.department) ? undefined : [+values.department],
        isActive: values.status,
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
