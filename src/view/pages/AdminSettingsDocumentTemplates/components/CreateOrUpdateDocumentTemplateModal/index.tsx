import { Button, ButtonVariant, Icon, TextAreaField } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC } from 'react';
import { useFieldArray } from 'react-hook-form';

import { useFetchDocumentTemplateInfoQuery } from '../../__generated__/schema';
import { useDocumentTemplateForm } from './hooks/useDocumentTemplateForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  documentTemplateId?: number;
}

export const CreateOrUpdateDocumentTemplateModal: FC<Props> = ({
  isOpen,
  close,
  documentTemplateId,
}) => {
  const { data: documentTemplateInfo, loading } = useFetchDocumentTemplateInfoQuery({
    variables: {
      input: { id: Number(documentTemplateId) },
    },
    skip: !documentTemplateId,
    fetchPolicy: 'network-only',
  });

  const {
    form: { control, formState },
    handleSubmit,
    resetForm,
  } = useDocumentTemplateForm({
    onSubmitSuccessful: () => close(),
    prefilledData: documentTemplateInfo?.documentTemplate,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const emptyTepmlateFields = { name: '', description: '' };

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      contentClassName="w-[500px]"
      title={`${documentTemplateId ? 'Edit' : 'Add'} template`}
      onAfterClose={resetForm}
    >
      {loading && (
        <div className="flex items-center h-[410px]">
          <Loader full colorful />
        </div>
      )}
      {!loading && (
        <>
          <TextField name="name" control={control} label="Template name" required />
          <TextField name="url" control={control} label="Document template link" required />
          <TextAreaField
            name="description"
            control={control}
            label="Template description"
            className={clsx(!!fields.length && 'mt-2 border-solid border-b border-gray-5 pb-5')}
          />
          <div className="mt-4 max-h-[230px] overflow-auto">
            {fields.map((field, index) => (
              <div key={`${index}-${field.name}`} className="mt-3 flex justify-between gap-3">
                <div className="form__inline-fields form__field-row flex-auto">
                  <TextField
                    name={`fields.${index}.name`}
                    control={control}
                    label="Key name"
                    required
                  />
                  <TextField
                    name={`fields.${index}.description`}
                    control={control}
                    label="Key description"
                    required
                  />
                </div>
                <button
                  className={clsx('w-[20px] mt-4', !!formState.errors.fields?.[index] && 'mb-4')}
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Icon name="close" size={15} />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full" type="button" onClick={() => append(emptyTepmlateFields)}>
            <h2 className="mt-3 text-p2 text-blue hover:underline">+ Add key</h2>
          </button>
          <Button
            variant={ButtonVariant.PRIMARY}
            onClick={handleSubmit}
            label={`${documentTemplateId ? 'Save' : 'Add'}`}
            className="mt-[30px]"
            isLoading={formState.isSubmitting}
          />
        </>
      )}
    </Modal>
  );
};
