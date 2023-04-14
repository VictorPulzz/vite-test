import { TextLink } from '@appello/web-ui';
import { Badge, BadgeColor } from '@appello/web-ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';

import { MoreCell } from './components/MoreCell';
import { ProjectResultType } from './types';

const columnHelper = createColumnHelper<ProjectResultType>();

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
    meta: {
      className: 'w-[400px]',
    },
  }),
  columnHelper.accessor('PM', {
    id: 'PM',
    header: 'PM',
    cell: props => {
      return (
        <div>
          {props.getValue()?.map(pm => (
            <div key={pm.id} className="flex gap-3 items-center">
              <Avatar uri={pm.photo?.url || photoPlaceholder} size={26} />
              <TextLink to={generatePath(ROUTES.USER_DETAILS, { id: pm.id })} className="underline">
                {pm.fullName}
              </TextLink>
            </div>
          ))}
        </div>
      );
    },
  }),
  columnHelper.accessor('status', {
    id: 'status',
    header: 'Status',
    cell: props => {
      return props.getValue() && <Badge color={BadgeColor.BLUE}>{props.getValue()?.name}</Badge>;
    },
  }),
  columnHelper.accessor('platforms', {
    id: 'platforms',
    header: 'Platform',
    cell: props => {
      const platforms = props.getValue();
      return (
        <div className="flex gap-2">
          {platforms?.map(platform => (
            <Badge key={platform.id} color={BadgeColor.BLUE}>
              {platform.name}
            </Badge>
          ))}
        </div>
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

const projectTableColumns = [...PROJECTS_TABLE_COLUMNS];

projectTableColumns.splice(
  1,
  1,
  columnHelper.accessor('PM', {
    id: 'PM',
    header: 'PM',
    cell: props => {
      return (
        <div>
          {props.getValue()?.map(pm => (
            <div key={pm.id} className="flex gap-3 items-center">
              <Avatar uri={pm.photo?.url || photoPlaceholder} size={26} />
              <span>{pm.fullName}</span>
            </div>
          ))}
        </div>
      );
    },
  }) as ColumnDef<ProjectResultType>,
);

export const PROJECTS_TABLE_COLUMNS_NO_USER_DETAILS = projectTableColumns;
