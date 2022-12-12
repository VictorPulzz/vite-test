import { getErrorData } from '@appello/common/lib/services/rtkQuery';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

import { formErrors } from '~/constants/form';
import { useSignInMutation } from '~/services/rtkQuery/user';
import { useAppDispatch } from '~/store/hooks';
import { setAuth, setUser } from '~/store/modules/user';
import { processApiError } from '~/utils/processApiError';

interface SignInFormValues {
  email: string;
  password: string;
}

interface UseSignInFormReturn {
  form: UseFormReturn<SignInFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<SignInFormValues>>;
}

const defaultValues: SignInFormValues = {
  email: '',
  password: '',
};

const validation = yupResolver(
  yup.object({
    email: yup.string().email(formErrors.INVALID_EMAIL).required(formErrors.REQUIRED),
    password: yup.string().required(formErrors.REQUIRED),
  }),
);

export function useSignInForm(): UseSignInFormReturn {
  const dispatch = useAppDispatch();
  const [signIn] = useSignInMutation();

  const form = useForm<SignInFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: validation,
  });

  const handleSubmit = useCallback(
    async (values: SignInFormValues) => {
      // todo: remove this block when backend will be ready
      // start
      dispatch(setUser({ id: 0, email: 'some@email.com' }));
      dispatch(setAuth({ access: 'token here', refresh: 'token here' }));
      return;
      // end

      try {
        const data = await signIn({
          email: values.email,
          password: values.password,
        }).unwrap();

        dispatch(setUser(data.user));
        dispatch(setAuth({ access: data.access, refresh: data.refresh }));
      } catch (e) {
        processApiError<SignInFormValues>({
          errors: getErrorData(e),
          fields: ['email', 'password'],
          setFieldError: (name, message) => form.setError(name, { message }),
        });
      }
    },
    [dispatch, form, signIn],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
