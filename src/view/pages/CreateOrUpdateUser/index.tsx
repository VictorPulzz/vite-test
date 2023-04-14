import { Button, ButtonVariant } from '@appello/web-ui';
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

  const departmentsOptions = useMemo(
    () => departmentsList?.departmentsList ?? [],
    [departmentsList?.departmentsList],
  );

  const rolesOptions = useMemo(() => rolesList?.rolesList ?? [], [rolesList?.rolesList]);

  const contractTypeOptions = enumToSelectOptions(ContractChoice);

  return (
    <SidebarLayout>
      <DetailLayout
        title={`${userId ? 'Edit' : 'New'} user`}
        contentClassName="my-4 mx-6 shadow-4 rounded-md bg-white p-7"
        rightHeaderElement={
          <Button
            variant={ButtonVariant.PRIMARY}
            label={`${userId ? 'Save' : 'Create'} user`}
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
            <TextField name="firstName" control={form.control} label="First name" required />
            <TextField name="lastName" control={form.control} label="Last name" required />
          </InlineFields>
          <InlineFields>
            <TextField name="email" control={form.control} label="Email" required />
            <SelectField
              name="department"
              options={departmentsOptions}
              control={form.control}
              label="Department"
              required
            />
          </InlineFields>
          <InlineFields>
            <SelectField
              name="role"
              options={rolesOptions}
              control={form.control}
              label="Role"
              required
            />
            <TextField name="address" control={form.control} label="Address" />
          </InlineFields>
          <InlineFields>
            <SelectField
              name="contractType"
              options={contractTypeOptions}
              control={form.control}
              label="Contract type"
              required
            />
            <DateField name="birthDate" control={form.control} label="Birth date" required />
          </InlineFields>
          <InlineFields>
            <Checkbox label="Active" {...form.register('isActive')} className="mt-4" />
          </InlineFields>
        </section>
      </DetailLayout>
    </SidebarLayout>
  );
};
