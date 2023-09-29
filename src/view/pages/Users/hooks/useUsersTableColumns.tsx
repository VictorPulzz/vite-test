import { Badge, BadgeColor, TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/table-core';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

import { MoreCell } from '../components/MoreCell';
import { UserResultType } from '../types';

const columnHelper = createColumnHelper<UserResultType>();

export function useUsersTableColumns() {
  const { canReadUserDetails, canWriteUser } = useUserPermissions();

  return [
    columnHelper.accessor('fullName', {
      id: 'fullName',
      header: 'Name',
      cell: ctx => {
        const { photoThumbnail, fullName, id } = ctx.row.original;
        return (
          <div className="flex gap-3 items-center">
            <Avatar uri={photoThumbnail?.url || photoPlaceholder} size={26} />
            {canReadUserDetails ? (
              <TextLink to={generatePath(ROUTES.USER_DETAILS, { id })} className="underline">
                {fullName}
              </TextLink>
            ) : (
              <span>{fullName}</span>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor(row => row?.department?.name, {
      id: 'department',
      header: 'Department',
    }),
    columnHelper.accessor(row => row?.role?.name, {
      id: 'role',
      header: 'Role',
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: 'Email',
    }),
    columnHelper.accessor('isActive', {
      id: 'isActive',
      header: 'Status',
      cell: ctx => {
        const isActive = ctx.getValue();
        return (
          <Badge color={isActive ? BadgeColor.GREEN : BadgeColor.GRAY}>
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        );
      },
    }),
    columnHelper.group({
      id: 'more',
      enableHiding: !canWriteUser,
      cell: MoreCell,
      meta: {
        className: 'w-0',
      },
    }),
  ];
}
