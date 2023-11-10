import { Nullable, useSelectOptions } from '@appello/common';
import { Button, ButtonVariant, Modal, ModalProps, SelectField } from '@appello/web-ui';
import React, { FC, useCallback } from 'react';

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
    fetchPolicy: 'cache-and-network',
  });

  const technologiesOptions = useSelectOptions(technologies?.technologyList.results, {
    value: 'value',
    label: 'label',
  });

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
    <Modal close={close} contentClassName="w-[28rem]" isOpen={isOpen} title="Filter">
      <form onReset={handleReset} onSubmit={handleSubmit}>
        <SelectField
          isMulti
          control={form.control}
          label="Technologies"
          name="technologies"
          options={technologiesOptions}
        />
        <SelectField
          control={form.control}
          label="Type"
          name="type"
          options={repositoryTypeOptions}
        />
        <div className="flex mt-7 gap-4">
          <Button label="Reset filters" type="reset" variant={ButtonVariant.SECONDARY} />
          <Button label="Apply filter" type="submit" variant={ButtonVariant.PRIMARY} />
        </div>
      </form>
    </Modal>
  );
};
