import { useSelectOptions } from '@appello/common';
import {
  Button,
  ButtonVariant,
  Field,
  InlineFields,
  Modal,
  ModalProps,
  SelectField,
  TextInput,
} from '@appello/web-ui';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

import { DocumentTemplateType } from '~/services/gql/__generated__/globalTypes';
import { DocsType } from '~/view/components/Docs/types';
import { useFetchDocumentTemplateListQuery } from '~/view/pages/CreateOrUpdateProject/__generated__/schema';
import { useFetchAllDocumentCategoriesQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { useGenerateDocumentForm } from './hooks/useGenerateDocumentForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  projectId: number;
  userId: number;
  type: DocsType;
}

export const GenerateDocumentModal: FC<Props> = ({ isOpen, close, projectId, userId, type }) => {
  const { data: documentTemplates } = useFetchDocumentTemplateListQuery({
    fetchPolicy: 'cache-and-network',
  });
  const { data: documentCategories } = useFetchAllDocumentCategoriesQuery();

  const [template, setTemplate] = useState<DocumentTemplateType>();

  const {
    form: { control, formState, watch },
    handleSubmit,
    resetForm,
  } = useGenerateDocumentForm({
    onSubmitSuccessful: () => close(),
    template: template as DocumentTemplateType,
    projectId,
    userId,
    type,
  });

  const documentTemplatesOptions = useSelectOptions(
    documentTemplates?.documentTemplateList.results,
    {
      value: 'id',
      label: 'name',
    },
  );

  const documentCategoriesOptions = useSelectOptions(documentCategories?.documentCategoryList, {
    value: 'value',
    label: 'label',
  });

  const selectedTemplateId = watch('templateId');

  const selectedTemplate = useMemo(
    () =>
      documentTemplates?.documentTemplateList.results.find(({ id }) => id === selectedTemplateId),
    [documentTemplates?.documentTemplateList, selectedTemplateId],
  );

  useEffect(() => {
    setTemplate(selectedTemplate as DocumentTemplateType);
  }, [selectedTemplate]);

  return (
    <Modal
      close={close}
      contentClassName="w-1/3"
      isOpen={isOpen}
      title="Generate document"
      onAfterClose={resetForm}
    >
      <InlineFields>
        <SelectField
          control={control}
          label="Template"
          name="templateId"
          options={documentTemplatesOptions}
        />
        <SelectField
          control={control}
          label="Category"
          name="categoryId"
          options={documentCategoriesOptions}
        />
      </InlineFields>
      {!!selectedTemplate?.fields?.length && (
        <>
          <div className="mt-2 border-solid border-b border-gray-5 pb-5" />
          <h2 className="mt-4 text-p2 font-bold">Template fields</h2>
          <InlineFields>
            {selectedTemplate.fields.map((field, fieldIndex) => (
              <Controller
                control={control}
                key={fieldIndex}
                name={`templateFields.${fieldIndex}.value`}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Field required error={error} label={field.description ?? ''}>
                    <TextInput
                      required
                      error={!!error}
                      label={field.description ?? ''}
                      placeholder={field.description ?? ''}
                      value={value || ''}
                      onChange={onChange}
                    />
                  </Field>
                )}
              />
            ))}
          </InlineFields>
        </>
      )}
      <Button
        className="mt-6"
        isLoading={formState.isSubmitting}
        label="Save"
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
      />
    </Modal>
  );
};
