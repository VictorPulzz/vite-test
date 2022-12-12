import { getErrorData } from '@appello/common/lib/services/rtkQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { useAppDispatch } from '~/store/hooks';
import { setAuth, setUser } from '~/store/modules/user';
import { passwordValidation } from '~/utils/validations';

const formSchema = z.object({
  email: z.string().email().min(1),
  password: passwordValidation(),
});

type SignInFormValues = z.infer<typeof formSchema>;

interface UseSignInFormReturn {
  form: UseFormReturn<SignInFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<SignInFormValues>>;
}

const defaultValues: SignInFormValues = {
  email: '',
  password: '',
};

export function useSignInForm(): UseSignInFormReturn {
  const dispatch = useAppDispatch();

  const form = useForm<SignInFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
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
        // eslint-disable-next-line
        console.log(values);

        // dispatch(setUser(data.user));
        // dispatch(setAuth({ access: data.access, refresh: data.refresh }));
      } catch (e) {
        processGqlErrorResponse<SignInFormValues>({
          errors: getErrorData(e),
          fields: ['email', 'password'],
          setFormError: form.setError,
        });
      }
    },
    [dispatch, form],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
}
