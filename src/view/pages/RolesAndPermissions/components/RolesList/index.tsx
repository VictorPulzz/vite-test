import React, { FC, useCallback, useMemo, useState } from 'react';

import { PermissionType, RoleType } from '~/services/gql/__generated__/globalTypes';
import { Icon } from '~/view/ui/components/common/Icon';

import {
  FetchPermissionsListDocument,
  useUpdatePermissionsListMutation,
} from '../../__generated__/schema';
import { AddRolePopup } from './components/AddRolePopup';

interface Props {
  roles: RoleType[];
  featureRow: PermissionType;
}

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
    <div className="flex items-center gap-3">
      {roles.map(({ id, name }) => (
        <div key={id} className="group relative bg-blue/5 px-3 py-1 rounded-lg cursor-pointer">
          <span className="text-c1 font-medium">{name}</span>
          <button
            type="button"
            onClick={() => removeRole(featureRow.id, id)}
            className="absolute right-[-5px] top-[-5px] bg-gray-6 p-1 rounded-xl hidden group-hover:block"
          >
            <Icon name="close" size={10} />
          </button>
        </div>
      ))}
      <AddRolePopup featureRow={featureRow} />
    </div>
  );
};
