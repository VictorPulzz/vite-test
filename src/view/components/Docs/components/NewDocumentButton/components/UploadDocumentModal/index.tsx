import { useSelectOptions } from '@appello/common';
import {
  Button,
  ButtonSize,
  ButtonVariant,
  FieldErrorMessage,
  FileUpload,
  Icon,
  Modal,
  ModalProps,
  SelectField,
} from '@appello/web-ui';
import React, { FC, useCallback } from 'react';
import { Controller } from 'react-hook-form';

import { getFileExtension } from '~/utils/getFileExtension';
import { DocsType } from '~/view/components/Docs/types';
import { useFetchAllDocumentCategoriesQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { useUploadDocumentForm } from './hooks/useUploadDocumentForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  projectId: number;
  userId: number;
  type: DocsType;
}

const UPLOAD_DOCUMENT_ACCEPT =
  'application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*, .csv';

export const UploadDocumentModal: FC<Props> = ({ isOpen, close, projectId, userId, type }) => {
  const { data: documentCategories } = useFetchAllDocumentCategoriesQuery();

  const {
    form: { control, formState, watch, setValue },
    handleSubmit,
    resetForm,
  } = useUploadDocumentForm({
    onSubmitSuccessful: () => close(),
    projectId,
    userId,
    type,
  });

  const documentCategoriesOptions = useSelectOptions(documentCategories?.documentCategoryList, {
    value: 'value',
    label: 'label',
  });

  const fileName = watch('document')?.name;

  const removeFile = useCallback(() => setValue('document', null), [setValue]);

  return (
    <Modal
      close={close}
      contentClassName="w-1/3"
      isOpen={isOpen}
      title="Upload document"
      onAfterClose={resetForm}
    >
      <SelectField
        control={control}
        label="Category"
        name="categoryId"
        options={documentCategoriesOptions}
      />
      <Controller
        control={control}
        name="document"
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            {fileName && (
              <div className="mt-5 flex items-center justify-between gap-5 p-3 border border-solid border-gray-5 rounded-md">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="bg-blue/10 p-3 text-blue text-p5 rounded-md w-10 h-10 flex items-center justify-center">
                    {getFileExtension(fileName)}
                  </div>
                  <span className="text-p3 text-black truncate">{fileName}</span>
                </div>
                <button className="flex items-center" type="button" onClick={removeFile}>
                  <Icon name="close" size={18} />
                </button>
              </div>
            )}
            {!fileName && (
              <>
                <FileUpload accept={UPLOAD_DOCUMENT_ACCEPT} onUpload={onChange}>
                  {({ onClick }) => (
                    <Button
                      className="mt-5"
                      label="Upload"
                      size={ButtonSize.MEDIUM}
                      variant={error ? ButtonVariant.NEGATIVE : ButtonVariant.SECONDARY}
                      withIcon="upload"
                      onClick={onClick}
                    />
                  )}
                </FileUpload>
                <FieldErrorMessage error={error} />
              </>
            )}
          </>
        )}
      />
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
