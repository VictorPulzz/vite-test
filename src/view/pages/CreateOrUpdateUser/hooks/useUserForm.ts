import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO, isPast } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { ContractChoice } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

import { useCreateOrUpdateUserMutation } from '../__generated__/schema';

const formSchema = z.object({
  photo: z
    .union([z.string(), z.instanceof(File)])
    .nullable()
    .refine(value => {
      if (value instanceof File) {
        return value.size < 500 * 1024;
      }
      return true;
    }, formErrors.MAX_IMAGE_SIZE),
  firstName: z.string().refine(value => value !== '', formErrors.REQUIRED),
  lastName: z.string().refine(value => value !== '', formErrors.REQUIRED),
  email: z
    .string()
    .email(formErrors.INVALID_EMAIL)
    .refine(value => value !== null, formErrors.REQUIRED),
  department: z.string().refine(value => value !== '', formErrors.REQUIRED),
  role: z.string().refine(value => value !== '', formErrors.REQUIRED),
  address: z.string(),
  contractType: z
    .nativeEnum(ContractChoice)
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
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
}

const defaultValues: UserFormValues = {
  photo: null,
  firstName: '',
  lastName: '',
  email: '',
  department: '',
  role: '',
  address: '',
  contractType: null,
  birthDate: null,
  isActive: false,
};

export function useUserForm({ onSubmitSuccessful }: UseUserFormProps): UseUserFormReturn {
  const form = useForm<UserFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const [createOrUpdateUser] = useCreateOrUpdateUserMutation();

  const handleSubmit = useCallback(
    async (values: UserFormValues) => {
      try {
        await createOrUpdateUser({
          variables: {
            input: {
              // id,
              ...values,
              photo: values.photo as File,
              departmentId: +values.department,
              roleId: +values.role,
              birthDate: values.birthDate
                ? formatISO(values.birthDate, { representation: 'date' })
                : '',
            },
          },
        });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<UserFormValues>(e, {
          fields: [
            'photo',
            'firstName',
            'lastName',
            'email',
            'department',
            'role',
            'address',
            'contractType',
            'birthDate',
          ],
          setFormError: form.setError,
        });
      }
    },
    [createOrUpdateUser, form.setError, onSubmitSuccessful],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
