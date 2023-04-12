import { Button, ButtonVariant } from '@ui/components/common/Button';
import { Modal, ModalProps } from '@ui/components/common/Modal';
import { SelectField } from '@ui/components/form/SelectField';
import React, { FC, useCallback, useMemo } from 'react';

import { RepositoryFilter, RepositoryTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { useFetchTechnologiesListQuery } from '~/view/pages/CreateRepository/__generated__/schema';

import { useRepositoryFilterForm } from './hooks/useRepositoryFilterForm';

export interface RepositoriesFilterModalProps extends Pick<ModalProps, 'isOpen' | 'close'> {
  setFilter: (filter: Nullable<RepositoryFilter>) => void;
}

export const RepositoriesFilterModal: FC<RepositoriesFilterModalProps> = ({
  isOpen,
  close,
  setFilter,
}) => {
  const { data: technologies } = useFetchTechnologiesListQuery({
    variables: {
      pagination: { limit: 0 },
    },
    fetchPolicy: 'cache-and-network',
  });

  const technologiesOptions = useMemo(
    () => technologies?.technologyList.results ?? [],
    [technologies],
  );

  const repositoryTypeOptions = enumToSelectOptions(RepositoryTypeChoice);

  const { form, handleSubmit, resetForm } = useRepositoryFilterForm({
    setFilter,
    onSubmitSuccessful: () => {
      close();
    },
  });

  const handleReset = useCallback(() => {
    resetForm();
    setFilter(null);
    close();
  }, [resetForm, setFilter, close]);

  return (
    <Modal isOpen={isOpen} close={close} title="Filter" contentClassName="w-[28rem]">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <SelectField
          name="technologies"
          options={technologiesOptions}
          control={form.control}
          label="Technologies"
          isMulti
        />
        <SelectField
          name="type"
          options={repositoryTypeOptions}
          control={form.control}
          label="Type"
        />
        <div className="flex mt-7 gap-4">
          <Button variant={ButtonVariant.SECONDARY} label="Reset filters" type="reset" />
          <Button variant={ButtonVariant.PRIMARY} label="Apply filter" type="submit" />
        </div>
      </form>
    </Modal>
  );
};