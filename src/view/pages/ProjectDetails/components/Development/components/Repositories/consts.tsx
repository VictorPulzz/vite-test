import { createColumnHelper } from '@tanstack/react-table';
import { TextLink } from '@ui/components/common/TextLink';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { RepositoryType, RepositoryTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';

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
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    header: 'Created at',
    cell: props => <span>{format(new Date(props.getValue()), DateFormat.D_MMM_Y)}</span>,
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
