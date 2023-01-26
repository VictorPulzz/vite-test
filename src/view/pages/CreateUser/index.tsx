import { Button, ButtonVariant } from '@ui/components/common/Button';
import { InlineFields } from '@ui/components/form/InlineFields';
import { SelectField } from '@ui/components/form/SelectField';
import { TextField } from '@ui/components/form/TextField';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Checkbox } from '~/view/ui/components/form/Checkbox';
import { DateField } from '~/view/ui/components/form/DateField';
import { PhotoField } from '~/view/ui/components/form/PhotoField';

import { useCreateUserForm } from './hooks/useCreateUserForm';
import styles from './styles.module.scss';

export enum Departments {
  FRONT_END = 'FRONTEND',
  BACK_END = 'BACKEND',
}

export const CreateUserPage: FC = () => {
  const navigate = useNavigate();

  const { form, handleSubmit } = useCreateUserForm({
    onSubmitSuccessful: () => navigate(-1),
  });

  const departmentsOptions = enumToSelectOptions(Departments);

  return (
    <SidebarLayout>
      <DetailLayout
        title="Add user"
        contentClassName="my-4 mx-6 shadow-4 rounded-md bg-white p-7"
        rightHeaderElement={
          <Button
            variant={ButtonVariant.PRIMARY}
            label="Create user"
            className="w-36"
            onClick={handleSubmit}
            isLoading={form.formState.isSubmitting}
          />
        }
      >
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
              name="contractType"
              options={departmentsOptions}
              control={form.control}
              label="Contract type"
            />
          </InlineFields>
          <InlineFields>
            <DateField name="birthDate" control={form.control} label="Birth date" />
            <Checkbox label="Active" {...form.register('isActive')} className="mt-4" />
          </InlineFields>
        </section>
      </DetailLayout>
    </SidebarLayout>
  );
};
