import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

import { StatusEnum } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { getBadgeByProjectStatus } from '~/utils/getBadgeByProjectStatus';
import { Badge } from '~/view/ui/components/common/Badge';

// import { UserProjectsListResultType } from './types';

// TODO add UserProjectsListResultType  type
const columnHelper = createColumnHelper<any>();

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
      const value = convertUppercaseToReadable(props.getValue() as StatusEnum);
      return <Badge color={getBadgeByProjectStatus(props.getValue() as StatusEnum)}>{value}</Badge>;
    },
  }),
];
