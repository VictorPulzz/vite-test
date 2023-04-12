import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { Badge, BadgeColor } from '~/view/ui/components/common/Badge';

import { InitialUsersCell } from './components/InitialUsersCell';
import { MoreCell } from './components/MoreCell';

export enum Accessibility {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export interface ChannelTemplatesType {
  name: string;
  prefix: string;
  users: { id: number; photo: string; fullName: string }[];
  accessibility: Accessibility;
}

const columnHelper = createColumnHelper<ChannelTemplatesType>();

export const CHANNEL_TEMPLATES_TABLE_COLUMNS = [
  columnHelper.accessor('name', {
    id: 'name',
    header: 'Name',
  }),
  columnHelper.accessor('prefix', {
    id: 'prefix',
    header: 'Prefix',
  }),
  columnHelper.accessor('users', {
    id: 'users',
    header: 'Initial users',
    cell: ctx => <InitialUsersCell ctx={ctx} />,
    meta: {
      className: 'w-[200px]',
    },
  }),
  columnHelper.accessor('accessibility', {
    id: 'accessibility',
    header: 'Accessibility',
    cell: ctx => {
      const accessibility = ctx.getValue();
      return (
        <Badge color={accessibility === Accessibility.PRIVATE ? BadgeColor.BLUE : BadgeColor.GREEN}>
          {convertUppercaseToReadable(accessibility)}
        </Badge>
      );
    },
    meta: {
      className: 'w-[180px]',
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
