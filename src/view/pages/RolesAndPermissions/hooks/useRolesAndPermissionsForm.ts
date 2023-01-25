import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

interface RolesAndPermissionsFormValues {
  [key: string]: {
    engineer: boolean;
    pm: boolean;
    lead: boolean;
    hr: boolean;
    sales: boolean;
    admin: boolean;
  };
}

interface UseRolesAndPermissionsFormProps {
  rolesAndPermissionsData: RolesAndPermissionsFormValues;
}

interface UseRolesAndPermissionsFormReturn {
  form: UseFormReturn<RolesAndPermissionsFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<RolesAndPermissionsFormValues>>;
  resetForm: () => void;
}

// TODO fix hook when backend will be ready
export const useRolesAndPermissionsForm = ({
  rolesAndPermissionsData,
}: UseRolesAndPermissionsFormProps): UseRolesAndPermissionsFormReturn => {
  const defaultValues = useMemo(() => {
    return Object.assign(
      {},
      ...Object.entries(rolesAndPermissionsData).map(([key, value]) => {
        return {
          [key]: {
            engineer: value.engineer,
            pm: value.pm,
            lead: value.lead,
            hr: value.hr,
            sales: value.sales,
            admin: value.admin,
          },
        };
      }),
    );
  }, [rolesAndPermissionsData]);

  const form = useForm<RolesAndPermissionsFormValues>({
    defaultValues,
    mode: 'onChange',
  });

  // const [updateRolesAndPermissions] = useUpdateRolesAndPermissionsMutation();

  const handleSubmit = useCallback(
    async (values: RolesAndPermissionsFormValues) => {
      try {
        // eslint-disable-next-line no-console
        console.log('🚀 ~ file: useSettingsGeneralForm.ts:80 ~ values', values);
        // eslint-disable-next-line no-console

        // await updateRolesAndPermissions({
        //   variables: {
        //     data: {
        //       id: values.id,
        //     },
        //   },
        //   refetchQueries: [MeDocument],
        // });
      } catch (e) {
        processGqlErrorResponse<RolesAndPermissionsFormValues>(e, {
          setFormError: form.setError,
        });
      }
    },
    [form.setError],
  );

  const resetForm = useCallback(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit), resetForm }),
    [form, handleSubmit, resetForm],
  );
};
