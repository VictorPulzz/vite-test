import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { processGqlErrorResponse } from '~/services/gql/utils/processGqlErrorResponse';
import {
  FetchSlackTemplatesListDocument,
  useCreateSlackTemplateMutation,
  useUpdateSlackTemplateMutation,
} from '~/view/pages/AdminSettingsIntegrations/__generated__/schema';
import { transformChannelTemplatePrefilledData } from '~/view/pages/AdminSettingsIntegrations/components/SlackTabElement/components/CreateOrUpdateChannelTemplateModal/utils';

import { SlackChannelTemplateResultType } from '../../../types';

const formSchema = z.object({
  label: z.string().min(1),
  prefix: z.string().min(1),
  initialUsers: z.array(z.number()),
  isPrivate: z.boolean(),
});

export type ChannelTemplateFormValues = z.infer<typeof formSchema>;

interface UseChannelTemplateFormReturn {
  form: UseFormReturn<ChannelTemplateFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<ChannelTemplateFormValues>>;
  resetForm?(): void;
  isLoading: boolean;
}

interface UseChannelTemplateFormProps {
  onSubmitSuccessful?(): void;
  prefilledData?: SlackChannelTemplateResultType;
}

const defaultValues: ChannelTemplateFormValues = {
  label: '',
  prefix: '',
  initialUsers: [],
  isPrivate: false,
};

export function useChannelTemplateForm({
  onSubmitSuccessful,
  prefilledData,
}: UseChannelTemplateFormProps): UseChannelTemplateFormReturn {
  const form = useForm<ChannelTemplateFormValues>({
    defaultValues,
    values: prefilledData ? transformChannelTemplatePrefilledData(prefilledData) : undefined,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const isEditMode = !!prefilledData;

  const [createSlackTemplate, { loading: loadingCreateSlackTemplate }] =
    useCreateSlackTemplateMutation();

  const [updateSlackTemplate, { loading: loadingUpdatelackTemplate }] =
    useUpdateSlackTemplateMutation();

  const handleSubmit = useCallback(
    async (values: ChannelTemplateFormValues) => {
      try {
        if (isEditMode) {
          await updateSlackTemplate({
            variables: {
              input: {
                id: prefilledData.id,
                ...values,
              },
            },
            refetchQueries: [FetchSlackTemplatesListDocument],
          });
        } else
          await createSlackTemplate({
            variables: {
              input: {
                ...values,
              },
            },
            refetchQueries: [FetchSlackTemplatesListDocument],
          });
        onSubmitSuccessful?.();
      } catch (e) {
        processGqlErrorResponse<ChannelTemplateFormValues>(e, {
          fields: ['label', 'prefix', 'initialUsers'],
          setFormError: form.setError,
        });
      }
    },
    [
      createSlackTemplate,
      form.setError,
      isEditMode,
      onSubmitSuccessful,
      prefilledData?.id,
      updateSlackTemplate,
    ],
  );

  return useMemo(
    () => ({
      form,
      handleSubmit: form.handleSubmit(handleSubmit),
      resetForm: () => form.reset(defaultValues),
      isLoading: loadingCreateSlackTemplate || loadingUpdatelackTemplate,
    }),
    [form, handleSubmit, loadingCreateSlackTemplate, loadingUpdatelackTemplate],
  );
}
