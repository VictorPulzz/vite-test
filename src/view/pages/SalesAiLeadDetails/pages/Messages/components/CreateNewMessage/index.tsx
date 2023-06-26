import {
  Button,
  ButtonVariant,
  SelectField,
  TextAreaField,
  useSelectOptions,
} from '@appello/web-ui';
import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetLeadQuery, useGetPromptsQuery } from '~/services/rtk/lead';
import { SectionContainer } from '~/view/components/SectionContainer';

import { useCreateNewMessageForm } from './hooks/useCreateNewMessageForm';

export const CreateNewMessageSection: FC = () => {
  const params = useParams();
  const leadId = useMemo(() => (params.id ? String(params.id) : ''), [params.id]);
  const { form, handleSubmit } = useCreateNewMessageForm();

  const { data: lead } = useGetLeadQuery(leadId);

  const { data } = useGetPromptsQuery();

  const promptIdField = form.watch('promptId');

  const promptById = useMemo(
    () => data?.find(prompt => prompt.id === promptIdField),
    [data, promptIdField],
  );

  useEffect(() => {
    if (data) {
      form.setValue('promptId', data[0].id);
    }
  }, [data, form]);

  useEffect(() => {
    if (promptById) {
      form.setValue('promptText', promptById?.promptText.replaceAll('{about}', `${lead?.about}`));
    }
  }, [form, lead?.about, promptById]);

  const promptTemplateOptions = useSelectOptions(data, {
    value: 'id',
    label: 'name',
  });

  return (
    <SectionContainer title="Create new message">
      <SelectField
        name="promptId"
        options={promptTemplateOptions}
        control={form.control}
        label="Prompt name"
      />
      <TextAreaField name="promptText" control={form.control} label="Prompt text" />
      <Button
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
        label="Generate"
        className="mt-6 w-[190px]"
        isLoading={form.formState.isSubmitting}
      />
    </SectionContainer>
  );
};
