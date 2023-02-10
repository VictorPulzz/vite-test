import { zodResolver } from '@hookform/resolvers/zod';
import { Row } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import {
  useFieldArray,
  useForm,
  useFormContext,
  UseFormHandleSubmit,
  UseFormReturn,
} from 'react-hook-form';
import { z } from 'zod';

import { formErrors } from '~/constants/form';
import { ClientType } from '~/services/gql/__generated__/globalTypes';
import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import { phoneNumberValidation } from '~/utils/validations';
import { transformClientTeamMemberPrefilledData } from '~/view/pages/CreateOrUpdateProject/utils';

const formSchema = z.object({
  fullName: z.string().refine(value => value !== '', formErrors.REQUIRED),
  email: z.string().email(formErrors.INVALID_EMAIL),
  phone: z.string().min(1).and(phoneNumberValidation),
  position: z.string().refine(value => value !== '', formErrors.REQUIRED),
  notes: z.string().refine(value => value !== '', formErrors.REQUIRED),
});

export type AddOrEditClientTeamMemberFormValues = z.infer<typeof formSchema>;

interface UseAddOrEditClientTeamMemberFormReturn {
  form: UseFormReturn<AddOrEditClientTeamMemberFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<AddOrEditClientTeamMemberFormValues>>;
  resetForm?(): void;
}

interface UseAddOrEditClientTeamMemberFormProps {
  onSubmitSuccessful?(): void;
  prefilledData?: Row<ClientType>;
}

const defaultValues: AddOrEditClientTeamMemberFormValues = {
  fullName: '',
  email: '',
  phone: '',
  position: '',
  notes: '',
};

export function useAddOrEditClientTeamMemberForm({
  onSubmitSuccessful,
  prefilledData,
}: UseAddOrEditClientTeamMemberFormProps): UseAddOrEditClientTeamMemberFormReturn {
  const form = useForm<AddOrEditClientTeamMemberFormValues>({
    defaultValues,
    values: prefilledData
      ? transformClientTeamMemberPrefilledData(prefilledData.original)
      : undefined,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const { control } = useFormContext();

  const { append, update } = useFieldArray({
    control,
    name: 'clientTeamMembers',
  });

  const handleSubmit = useCallback(
    async (values: AddOrEditClientTeamMemberFormValues) => {
      try {
        if (prefilledData) {
          update(prefilledData.index, { ...values });
        } else append({ ...values });

        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<AddOrEditClientTeamMemberFormValues>(e, {
          setFormError: form.setError,
        });
      }
    },
    [append, form.setError, onSubmitSuccessful, prefilledData, update],
  );

  return useMemo(
    () => ({
      form,
      handleSubmit: form.handleSubmit(handleSubmit),
      resetForm: () => form.reset(defaultValues),
    }),
    [form, handleSubmit],
  );
}
