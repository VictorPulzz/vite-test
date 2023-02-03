import { createColumnHelper } from '@tanstack/react-table';
import { TextLink } from '@ui/components/common/TextLink';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { StatusEnum } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { Badge, BadgeColor } from '~/view/ui/components/common/Badge';

import { MoreCell } from './components/MoreCell';
import { ProjectResultType } from './types';

const columnHelper = createColumnHelper<ProjectResultType>();

const getBadgeByStatus = (status: StatusEnum): BadgeColor => {
  switch (true) {
    case status === StatusEnum.IN_PROGRESS:
      return BadgeColor.BLUE;
    case status === StatusEnum.ON_HOLD:
      return BadgeColor.RED;
    case status === StatusEnum.STOPPED:
      return BadgeColor.GRAY;
    case status === StatusEnum.FINISHED:
      return BadgeColor.GREEN;
    default:
      return BadgeColor.BLUE;
  }
};

export const PROJECTS_TABLE_COLUMNS = [
  columnHelper.accessor('name', {
    id: 'name',
    header: 'Project name',
    cell: props => {
      const { id } = props.row.original;
      return (
        <div className="flex gap-3 items-center">
          <TextLink to={generatePath(ROUTES.PROJECT_DETAILS, { id })} className="underline">
            {props.getValue()}
          </TextLink>
        </div>
      );
    },
  }),
  columnHelper.accessor(row => row.PM && row.PM[0].fullName, {
    id: 'PM',
    header: 'PM',
  }),
  columnHelper.accessor('status', {
    id: 'status',
    header: 'Status',
    cell: props => {
      const value = convertUppercaseToReadable(props.getValue() as StatusEnum);

      return <Badge color={getBadgeByStatus(props.getValue() as StatusEnum)}>{value}</Badge>;
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
