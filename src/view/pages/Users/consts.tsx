import { createColumnHelper } from '@tanstack/react-table';
import { Badge, BadgeColor } from '@ui/components/common/Badge';
import { TextLink } from '@ui/components/common/TextLink';
// import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

// import { DATE_FORMAT } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
// import { ClientOrder } from '~/services/gql/__generated__/globalTypes';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';

import { MoreCell } from './components/MoreCell';
// import { ClientResultType } from './types';

const columnHelper = createColumnHelper<any>();

export const EMPLOYEES_TABLE_COLUMNS = [
  columnHelper.accessor('fullName', {
    // id: ClientOrder.FULL_NAME,
    header: 'Name',
    cell: ({
      row: {
        original: { photo, fullName, id },
      },
    }) => {
      return (
        <div className="flex gap-3 items-center">
          <Avatar uri={photo || photoPlaceholder} size={26} />
          <TextLink to={generatePath(ROUTES.USER_DETAILS, { id })} className="underline">
            {fullName}
          </TextLink>
        </div>
      );
    },
  }),
  columnHelper.accessor('department', {
    // id: ClientOrder.EMAIL,
    header: 'Department',
  }),
  columnHelper.accessor('email', {
    // id: ClientOrder.EMAIL,
    header: 'Email',
  }),
  columnHelper.accessor('isActive', {
    // id: ClientOrder.STATUS,
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
