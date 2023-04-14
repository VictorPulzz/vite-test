import { Badge, BadgeColor } from '@appello/web-ui';
import { TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { RepositoryTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';

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
      const { project } = props.row.original;
      return (
        <TextLink
          to={generatePath(ROUTES.PROJECT_DETAILS, { id: project.id })}
          className="underline"
        >
          {props.getValue()}
        </TextLink>
      );
    },
    meta: {
      className: 'w-[400px]',
    },
  }),
  columnHelper.accessor('technologies', {
    id: 'technologies',
    header: 'Technologies',
    cell: props => {
      const { technologies } = props.row.original;
      return (
        <div>
          {technologies?.map(({ id, name }, index) => [
            index > 0 && ', ',
            <span key={id}>{name}</span>,
          ])}
        </div>
      );
    },
  }),
  columnHelper.accessor('gitUrl', {
    id: 'gitUrl',
    header: 'Git url',
    cell: props => {
      const gitUrl = props.getValue();
      return (
        <TextLink external to={gitUrl ?? ''} className="underline">
          {gitUrl}
        </TextLink>
      );
    },
  }),
  columnHelper.accessor('type', {
    id: 'type',
    header: 'Type',
    cell: props => {
      const type = props.getValue();
      return (
        <Badge color={type === RepositoryTypeChoice.FRONTEND ? BadgeColor.BLUE : BadgeColor.GREEN}>
          {convertUppercaseToReadable(type ?? '')}
        </Badge>
      );
    },
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    header: 'Created at',
    cell: props => format(new Date(props.getValue()), DateFormat.D_MMM_Y),
  }),
  columnHelper.group({
    id: 'more',
    cell: MoreCell,
    meta: {
      className: 'w-0',
    },
  }),
];

export const REPOSITORIES_TABLE_COLUMNS_NO_DETAILS = [
  columnHelper.accessor('name', {
    id: 'name',
    header: 'Name',
    cell: props => {
      const { name } = props.row.original;
      return (
        <div>
          {name ? <span>{props.getValue()}</span> : <span className="text-red">Requested</span>}
        </div>
      );
    },
  }),
  ...REPOSITORIES_TABLE_COLUMNS.slice(1, REPOSITORIES_TABLE_COLUMNS.length),
];
