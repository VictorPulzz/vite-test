import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { parsePhoneNumber } from 'libphonenumber-js';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { phoneNumberValidation } from '~/utils/validations';
import {
  MeQuery,
  // useProfileUpdateMutation,
} from '~/view/pages/SettingsGeneral/__generated__/schema';

const formSchema = z.object({
  photo: z.union([z.string(), z.instanceof(File)]).nullable(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string(),
  phone: z
    .string()
    .min(1)
    .and(phoneNumberValidation)
    .transform(value => {
      try {
        const phoneNumber = parsePhoneNumber(value, 'AU');
        return phoneNumber.number.toString();
      } catch (e) {
        return value;
      }
    }),
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

// TODO fix hook when backend will be ready
export const useSettingsGeneralForm = ({
  settingsData,
}: UseSettingsGeneralFormProps): UseSettingsGeneralFormReturn => {
  const form = useForm<SettingsGeneralFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  // const [updateProfile] = useProfileUpdateMutation();

  // useEffect(() => {
  //   if (settingsData) {
  //     form.reset({
  //       photo: settingsData.photo?.url,
  //       phone: settingsData?.phone || '',
  //       lastName: settingsData.lastName,
  //       firstName: settingsData.firstName,
  //       email: settingsData.email,
  //     });
  //   }
  // }, [form, settingsData]);

  const handleSubmit = useCallback(
    async (values: SettingsGeneralFormValues) => {
      try {
        // eslint-disable-next-line no-console
        console.log('🚀 ~ file: useSettingsGeneralForm.ts:80 ~ values', values);
        // eslint-disable-next-line no-console
        console.log('🚀 ~ file: useSettingsGeneralForm.ts:58 ~ settingsData', settingsData);
        // await updateProfile({
        //   variables: {
        //     data: {
        //       lastName: values.lastName,
        //       firstName: values.firstName,
        //       phone: values.phone,
        //       photo: !isString(values.photo) ? values.photo : undefined,
        //     },
        //   },
        //   refetchQueries: [MeDocument],
        // });
        toast.success('Profile updated');
      } catch (e) {
        processGqlErrorResponse<SettingsGeneralFormValues>(e, {
          fields: ['firstName', 'lastName', 'email', 'phone', 'photo', 'address'],
          setFormError: form.setError,
        });
      }
    },
    [form.setError, settingsData],
  );

  return useMemo(
    () => ({ form, handleSubmit: form.handleSubmit(handleSubmit) }),
    [form, handleSubmit],
  );
};
