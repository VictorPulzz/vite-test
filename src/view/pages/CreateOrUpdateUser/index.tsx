import { Button, ButtonVariant, useSelectOptions } from '@appello/web-ui';
import { InlineFields } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { Checkbox } from '@appello/web-ui';
import { DateField } from '@appello/web-ui';
import { PhotoField } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { ExtractRouteParams } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { ContractChoice } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useFetchUserDetailsQuery } from '../UserDetails/__generated__/schema';
import {
  useFetchDepartmentsListQuery,
  useFetchRolesListQuery,
} from '../Users/__generated__/schema';
import { useUserForm } from './hooks/useUserForm';
import styles from './styles.module.scss';

export const CreateOrUpdateUserPage: FC = () => {
  const navigate = useNavigate();
  const params = useParams<ExtractRouteParams<typeof ROUTES.EDIT_USER, string>>();

  const userId = useMemo(() => (params?.id ? Number(params.id) : undefined), [params]);

  const { data: userInfo } = useFetchUserDetailsQuery({
    variables: {
      input: { id: userId ?? 0 },
    },
    skip: !userId,
  });

  const { data: departmentsList } = useFetchDepartmentsListQuery();
  const { data: rolesList } = useFetchRolesListQuery();

  const { form, handleSubmit } = useUserForm({
    onSubmitSuccessful: () => navigate(-1),
    prefilledData: userInfo?.userDetails,
    id: userId,
  });

  const departmentsOptions = useSelectOptions(departmentsList?.departmentsList, {
    value: 'value',
    label: 'label',
  });

  const rolesOptions = useSelectOptions(rolesList?.rolesList, {
    value: 'value',
    label: 'label',
  });

  const contractTypeOptions = enumToSelectOptions(ContractChoice);

  return (
    <SidebarLayout>
      <DetailLayout
        contentClassName="my-4 mx-6 shadow-4 rounded-md bg-white p-7"
        rightHeaderElement={
          <Button
            className="w-36"
            isLoading={form.formState.isSubmitting}
            label={`${userId ? 'Save' : 'Create'} user`}
            variant={ButtonVariant.PRIMARY}
            onClick={handleSubmit}
          />
        }
        title={`${userId ? 'Edit' : 'New'} user`}
      >
        <section className={styles['section']}>
          <h2 className={styles['section__heading']}>User info</h2>
          <PhotoField control={form.control} label="Photo" name="photo" />
          <InlineFields>
            <TextField required control={form.control} label="First name" name="firstName" />
            <TextField required control={form.control} label="Last name" name="lastName" />
          </InlineFields>
          <InlineFields>
            <TextField required control={form.control} label="Email" name="email" />
            <SelectField
              required
              control={form.control}
              label="Department"
              name="department"
              options={departmentsOptions}
            />
          </InlineFields>
          <InlineFields>
            <SelectField
              required
              control={form.control}
              label="Role"
              name="role"
              options={rolesOptions}
            />
            <TextField control={form.control} label="Address" name="address" />
          </InlineFields>
          <InlineFields>
            <SelectField
              required
              control={form.control}
              label="Contract type"
              name="contractType"
              options={contractTypeOptions}
            />
            <DateField required control={form.control} label="Birth date" name="birthDate" />
          </InlineFields>
          <InlineFields>
            <Checkbox label="Active" {...form.register('isActive')} className="mt-4" />
          </InlineFields>
        </section>
      </DetailLayout>
    </SidebarLayout>
  );
};
