import { Icon } from '@appello/web-ui';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { Dropdown, DropdownItem } from 'react-nested-dropdown';

import { PermissionType } from '~/services/gql/__generated__/globalTypes';
import {
  FetchPermissionsListDocument,
  useUpdatePermissionsListMutation,
} from '~/view/pages/RolesAndPermissions/__generated__/schema';
import { useFetchRolesListQuery } from '~/view/pages/Users/__generated__/schema';

import styles from './styles.module.scss';

interface Props {
  featureRow: PermissionType;
}

export const AddRolePopup: FC<Props> = ({ featureRow }) => {
  const { data: rolesListData } = useFetchRolesListQuery();

  const [updatePermissions] = useUpdatePermissionsListMutation();

  const initialFeatureRowRoles = useMemo(
    () => featureRow.roles?.map(i => i.id) ?? [],
    [featureRow.roles],
  );

  const rolesOptions = useMemo(
    () => rolesListData?.rolesList.filter(role => !initialFeatureRowRoles.includes(role.value)),
    [initialFeatureRowRoles, rolesListData?.rolesList],
  );

  const [roles, setRoles] = useState<number[]>(initialFeatureRowRoles);

  const addRole = useCallback(
    async (rowId: number, roleId: number) => {
      const newRoles = [...roles, roleId];

      setRoles(newRoles);

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
    [roles, updatePermissions],
  );

  const options = useMemo<DropdownItem[]>(
    () =>
      rolesOptions?.map(({ label, value }) => ({
        label,
        onSelect: () => {
          addRole(featureRow.id, value);
        },
      })) ?? [],
    [addRole, featureRow.id, rolesOptions],
  );

  return (
    <div>
      {!!rolesOptions?.length && (
        <Dropdown items={options} containerWidth="14.93rem" className={styles['dropdown']}>
          {({ onClick }) => (
            <button
              type="button"
              onClick={onClick}
              className="ml-1 bg-gray-7 flex justify-center items-center w-[25px] h-[25px] p-1 rounded-lg cursor-pointer"
            >
              <Icon name="plus" size={12} />
            </button>
          )}
        </Dropdown>
      )}
    </div>
  );
};
