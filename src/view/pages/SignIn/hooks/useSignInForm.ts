import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { LoginInput } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { useAppDispatch } from '~/store/hooks';
import { setAuth, setUser } from '~/store/modules/user';
import { passwordValidation } from '~/utils/validations';

import { useSignInMutation } from '../__generated__/schema';

const formSchema = z.object({
  email: z.string().email().min(1),
  password: passwordValidation,
});

type SignInFormValues = z.infer<typeof formSchema>;

interface UseSignInFormReturn {
  form: UseFormReturn<SignInFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<SignInFormValues>>;
}

interface UseSignInFormProps {
  onSubmitSuccessful: () => void;
}

const defaultValues: SignInFormValues = {
  email: '',
  password: '',
};

export function useSignInForm({ onSubmitSuccessful }: UseSignInFormProps): UseSignInFormReturn {
  const dispatch = useAppDispatch();

  const form = useForm<LoginInput>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [signIn] = useSignInMutation();

  const handleSubmit = useCallback(
    async (values: LoginInput) => {
      try {
        const { data } = await signIn({
          variables: {
            data: values,
          },
        });
        if (!data) {
          throw new Error('No data');
        }
        const { user, accessToken, refreshToken } = data.login;

        if (user) {
          dispatch(
            setUser({
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              fullName: user.fullName,
              photoThumbnail: user.photoThumbnail,
              role: user.role,
            }),
          );
        } else {
          throw new Error('Server error');
        }
        dispatch(setAuth({ access: accessToken, refresh: refreshToken }));
        onSubmitSuccessful();
      } catch (e) {
        processGqlErrorResponse<LoginInput>(e, {
          fields: ['email', 'password'],
          setFormError: form.setError,
        });
      }
    },
    [dispatch, form, onSubmitSuccessful, signIn],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
