import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

import { formErrors } from '~/constants/form';
import { LoginInput } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { useAppDispatch } from '~/store/hooks';
import { setAuth, setUser } from '~/store/modules/user';

// import { passwordValidation } from '~/utils/validations';
import { useSignInMutation } from '../__generated__/schema';

interface UseSignInFormReturn {
  form: UseFormReturn<LoginInput>;
  handleSubmit: ReturnType<UseFormHandleSubmit<LoginInput>>;
}

interface UseSignInFormProps {
  onSubmitSuccessful: () => void;
}

const defaultValues: LoginInput = {
  email: '',
  password: '',
};

const validation = yup.object({
  email: yup.string().email(formErrors.INVALID_EMAIL).required(formErrors.REQUIRED),
  // TODO add pasword validation
  // password: passwordValidation(),
});

export function useSignInForm({ onSubmitSuccessful }: UseSignInFormProps): UseSignInFormReturn {
  const dispatch = useAppDispatch();

  const form = useForm<LoginInput>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validation),
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

        const {
          user: { id, email },
          accessToken,
          refreshToken,
        } = data.login;

        dispatch(
          setUser({
            id,
            email,
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
