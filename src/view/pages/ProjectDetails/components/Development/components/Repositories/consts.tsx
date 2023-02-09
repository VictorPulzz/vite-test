import { createColumnHelper } from '@tanstack/react-table';
import { TextLink } from '@ui/components/common/TextLink';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import {
  RepositoryPlatformChoice,
  RepositoryType,
  RepositoryTypeChoice,
} from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { Badge, BadgeColor } from '~/view/ui/components/common/Badge';

import { MoreCell } from './components/MoreCell';

const columnHelper = createColumnHelper<RepositoryType>();

export const REPOSITORIES_TABLE_COLUMNS = [
  columnHelper.accessor('name', {
    id: 'name',
    header: 'Name',
    cell: props => {
      const { id, name } = props.row.original;
      return (
        <div>
          {name ? (
            <TextLink to={generatePath(ROUTES.REPOSITORY_DETAILS, { id })} className="underline">
              {props.getValue()}
            </TextLink>
          ) : (
            <span className="text-red">Requested</span>
          )}
        </div>
      );
    },
  }),
  columnHelper.accessor('type', {
    id: 'type',
    header: 'Type',
    cell: props => (
      <span>{convertUppercaseToReadable(props.getValue() as RepositoryTypeChoice)}</span>
    ),
  }),
  columnHelper.accessor('platform', {
    id: 'platform',
    header: 'Platfrom',
    cell: ({
      row: {
        original: { platform },
      },
    }) => {
      return (
        <Badge
          color={
            platform?.toUpperCase() === RepositoryPlatformChoice.WEB
              ? BadgeColor.GREEN
              : BadgeColor.GRAY
          }
        >
          {platform}
        </Badge>
      );
    },
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    header: 'Created at',
    cell: props => <span>{format(new Date(props.getValue()), DateFormat.PP)}</span>,
  }),
  columnHelper.group({
    id: 'more',
    cell: MoreCell,
    meta: {
      className: 'w-0',
    },
  }),
];
