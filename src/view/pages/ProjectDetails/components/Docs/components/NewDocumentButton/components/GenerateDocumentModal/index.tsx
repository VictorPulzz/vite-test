import { Button, ButtonVariant } from '@ui/components/common/Button';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

import { DocumentTemplateType } from '~/services/gql/__generated__/globalTypes';
import { useFetchDocumentTemplateListQuery } from '~/view/pages/CreateOrUpdateProject/__generated__/schema';
import { useFetchAllDocumentCategoriesQuery } from '~/view/pages/ProjectDetails/__generated__/schema';
import { Modal, ModalProps } from '~/view/ui/components/common/Modal';
import { Field } from '~/view/ui/components/form/Field';
import { InlineFields } from '~/view/ui/components/form/InlineFields';
import { SelectField } from '~/view/ui/components/form/SelectField';
import { TextInput } from '~/view/ui/components/form/TextInput';
import { useSelectOptions } from '~/view/ui/hooks/useSelectOptions';

import { useGenerateDocumentForm } from './hooks/useGenerateDocumentForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  projectId: number;
  userId: number;
}

export const GenerateDocumentModal: FC<Props> = ({ isOpen, close, projectId, userId }) => {
  const { data: documentTemplates } = useFetchDocumentTemplateListQuery();
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
  });

  const documentTemplatesOptions = useSelectOptions(documentTemplates?.documentTemplateList, {
    value: 'id',
    label: 'name',
  });

  const documentCategoriesOptions = useSelectOptions(documentCategories?.documentCategoryList, {
    value: 'value',
    label: 'label',
  });

  const selectedTemplateId = watch('templateId');

  const selectedTemplate = useMemo(
    () => documentTemplates?.documentTemplateList.find(({ id }) => id === selectedTemplateId),
    [documentTemplates?.documentTemplateList, selectedTemplateId],
  );

  useEffect(() => {
    setTemplate(selectedTemplate as DocumentTemplateType);
  }, [selectedTemplate]);

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-1/3"
      title="Generate document"
      onAfterClose={resetForm}
    >
      <InlineFields>
        <SelectField
          name="templateId"
          options={documentTemplatesOptions}
          control={control}
          label="Template"
        />
        <SelectField
          name="categoryId"
          options={documentCategoriesOptions}
          control={control}
          label="Category"
        />
      </InlineFields>
      {!!selectedTemplate?.fields?.length && (
        <>
          <div className="mt-2 border-solid border-b border-gray-5 pb-5" />
          <h2 className="mt-4 text-p2 font-bold">Template fields</h2>
          <InlineFields>
            {selectedTemplate.fields.map((field, fieldIndex) => (
              <div key={fieldIndex}>
                <Controller
                  name={`templateFields.${fieldIndex}.value`}
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Field label={field.description ?? ''} error={error} required>
                      <TextInput
                        value={value || ''}
                        label={field.description ?? ''}
                        onChange={onChange}
                        placeholder={field.description ?? ''}
                        error={!!error}
                        required
                      />
                    </Field>
                  )}
                />
              </div>
            ))}
          </InlineFields>
        </>
      )}
      <Button
        variant={ButtonVariant.PRIMARY}
        label="Save"
        className="mt-6"
        onClick={handleSubmit}
        isLoading={formState.isSubmitting}
      />
    </Modal>
  );
};
