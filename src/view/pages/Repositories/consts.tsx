import { createColumnHelper } from '@tanstack/react-table';
import { Badge, BadgeColor } from '@ui/components/common/Badge';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { RepositoryPlatformChoice } from '~/services/gql/__generated__/globalTypes';
import { TextLink } from '~/view/ui/components/common/TextLink';

import { MoreCell } from './components/MoreCell';
import { RepositoryResultType } from './types';

const columnHelper = createColumnHelper<RepositoryResultType>();

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
  columnHelper.accessor('project.name', {
    id: 'project.name',
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
  // TODO add gitUrl inside TextLink
  columnHelper.accessor('gitRepoId', {
    id: 'gitUrl',
    header: 'Git url',
    cell: props => props.getValue() ?? '-',
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    header: 'Created at',
    cell: props => format(new Date(props.getValue()), DateFormat.PP),
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
            platform?.toUpperCase() === RepositoryPlatformChoice.MOBILE
              ? BadgeColor.GREEN
              : BadgeColor.BLUE
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
