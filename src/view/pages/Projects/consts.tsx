import { createColumnHelper } from '@tanstack/react-table';
// import { Badge, BadgeColor } from '@ui/components/common/Badge';
import { TextLink } from '@ui/components/common/TextLink';
// import { format } from 'date-fns';
import React from 'react';

import { MoreCell } from './components/MoreCell';

// import { generatePath } from 'react-router-dom';
// import { DATE_FORMAT } from '~/constants/dates';
// import { ROUTES } from '~/constants/routes';
// import { ClientOrder } from '~/services/gql/__generated__/globalTypes';
// import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
// import { ClientResultType } from './types';

const columnHelper = createColumnHelper<any>();

export const PROJECTS_TABLE_COLUMNS = [
  columnHelper.accessor('name', {
    // id: ClientOrder.FULL_NAME,
    header: 'Project name',
    cell: props => {
      return (
        <div className="flex gap-3 items-center">
          <TextLink to="" className="underline">
            {props.getValue()}
          </TextLink>
        </div>
      );
    },
  }),
  columnHelper.accessor('pm', {
    // id: ClientOrder.EMAIL,
    header: 'PM',
  }),
  columnHelper.accessor('status', {
    // id: ClientOrder.EMAIL,
    header: 'Status',
  }),
  // TODO change status cell
  // columnHelper.accessor('user.isActive', {
  //   id: ClientOrder.STATUS,
  //   header: 'Status',
  //   cell: props => {
  //     const isActive = props.getValue();
  //     return (
  //       <Badge color={isActive ? BadgeColor.GREEN : BadgeColor.GRAY}>
  //         {isActive ? 'Active' : 'Inactive'}
  //       </Badge>
  //     );
  //   },
  // }),
  columnHelper.group({
    id: 'more',
    cell: MoreCell,
    meta: {
      className: 'w-0',
    },
  }),
];
