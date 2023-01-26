import { Button, ButtonVariant } from '@ui/components/common/Button';
import { InlineFields } from '@ui/components/form/InlineFields';
import { SelectField } from '@ui/components/form/SelectField';
import { TextField } from '@ui/components/form/TextField';
import React, { FC } from 'react';
import { ExtractRouteParams } from 'react-router';
import { useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { Modal, ModalProps } from '~/view/ui/components/common/Modal';
import { Checkbox } from '~/view/ui/components/form/Checkbox';
import { DateField } from '~/view/ui/components/form/DateField';
import { PhotoField } from '~/view/ui/components/form/PhotoField';

import { useUpdateUserForm } from '../../hooks/useUpdateUserForm';
import styles from './styles.module.scss';

export enum Departments {
  FRONT_END = 'FRONTEND',
  BACK_END = 'BACKEND',
}

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

export const UpdateUserModal: FC<Props> = ({ isOpen, close }) => {
  const params = useParams<ExtractRouteParams<typeof ROUTES.USER_DETAILS, string>>();
  const userId = params.id ? Number(params.id) : undefined;

  // const { data, loading } = useFetchUserDetailsQuery({
  //   variables: {
  //     data: { id: userId },
  //   },
  // });

  const { form, handleSubmit } = useUpdateUserForm({
    onSubmitSuccessful: () => close(),
    id: userId,
    // prefilledData:data
  });

  const departmentsOptions = enumToSelectOptions(Departments);

  return (
    <Modal withCloseButton isOpen={isOpen} close={close} contentClassName="w-2/5">
      <section className={styles['section']}>
        <h2 className={styles['section__heading']}>User info</h2>
        <PhotoField name="photo" control={form.control} label="Photo" />
        <InlineFields>
          <TextField name="firstName" control={form.control} label="First name" />
          <TextField name="lastName" control={form.control} label="Last name" />
        </InlineFields>
        <InlineFields>
          <TextField name="email" control={form.control} label="Email" />
          <SelectField
            name="department"
            options={departmentsOptions}
            control={form.control}
            label="Department"
          />
        </InlineFields>
        <InlineFields>
          <TextField name="address" control={form.control} label="Address" />
          <SelectField
            name="role"
            options={departmentsOptions}
            control={form.control}
            label="Role"
          />
        </InlineFields>
        <InlineFields>
          <SelectField
            name="contractType"
            options={departmentsOptions}
            control={form.control}
            label="Contract type"
          />
          <DateField name="birthDate" control={form.control} label="Birth date" />
          <Checkbox label="Active" {...form.register('isActive')} className="mt-4" />
        </InlineFields>
        <Button
          variant={ButtonVariant.PRIMARY}
          label="Save"
          className="w-1/2 mt-6"
          onClick={handleSubmit}
          // isLoading={formState.isSubmitting}
        />
      </section>
    </Modal>
  );
};
