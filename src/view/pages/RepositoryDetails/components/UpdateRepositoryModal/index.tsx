import { Button, ButtonVariant } from '@ui/components/common/Button';
import { TextField } from '@ui/components/form/TextField';
import React, { FC } from 'react';
import { ExtractRouteParams } from 'react-router';
import { useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { Modal, ModalProps } from '~/view/ui/components/common/Modal';

import { useUpdateRepositoryForm } from '../../hooks/useUpdateRepositoryForm';
import styles from './styles.module.scss';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

export const UpdateRepositoryModal: FC<Props> = ({ isOpen, close }) => {
  const params = useParams<ExtractRouteParams<typeof ROUTES.PROJECT_DETAILS, string>>();
  const repositoryId = params.id ? Number(params.id) : undefined;

  // const { data, loading} = useFetchRepositoryDetailsQuery({
  //   variables: {
  //     id: repositoryId,
  //   },
  //  });

  const {
    form: { control, formState },
    handleSubmit,
  } = useUpdateRepositoryForm({
    onSubmitSuccessful: () => close(),
    // TODO set prefilledData from useFetchRepositoryDetailsQuery when backend will be ready
    // prefilledData: data,
    id: repositoryId,
  });

  return (
    <Modal withCloseButton isOpen={isOpen} close={close} contentClassName="w-[400px]">
      <section className={styles['section']}>
        <h2 className={styles['section__heading']}>Repository info</h2>
        <div className="flex items-end gap-4 justify-center">
          <TextField name="name" control={control} label="Name" />
        </div>
      </section>
      <Button
        variant={ButtonVariant.PRIMARY}
        label="Save"
        className="w-1/2 mt-6"
        onClick={handleSubmit}
        isLoading={formState.isSubmitting}
      />
    </Modal>
  );
};
