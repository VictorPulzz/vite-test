import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import { InlineFields } from '@ui/components/form/InlineFields';
import { TextField } from '@ui/components/form/TextField';
import React, { FC } from 'react';

import { DocumentTemplateType } from '~/services/gql/__generated__/globalTypes';

import { useGenerateDocumentForm } from '../../hooks/useGenerateDocumentForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  template: DocumentTemplateType;
}

export const GenerateDocumentModal: FC<Props> = ({ isOpen, close, template }) => {
  const {
    form: { control, formState },
    handleSubmit,
    resetForm,
  } = useGenerateDocumentForm({
    onSubmitSuccessful: () => close(),
    template,
  });

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-5/9"
      title={`Generate ${template?.name}`}
      onAfterClose={resetForm}
    >
      <InlineFields>
        {template?.fields?.map((field, index) => (
          <div key={index}>
            <TextField
              name={`templateFields.${index}.value`}
              control={control}
              label={field.description ?? ''}
            />
          </div>
        ))}
      </InlineFields>
      <Button
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
        label="Prepeare to generate"
        className="mt-6"
        isLoading={formState.isSubmitting}
      />
    </Modal>
  );
};
