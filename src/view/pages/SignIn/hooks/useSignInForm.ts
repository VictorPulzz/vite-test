import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { LoginInput } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { useAppDispatch } from '~/store/hooks';
import { setAuth, setUser } from '~/store/modules/user';

// import { passwordValidation } from '~/utils/validations';
import { useSignInMutation } from '../__generated__/schema';

const formSchema = z.object({
  email: z.string().email().min(1),
  // TODO add passwordValidation
  // password: passwordValidation,
  password: z.string(),
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

        dispatch(
          setUser({
            email: user.email,
            fullName: user.fullName,
            photo: user.photo,
            role: user.role,
          }),
        );
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
