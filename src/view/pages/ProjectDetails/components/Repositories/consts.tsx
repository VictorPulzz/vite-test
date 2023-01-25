import { createColumnHelper } from '@tanstack/react-table';
import { TextLink } from '@ui/components/common/TextLink';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { Badge, BadgeColor } from '~/view/ui/components/common/Badge';

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
  columnHelper.accessor('createdAt', {
    // id: ClientOrder.EMAIL,
    header: 'Created at',
  }),
  columnHelper.accessor('platform', {
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
];
