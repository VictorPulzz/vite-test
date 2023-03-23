import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

import { PROJECT_STATUS_BADGES } from '~/constants/projectStatusBadges';
import { StatusEnum } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { Badge } from '~/view/ui/components/common/Badge';

import { UserProjectsListResultType } from './types';

const columnHelper = createColumnHelper<UserProjectsListResultType>();

export const USERS_PROJECTS_TABLE_COLUMNS = [
  columnHelper.accessor('project.name', {
    id: 'name',
    header: 'Project name',
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
      const value = convertUppercaseToReadable(props.getValue() ?? StatusEnum.WAITING);
      return (
        <Badge color={PROJECT_STATUS_BADGES[props.getValue() ?? StatusEnum.WAITING]}>{value}</Badge>
      );
    },
  }),
];
