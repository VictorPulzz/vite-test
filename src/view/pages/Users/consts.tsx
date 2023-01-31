import { createColumnHelper } from '@tanstack/react-table';
import { Badge, BadgeColor } from '@ui/components/common/Badge';
import { TextLink } from '@ui/components/common/TextLink';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';

import { MoreCell } from './components/MoreCell';
import { UserResultType } from './types';

const columnHelper = createColumnHelper<UserResultType>();

export const USERS_TABLE_COLUMNS = [
  columnHelper.accessor('fullName', {
    id: 'fullName',
    header: 'Name',
    cell: ({
      row: {
        original: { photo, fullName, id },
      },
    }) => {
      return (
        <div className="flex gap-3 items-center">
          <Avatar uri={photo?.url || photoPlaceholder} size={26} />
          <TextLink to={generatePath(ROUTES.USER_DETAILS, { id })} className="underline">
            {fullName}
          </TextLink>
        </div>
      );
    },
  }),
  columnHelper.accessor(row => row?.department?.name, {
    id: 'department',
    header: 'Department',
  }),
  columnHelper.accessor('email', {
    id: 'email',
    header: 'Email',
  }),
  columnHelper.accessor('isActive', {
    id: 'isActive',
    header: 'Status',
    cell: props => {
      const isActive = props.getValue();
      return (
        <Badge color={isActive ? BadgeColor.GREEN : BadgeColor.GRAY}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
  }),
  columnHelper.group({
    id: 'more',
    cell: MoreCell,
    meta: {
      className: 'w-0',
    },
  }),
];
