import { isString } from '@appello/common/lib/utils/string/isString';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO, isPast } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { ContractChoice } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { transformUserPrefilledData } from '~/view/pages/CreateOrUpdateUser/utils';

import {
  FetchUserDetailsDocument,
  FetchUserDetailsQuery,
} from '../../UserDetails/__generated__/schema';
import { useCreateOrUpdateUserMutation } from '../__generated__/schema';

const formSchema = z.object({
  photo: z
    .union([z.string(), z.instanceof(File)])
    .nullable()
    .refine(value => {
      if (value instanceof File) {
        return value.size < 2 * 1024 * 1024;
      }
      return true;
    }, formErrors.MAX_IMAGE_SIZE),
  firstName: z.string().refine(value => value !== '', formErrors.REQUIRED),
  lastName: z.string().refine(value => value !== '', formErrors.REQUIRED),
  email: z
    .string()
    .email(formErrors.INVALID_EMAIL)
    .refine(value => value !== null, formErrors.REQUIRED),
  department: z
    .number()
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
  role: z
    .number()
    .nullable()
    .refine(value => value !== null, formErrors.REQUIRED),
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

export type UserFormValues = z.infer<typeof formSchema>;

interface UseUserFormReturn {
  form: UseFormReturn<UserFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<UserFormValues>>;
}

interface UseUserFormProps {
  prefilledData?: FetchUserDetailsQuery['userDetails'];
  id?: number;
  onSubmitSuccessful?: () => void;
}

const defaultValues: UserFormValues = {
  photo: null,
  firstName: '',
  lastName: '',
  email: '',
  department: null,
  role: null,
  address: '',
  contractType: null,
  birthDate: null,
  isActive: true,
};

export function useUserForm({
  prefilledData,
  id,
  onSubmitSuccessful,
}: UseUserFormProps): UseUserFormReturn {
  const form = useForm<UserFormValues>({
    defaultValues,
    values: prefilledData ? transformUserPrefilledData(prefilledData) : undefined,
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
              id,
              photo: !isString(values.photo) ? values.photo : undefined,
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              departmentId: values.department,
              roleId: values.role,
              address: values.address,
              contractType: values.contractType,
              birthDate: values.birthDate
                ? formatISO(values.birthDate, { representation: 'date' })
                : '',
              isActive: values.isActive,
            },
          },
          refetchQueries: [FetchUserDetailsDocument],
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
    [createOrUpdateUser, form.setError, id, onSubmitSuccessful],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
