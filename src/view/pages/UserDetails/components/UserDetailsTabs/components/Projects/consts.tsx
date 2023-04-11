import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { Badge, BadgeColor } from '~/view/ui/components/common/Badge';
import { TextLink } from '~/view/ui/components/common/TextLink';

import { UserProjectsListResultType } from './types';

const columnHelper = createColumnHelper<UserProjectsListResultType>();

export const USERS_PROJECTS_TABLE_COLUMNS = [
  columnHelper.accessor('project.name', {
    id: 'name',
    header: 'Project name',
    cell: props => {
      const {
        project: { id },
      } = props.row.original;
      return (
        <div className="flex gap-3 items-center">
          <TextLink to={generatePath(ROUTES.PROJECT_DETAILS, { id })} className="underline">
            {props.getValue()}
          </TextLink>
        </div>
      );
    },
  }),
  columnHelper.accessor('currentTeam', {
    id: 'currentTeam',
    header: 'Involvement',
    cell: props => <span>{props.getValue() ? 'Assignee' : 'Contributor'}</span>,
  }),
  columnHelper.accessor('project.status', {
    id: 'status',
    header: 'Status',
    cell: props => {
      return props.getValue() && <Badge color={BadgeColor.BLUE}>{props.getValue()?.name}</Badge>;
    },
  }),
];
