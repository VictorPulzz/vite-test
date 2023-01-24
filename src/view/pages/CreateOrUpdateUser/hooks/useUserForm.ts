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

type UserFormValues = z.infer<typeof formSchema>;

interface UseUserFormReturn {
  form: UseFormReturn<UserFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<UserFormValues>>;
}

interface UseUserFormProps {
  onSubmitSuccessful?: () => void;
  // prefilledData?: FetchEmployeeQuery['employee'];
  id?: number;
}

const defaultValues: UserFormValues = {
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

export function useUserForm({ onSubmitSuccessful, id }: UseUserFormProps): UseUserFormReturn {
  const form = useForm<UserFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  // const [createOrUpdateUser] = useCreateOrUpdateUserMutation();

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
    async (values: UserFormValues) => {
      // TODO remove concole.log
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: useUserForm.ts:88 ~ values', values);
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: useUserForm.ts:88 ~ values', id);
      try {
        // await createOrUpdateUser({
        //   variables: {
        //     input: {
        //       id,
        //       name: values.firstName,
        //     },
        //   },
        // });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<UserFormValues>(e, {
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
