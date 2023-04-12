import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import {
  FetchPermissionsListDocument,
  useUpdatePermissionsListMutation,
} from '../__generated__/schema';

const formSchema = z.object({
  permissions: z
    .object({
      id: z.number(),
      roles: z.array(z.number()),
    })
    .array(),
});

type RolesAndPermissionsFormValues = z.infer<typeof formSchema>;

interface UseRolesAndPermissionsFormReturn {
  form: UseFormReturn<RolesAndPermissionsFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<RolesAndPermissionsFormValues>>;
  resetForm?: () => void;
}

interface UseRolesAndPermissionsFormProps {
  onSubmitSuccessful?: () => void;
  roles: RolesAndPermissionsFormValues;
}

const defaultValues: RolesAndPermissionsFormValues = {
  permissions: [],
};

export function useRolesAndPermissionsForm({
  roles,
}: UseRolesAndPermissionsFormProps): UseRolesAndPermissionsFormReturn {
  const form = useForm<RolesAndPermissionsFormValues>({
    defaultValues: roles,
    values: roles || undefined,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [updatePermissions] = useUpdatePermissionsListMutation();

  const handleSubmit = useCallback(
    async (values: RolesAndPermissionsFormValues) => {
      try {
        await updatePermissions({
          variables: {
            input: values.permissions,
          },
          refetchQueries: [FetchPermissionsListDocument],
        });
      } catch (e) {
        processGqlErrorResponse<RolesAndPermissionsFormValues>(e, {
          fields: ['permissions'],
          setFormError: form.setError,
        });
      }
    },
    [form.setError, updatePermissions],
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
