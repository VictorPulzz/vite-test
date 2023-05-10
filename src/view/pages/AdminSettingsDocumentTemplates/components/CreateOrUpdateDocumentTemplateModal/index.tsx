import { Button, ButtonVariant, Icon } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { nanoid } from '@reduxjs/toolkit';
import clsx from 'clsx';
import React, { FC } from 'react';
import { useFieldArray } from 'react-hook-form';

import { useDocumentTemplateForm } from './hooks/useDocumentTemplateForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  documentTemplateId?: number;
}

export const CreateOrUpdateDocumentTemplateModal: FC<Props> = ({
  isOpen,
  close,
  documentTemplateId,
}) => {
  const isEditMode = !!documentTemplateId;

  // TODO add query when backend will be ready
  //   const { data: documentTemplateInfo, loading } = useFetchDocumentTemplateInfoQuery({
  //     variables: {
  //       input: { id: Number(documentTemplateId) },
  //     },
  //     skip: !documentTemplateId,
  //     fetchPolicy: 'cache-and-network',
  //   });

  // TODO remove it later
  const loading = false;

  const {
    form: { control, formState },
    handleSubmit,
    resetForm,
  } = useDocumentTemplateForm({
    onSubmitSuccessful: () => close(),
    // prefilledData: documentTemplateInfo?.slackTemplate,
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
      title={`${isEditMode ? 'Edit' : 'Add'} template`}
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
          {/* TODO add description field when backend will be ready */}
          {/* <TextAreaField
            name="description"
            control={control}
            label="Description"
            placeholder="Template description"
            className={clsx(!!fields.length && 'mt-2 border-solid border-b border-gray-5 pb-5')}
          /> */}
          <div className="mt-4 ">
            {fields.map((_, index) => (
              <div key={nanoid()} className="mt-3 flex justify-between gap-3">
                <div className="form__inline-fields form__field-row flex-auto">
                  <TextField name={`fields.${index}.name`} control={control} label="Key name" />
                  <TextField
                    name={`fields.${index}.description`}
                    control={control}
                    label="Key description"
                  />
                </div>
                <button
                  className={clsx('w-[20px] mt-4', {
                    'mb-4': !!formState.errors.fields?.[index],
                  })}
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
            label={`${isEditMode ? 'Save' : 'Add'}`}
            className="mt-[30px]"
            isLoading={formState.isSubmitting}
          />
        </>
      )}
    </Modal>
  );
};
