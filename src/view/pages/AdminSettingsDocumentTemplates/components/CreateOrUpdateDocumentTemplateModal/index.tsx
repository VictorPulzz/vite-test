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
      close={close}
      contentClassName="w-[500px]"
      isOpen={isOpen}
      title={`${documentTemplateId ? 'Edit' : 'Add'} template`}
      onAfterClose={resetForm}
    >
      {loading && (
        <div className="flex items-center h-[410px]">
          <Loader colorful full />
        </div>
      )}
      {!loading && (
        <>
          <TextField required control={control} label="Template name" name="name" />
          <TextField required control={control} label="Document template link" name="url" />
          <TextAreaField
            className={clsx(!!fields.length && 'mt-2 border-solid border-b border-gray-5 pb-5')}
            control={control}
            label="Template description"
            name="description"
          />
          <div className="mt-4 max-h-[230px] overflow-auto">
            {fields.map((field, index) => (
              <div className="mt-3 flex justify-between gap-3" key={`${index}-${field.name}`}>
                <div className="form__inline-fields form__field-row flex-auto">
                  <TextField
                    required
                    control={control}
                    label="Key name"
                    name={`fields.${index}.name`}
                  />
                  <TextField
                    required
                    control={control}
                    label="Key description"
                    name={`fields.${index}.description`}
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
            className="mt-[30px]"
            isLoading={formState.isSubmitting}
            label={`${documentTemplateId ? 'Save' : 'Add'}`}
            variant={ButtonVariant.PRIMARY}
            onClick={handleSubmit}
          />
        </>
      )}
    </Modal>
  );
};
