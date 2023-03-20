import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

import { Avatar } from '~/view/components/Avatar';
import { TextLink } from '~/view/ui/components/common/TextLink';

// TODO remove any when get from backend real type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columnHelper = createColumnHelper<any>();

export const REQUESTS_TABLE_COLUMNS = [
  columnHelper.accessor('type', {
    id: 'type',
    header: 'Type',
    cell: props => {
      // const { id } = props.row.original;
      return (
        <div className="flex gap-3 items-center">
          <TextLink to="" className="underline">
            {props.getValue()}
          </TextLink>
        </div>
      );
    },
  }),
  columnHelper.accessor('assignedTo', {
    id: 'assignedTo',
    header: 'Assigned to',
    cell: props => (
      <div className="flex gap-3 items-center">
        <Avatar uri="https://picsum.photos/200" size={26} />
        {props.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('createdBy', {
    id: 'createdBy',
    header: 'Created By',
    cell: props => (
      <div className="flex gap-3 items-center">
        <Avatar uri="https://picsum.photos/200" size={26} />
        {props.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    header: 'Created at',
    cell: props => props.getValue(),
  }),
  columnHelper.accessor('dueDate', {
    id: 'dueDate',
    header: 'Due date',
    cell: props => props.getValue(),
  }),
];
