import { Badge, BadgeColor } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/table-core';
import React from 'react';

import { InitialUsersCell } from './components/InitialUsersCell';
import { MoreCell } from './components/MoreCell';
import { SlackChannelTemplateResultType } from './types';

const columnHelper = createColumnHelper<SlackChannelTemplateResultType>();

export const CHANNEL_TEMPLATES_TABLE_COLUMNS = [
  columnHelper.accessor('label', {
    id: 'label',
    header: 'Name',
  }),
  columnHelper.accessor('prefix', {
    id: 'prefix',
    header: 'Prefix',
  }),
  columnHelper.group({
    id: 'initialUsers',
    header: 'Initial users',
    cell: InitialUsersCell,
    meta: {
      className: 'w-[200px]',
    },
  }),
  columnHelper.accessor('isPrivate', {
    id: 'isPrivate',
    header: 'Accessibility',
    cell: ctx => {
      const isPrivate = ctx.getValue();
      return (
        <Badge color={isPrivate ? BadgeColor.BLUE : BadgeColor.GREEN}>
          {isPrivate ? 'Private' : 'Public'}
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
