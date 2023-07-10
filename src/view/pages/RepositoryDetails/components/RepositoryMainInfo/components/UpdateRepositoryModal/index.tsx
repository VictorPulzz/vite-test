import { Button, ButtonVariant, Loader, SelectField, useSelectOptions } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import React, { FC } from 'react';

import { useFetchTechnologiesListQuery } from '~/view/pages/CreateRepository/__generated__/schema';
import { FetchRepositoryDetailsQuery } from '~/view/pages/RepositoryDetails/__generated__/schema';

import { useUpdateRepositoryForm } from './hooks/useUpdateRepositoryForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  repository: FetchRepositoryDetailsQuery['repository'];
}

export const UpdateRepositoryModal: FC<Props> = ({ isOpen, close, repository }) => {
  const { form, handleSubmit, resetForm } = useUpdateRepositoryForm({
    onSubmitSuccessful: () => close(),
    repository,
  });

  const { data: allTechnologies, loading: isLoadingAllTechnologies } =
    useFetchTechnologiesListQuery({
      fetchPolicy: 'cache-and-network',
    });

  const technologiesOptions = useSelectOptions(allTechnologies?.technologyList.results, {
    value: 'value',
    label: 'label',
  });

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      contentClassName="w-[450px]"
      title="Repository info"
      onAfterClose={resetForm}
    >
      {isLoadingAllTechnologies ? (
        <div className="flex items-center h-[200px]">
          <Loader full colorful />
        </div>
      ) : (
        <>
          <TextField name="name" control={form.control} label="Name" required />
          <SelectField
            name="technologies"
            options={technologiesOptions}
            control={form.control}
            label="Technologies"
            isMulti
            required
          />
          <Button
            variant={ButtonVariant.PRIMARY}
            label="Save"
            className="mt-6"
            onClick={handleSubmit}
            isLoading={form.formState.isSubmitting}
          />
        </>
      )}
    </Modal>
  );
};
