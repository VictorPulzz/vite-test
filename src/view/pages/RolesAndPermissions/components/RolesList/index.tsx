import { Icon } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC, useCallback, useMemo, useState } from 'react';

import { PermissionType, RoleType } from '~/services/gql/__generated__/globalTypes';

import {
  FetchPermissionsListDocument,
  useUpdatePermissionsListMutation,
} from '../../__generated__/schema';
import { AddRolePopup } from './components/AddRolePopup';

interface Props {
  roles: RoleType[];
  featureRow: PermissionType;
}

const ADMIN_ROLE = 'Admin';

export const RolesList: FC<Props> = ({ roles, featureRow }) => {
  const [updatePermissions] = useUpdatePermissionsListMutation();

  const initialFeatureRowRoles = useMemo(
    () => featureRow.roles?.map(i => i.id) ?? [],
    [featureRow.roles],
  );

  const [rolesList, setRolesList] = useState<number[]>(initialFeatureRowRoles);

  const removeRole = useCallback(
    async (rowId: number, roleId: number) => {
      const newRoles = [...rolesList].filter(item => item !== roleId);

      setRolesList(newRoles);

      await updatePermissions({
        variables: {
          input: {
            id: rowId,
            roles: newRoles,
          },
        },
        refetchQueries: [FetchPermissionsListDocument],
      });
    },
    [rolesList, updatePermissions],
  );
  return (
    <div className="flex flex-wrap items-center gap-3">
      {roles.map(({ id, name, color }) => (
        <div
          className={clsx(
            `group relative px-3 py-1 rounded-lg cursor-pointer whitespace-nowrap`,
            !color && 'border-gray-7',
          )}
          key={id}
          style={{ backgroundColor: color ?? undefined }}
        >
          <span className=" text-p5 font-medium">{name}</span>
          {name !== ADMIN_ROLE && (
            <button
              className="absolute right-[-5px] top-[-5px] bg-gray-6 p-1 rounded-xl hidden group-hover:block"
              type="button"
              onClick={() => removeRole(featureRow.id, id)}
            >
              <Icon name="close" size={10} />
            </button>
          )}
        </div>
      ))}
      <AddRolePopup featureRow={featureRow} />
    </div>
  );
};
