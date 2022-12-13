import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

import { formErrors } from '~/constants/form';
import { LoginInput } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';

// import { useAppDispatch } from '~/store/hooks';
// import { setCredentials, setSetup2FA } from '~/store/modules/twoFactorAuth';
// import { passwordValidation } from '~/utils/validations';
// import { useSignInMutation } from '../__generated__/schema';

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
  // password: passwordValidation(),
});

export function useSignInForm({ onSubmitSuccessful }: UseSignInFormProps): UseSignInFormReturn {
  // const dispatch = useAppDispatch();

  const form = useForm<LoginInput>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(validation),
  });

  // const [signIn] = useSignInMutation();

  const handleSubmit = useCallback(
    async (values: LoginInput) => {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: useSignInForm.ts:47 ~ values', values);
      try {
        // const { data } = await signIn({
        //   variables: {
        //     input: values,
        //   },
        // });
        // if (!data) {
        //   throw new Error('No data');
        // }
        // dispatch(setCredentials(values));
        // if (data.login.setup2FA) {
        //   dispatch(setSetup2FA(data.login.setup2FA));
        // }
        onSubmitSuccessful();
      } catch (e) {
        processGqlErrorResponse<LoginInput>(e, {
          fields: ['email', 'password'],
          setFieldError: (name, message) => form.setError(name, { message }),
        });
      }
    },
    [form, onSubmitSuccessful],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
