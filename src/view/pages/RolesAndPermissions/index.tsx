import { Button, ButtonVariant } from '@ui/components/common/Button';
import { EmptyState } from '@ui/components/common/EmptyState';
import React, { FC } from 'react';

import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Checkbox } from '~/view/ui/components/form/Checkbox';

import { USER_ROLES, USER_ROLES_FORM_FIELDS } from './consts';
import { useRolesAndPermissionsForm } from './hooks/useRolesAndPermissionsForm';

// TODO remove rolesAndPermissionstestData when backend will be ready
const rolesAndPermissionstestData = {
  a: {
    title: 'Create user / Edit user',
    engineer: true,
    pm: false,
    lead: false,
    hr: false,
    sales: true,
    admin: false,
  },
  b: {
    title: 'Create project / Edit project',
    engineer: true,
    pm: true,
    lead: true,
    hr: true,
    sales: false,
    admin: true,
  },
  c: {
    title: 'Create repository / Edit repository ',
    engineer: false,
    pm: false,
    lead: false,
    hr: false,
    sales: true,
    admin: false,
  },
  d: {
    title: 'Add participants to project / repository',
    engineer: false,
    pm: false,
    lead: true,
    hr: false,
    sales: false,
    admin: false,
  },
  e: {
    title: 'Edit roles and permissions',
    engineer: true,
    pm: true,
    lead: true,
    hr: false,
    sales: true,
    admin: true,
  },
};

export const RolesAndPermissionsPage: FC = () => {
  // const { data, loading, fetchMore } = useFetchRolesAndPermissionsQuery();
  const { form, handleSubmit, resetForm } = useRolesAndPermissionsForm({
    rolesAndPermissionsData: rolesAndPermissionstestData,
  });

  // TODO remove test data later
  const data = {
    loading: false,
    rolesAndPermissions: Object.values(rolesAndPermissionstestData),
  };

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-h4">Roles & Pemissions</h1>
      </div>
      {data.loading && <span>LOADING</span>}
      {data && data.rolesAndPermissions.length === 0 && (
        <EmptyState iconName="key" label="No roles & permissions here yet" />
      )}
      {!data.loading && data && data.rolesAndPermissions.length > 0 && (
        <>
          <div className="mt-6">
            <div className="flex items-center bg-gray-7 rounded-t-md">
              <span className="text-gray-1 text-c1 p-2 w-1/4" />
              <div className="flex-auto flex items-center">
                {Object.values(USER_ROLES).map((role, index) => (
                  <span key={index} className="text-gray-1 text-c1 px-4 py-2 w-1/6">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div>
              {Object.entries(rolesAndPermissionstestData).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center bg-white [&:not(:last-child)]:border-b-[1px] border-solid text-gray-6"
                >
                  <span className="text-primary text-c1 p-2 w-1/4">{value.title}</span>
                  <div className="flex-auto flex items-center">
                    {Object.values(USER_ROLES_FORM_FIELDS).map(role => (
                      <Checkbox
                        key={role}
                        {...form.register(`${key}.${role}`)}
                        className="text-gray-6 text-c1 p-4 border-l-[1px] border-solid w-1/6"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6">
            <Button
              label="Save"
              variant={ButtonVariant.PRIMARY}
              className="w-[100px]"
              onClick={handleSubmit}
            />
            <Button
              label="Discard"
              variant={ButtonVariant.SECONDARY}
              className="w-[100px]"
              onClick={resetForm}
            />
          </div>
        </>
      )}
    </SidebarLayout>
  );
};
