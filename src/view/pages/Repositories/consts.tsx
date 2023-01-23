import { createColumnHelper } from '@tanstack/react-table';
import { Badge, BadgeColor } from '@ui/components/common/Badge';
import { TextLink } from '@ui/components/common/TextLink';
// import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';

// import { DATE_FORMAT } from '~/constants/dates';
// import { ClientOrder } from '~/services/gql/__generated__/globalTypes';
import { MoreCell } from './components/MoreCell';
// import { ClientResultType } from './types';

// TODO move ProjectPlatfrom to common models later
export enum ProjectPlatfrom {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
}

const columnHelper = createColumnHelper<any>();

export const REPOSITORIES_TABLE_COLUMNS = [
  columnHelper.accessor('repositoryName', {
    // id: ClientOrder.EMAIL,
    header: 'Name',
    cell: props => {
      const { repositoryId } = props.row.original;
      return (
        <TextLink
          to={generatePath(ROUTES.REPOSITORY_DETAILS, { id: repositoryId })}
          className="underline"
        >
          {props.getValue()}
        </TextLink>
      );
    },
  }),
  columnHelper.accessor('projectName', {
    // id: ClientOrder.EMAIL,
    header: 'Project',
    cell: props => {
      const { projectId } = props.row.original;
      return (
        <TextLink
          to={generatePath(ROUTES.PROJECT_DETAILS, { id: projectId })}
          className="underline"
        >
          {props.getValue()}
        </TextLink>
      );
    },
  }),
  columnHelper.accessor('gitUrl', {
    // id: ClientOrder.FULL_NAME,
    header: 'Git url',
    cell: props => {
      return (
        <TextLink external to={props.getValue()} className="underline">
          {props.getValue()}
        </TextLink>
      );
    },
  }),
  columnHelper.accessor('createdAt', {
    // id: ClientOrder.EMAIL,
    header: 'Created at',
  }),
  columnHelper.accessor('isActive', {
    // id: ClientOrder.STATUS,
    header: 'Platfrom',
    cell: ({
      row: {
        original: { platform },
      },
    }) => {
      return (
        <Badge
          color={
            platform.toUpperCase() === ProjectPlatfrom.WEB ? BadgeColor.GREEN : BadgeColor.GRAY
          }
        >
          {platform}
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
