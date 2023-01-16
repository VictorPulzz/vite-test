import { zodResolver } from '@hookform/resolvers/zod';
import { isPast } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  photo: z
    .union([z.string(), z.instanceof(File)])
    .nullable()
    .refine(value => {
      if (value instanceof File) {
        return value.size < 500 * 1024;
      }
      return true;
    }, formErrors.MAX_IMAGE_SIZE),
  address: z.string(),
  department: z.string(),
  email: z.string().email(formErrors.INVALID_EMAIL),
  role: z.string(),
  contractType: z.string(),
  birthDate: z
    .date()
    .nullable()
    .refine(value => value === null || isPast(value), formErrors.SHOULD_BE_IN_PAST)
    .refine(value => value !== null, formErrors.REQUIRED),
  isActive: z.boolean(),
});

type EmployeeFormValues = z.infer<typeof formSchema>;

interface UseEmployeeFormReturn {
  form: UseFormReturn<EmployeeFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<EmployeeFormValues>>;
}

interface UseEmployeeFormProps {
  onSubmitSuccessful?: () => void;
  // prefilledData?: FetchEmployeeQuery['employee'];
  id?: number;
}

const defaultValues: EmployeeFormValues = {
  firstName: '',
  lastName: '',
  photo: null,
  address: '',
  department: '',
  email: '',
  role: '',
  contractType: '',
  birthDate: null,
  isActive: false,
};

export function useEmployeeForm({
  onSubmitSuccessful,
  id,
}: UseEmployeeFormProps): UseEmployeeFormReturn {
  const form = useForm<EmployeeFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  // const [createOrUpdateEmployee] = useCreateOrUpdateEmployeeMutation();

  // useEffect(() => {
  //   if (prefilledData) {
  //     form.reset({
  //       firstName: prefilledData.firstName ?? '',
  //       lastName: prefilledData.lastName ?? '',
  //       photo: prefilledData.photo ?? '',
  //       address: prefilledData.address ?? '',
  //       department: prefilledData.department ?? '',
  //       email: prefilledData.email ?? '',
  //       role: prefilledData.role ?? '',
  //       contractType: prefilledData.contractType ?? '',
  //       birthDate: prefilledData.birthDate ?? '',
  //       isActive: prefilledData.isActive ?? '',
  //     });
  //   }
  // }, [form]);

  const handleSubmit = useCallback(
    async (values: EmployeeFormValues) => {
      // TODO remove concole.log
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: useEmployeeForm.ts:83 ~ values', values);
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: useEmployeeForm.ts:57 ~ id', id);
      try {
        // await createOrUpdateEmployee({
        //   variables: {
        //     input: {
        //       id,
        //       name: values.firstName,
        //     },
        //   },
        // });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<EmployeeFormValues>(e, {
          fields: [
            'firstName',
            'lastName',
            'photo',
            'address',
            'department',
            'email',
            'role',
            'contractType',
            'birthDate',
          ],
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
