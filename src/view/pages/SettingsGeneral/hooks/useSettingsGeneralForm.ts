import { isString } from '@appello/common/lib/utils/string/isString';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { useEffect } from 'react';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { setUser } from '~/store/modules/user';
import { fileValidation, withPhoneValidation } from '~/utils/validations';
import {
  MeDocument,
  MeQuery,
  useProfileUpdateMutation,
} from '~/view/pages/SettingsGeneral/__generated__/schema';

const formSchema = z.object({
  photo: fileValidation,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string(),
  phone: withPhoneValidation(z.string().min(1)),
  address: z.string(),
});

type SettingsGeneralFormValues = z.infer<typeof formSchema>;

interface UseSettingsGeneralFormProps {
  settingsData?: MeQuery['me'];
}

interface UseSettingsGeneralFormReturn {
  form: UseFormReturn<SettingsGeneralFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<SettingsGeneralFormValues>>;
}

const defaultValues: SettingsGeneralFormValues = {
  firstName: '',
  lastName: '',
  phone: '',
  photo: null,
  email: '',
  address: '',
};

export const useSettingsGeneralForm = ({
  settingsData,
}: UseSettingsGeneralFormProps): UseSettingsGeneralFormReturn => {
  const dispatch = useDispatch();

  const form = useForm<SettingsGeneralFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [updateProfile] = useProfileUpdateMutation();

  useEffect(() => {
    if (settingsData) {
      form.reset({
        photo: settingsData.photo?.url,
        phone: settingsData?.phone || '',
        lastName: settingsData.lastName ?? '',
        firstName: settingsData.firstName ?? '',
        email: settingsData.email,
        address: settingsData.address ?? '',
      });
    }
  }, [form, settingsData]);

  const handleSubmit = useCallback(
    async (values: SettingsGeneralFormValues) => {
      try {
        const { data } = await updateProfile({
          variables: {
            data: {
              photo: !isString(values.photo) ? values.photo : undefined,
              phone: values.phone,
              firstName: values.firstName,
              lastName: values.lastName,
              address: values.address,
            },
          },
          refetchQueries: [MeDocument],
        });
        if (data) {
          dispatch(
            setUser({
              id: data.meUpdate.id,
              email: data.meUpdate.email,
              firstName: data.meUpdate.firstName,
              lastName: data.meUpdate.lastName,
              fullName: `${data.meUpdate.firstName} ${data.meUpdate.lastName}`,
              photo: data.meUpdate.photo,
              role: data.meUpdate.role,
            }),
          );
        } else {
          throw new Error('Server error');
        }
        toast.success('Profile updated');
      } catch (e) {
        processGqlErrorResponse<SettingsGeneralFormValues>(e, {
          fields: ['firstName', 'lastName', 'email', 'phone', 'photo', 'address'],
          setFormError: form.setError,
        });
      }
    },
    [dispatch, form.setError, updateProfile],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
};
