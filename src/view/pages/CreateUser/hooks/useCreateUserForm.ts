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
  contractType: z.string(),
  birthDate: z
    .date()
    .nullable()
    .refine(value => value === null || isPast(value), formErrors.SHOULD_BE_IN_PAST)
    .refine(value => value !== null, formErrors.REQUIRED),
  isActive: z.boolean(),
});

type CreateUserFormValues = z.infer<typeof formSchema>;

interface UseCreateUserFormReturn {
  form: UseFormReturn<CreateUserFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<CreateUserFormValues>>;
}

interface UseCreateUserFormProps {
  onSubmitSuccessful?: () => void;
}

const defaultValues: CreateUserFormValues = {
  firstName: '',
  lastName: '',
  photo: null,
  address: '',
  department: '',
  email: '',
  contractType: '',
  birthDate: null,
  isActive: false,
};

export function useCreateUserForm({
  onSubmitSuccessful,
}: UseCreateUserFormProps): UseCreateUserFormReturn {
  const form = useForm<CreateUserFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  // const [createUser] = useCreateUserMutation();

  const handleSubmit = useCallback(
    async (values: CreateUserFormValues) => {
      // TODO remove concole.log
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: useUserForm.ts:88 ~ values', values);
      try {
        // await createUser({
        //   variables: {
        //     input: {
        //       id,
        //       name: values.firstName,
        //     },
        //   },
        // });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<CreateUserFormValues>(e, {
          fields: [
            'firstName',
            'lastName',
            'photo',
            'address',
            'department',
            'email',
            'contractType',
            'birthDate',
          ],
          setFormError: form.setError,
        });
      }
    },
    [form.setError, onSubmitSuccessful],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
