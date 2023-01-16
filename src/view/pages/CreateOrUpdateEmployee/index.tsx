import { Button, ButtonVariant } from '@ui/components/common/Button';
import { InlineFields } from '@ui/components/form/InlineFields';
import { SelectField } from '@ui/components/form/SelectField';
import { TextField } from '@ui/components/form/TextField';
import React, { FC } from 'react';
import { ExtractRouteParams } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Checkbox } from '~/view/ui/components/form/Checkbox';
import { DateField } from '~/view/ui/components/form/DateField';
import { PhotoField } from '~/view/ui/components/form/PhotoField';

import { useEmployeeForm } from './hooks/useEmployeeForm';
import styles from './styles.module.scss';

export enum Departments {
  FRONT_END = 'FRONTEND',
  BACK_END = 'BACKEND',
}

export const CreateOrUpdateEmployeePage: FC = () => {
  const navigate = useNavigate();
  const params = useParams<ExtractRouteParams<typeof ROUTES.EDIT_PROJECT, string>>();
  const projectId = params.id ? Number(params.id) : undefined;
  const isEditMode = !!projectId;

  /* Todo: add edit mode when backend will be ready
  const { employee, loading} = useFetchEmployeeQuery({
    variables: {
      id: isEditMode ? projectId : 0,
    },
    skip: !isEditMode,
  }); */

  const { form, handleSubmit } = useEmployeeForm({
    onSubmitSuccessful: () => navigate(-1),
    // todo: deal with projectId can't be undefined wneh backend will be ready
    // prefilledData: { id: projectId ?? 0 },
    id: projectId,
  });

  const departmentsOptions = enumToSelectOptions(Departments);

  return (
    <SidebarLayout>
      <DetailLayout
        title={isEditMode ? 'Edit employee' : 'Add employee'}
        contentClassName="my-4 mx-6 shadow-4 rounded-md bg-white p-7"
        rightHeaderElement={
          <Button
            variant={ButtonVariant.PRIMARY}
            label={isEditMode ? 'Save employee' : 'Create employee'}
            className="w-36"
            onClick={handleSubmit}
            isLoading={form.formState.isSubmitting}
          />
        }
      >
        <section className={styles['section']}>
          <h2 className={styles['section__heading']}>Employee info</h2>
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
        </section>
      </DetailLayout>
    </SidebarLayout>
  );
};
