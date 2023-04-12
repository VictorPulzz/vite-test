import { Button, ButtonSize, ButtonVariant } from '@ui/components/common/Button';
import React, { FC, useCallback } from 'react';
import { Controller } from 'react-hook-form';

import { getFileExtension } from '~/utils/getFileExtension';
import { useFetchAllDocumentCategoriesQuery } from '~/view/pages/ProjectDetails/__generated__/schema';
import { FileUpload } from '~/view/ui/components/common/FileUpload';
import { Icon } from '~/view/ui/components/common/Icon';
import { Modal, ModalProps } from '~/view/ui/components/common/Modal';
import { FieldErrorMessage } from '~/view/ui/components/form/FieldErrorMessage';
import { SelectField } from '~/view/ui/components/form/SelectField';
import { useSelectOptions } from '~/view/ui/hooks/useSelectOptions';

import { useUploadDocumentForm } from './hooks/useUploadDocumentForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  projectId: number;
  userId: number;
}

export const UploadDocumentModal: FC<Props> = ({ isOpen, close, projectId, userId }) => {
  const { data: documentCategories } = useFetchAllDocumentCategoriesQuery();

  const {
    form: { control, formState, watch, setValue },
    handleSubmit,
    resetForm,
  } = useUploadDocumentForm({
    onSubmitSuccessful: () => close(),
    projectId,
    userId,
  });

  const documentCategoriesOptions = useSelectOptions(documentCategories?.documentCategoryList, {
    value: 'value',
    label: 'label',
  });

  const fileName = watch('document')?.name;

  const removeFile = useCallback(() => setValue('document', null), [setValue]);

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-1/3"
      title="Upload document"
      onAfterClose={resetForm}
    >
      <SelectField
        name="categoryId"
        options={documentCategoriesOptions}
        control={control}
        label="Category"
      />
      <Controller
        name="document"
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            {fileName && (
              <div className="mt-5 flex items-center justify-between gap-5 p-3 border border-solid border-gray-5 rounded-md">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="bg-blue/10 p-3 text-blue text-c1 rounded-md w-10 h-10 flex items-center justify-center">
                    {getFileExtension(fileName)}
                  </div>
                  <span className="text-p3 text-black truncate">{fileName}</span>
                </div>
                <button type="button" onClick={removeFile} className="flex items-center">
                  <Icon name="close" size={18} />
                </button>
              </div>
            )}
            {!fileName && (
              <>
                <FileUpload onUpload={onChange}>
                  {({ onClick }) => (
                    <Button
                      onClick={onClick}
                      variant={error ? ButtonVariant.NEGATIVE : ButtonVariant.SECONDARY}
                      size={ButtonSize.MEDIUM}
                      label="Upload"
                      withIcon="upload"
                      className="mt-5"
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
        variant={ButtonVariant.PRIMARY}
        label="Save"
        className="mt-6"
        onClick={handleSubmit}
        isLoading={formState.isSubmitting}
      />
    </Modal>
  );
};
