import { createColumnHelper } from '@tanstack/table-core';
import clsx from 'clsx';
import { format } from 'date-fns';
import React from 'react';

import { DateFormat } from '~/constants/dates';

import { ProjectSlackChannelResultType } from '../../../../types';
import { MoreCell } from './components/MoreCell';
import { RedirectOrCreateSlackChannelCell } from './components/RedirectOrCreateSlackChannelCell';

const columnHelper = createColumnHelper<ProjectSlackChannelResultType>();

export const SLACK_CHANNELS_TABLE_COLUMNS = [
  columnHelper.accessor('template.label', {
    id: 'type.label',
    header: 'Template',
    cell: props => {
      const isCreatedSlackChannel = props.row.original.channelId;
      const templateName = props.row.original.templateName;
      return (
        <span className={clsx(!isCreatedSlackChannel && 'text-red')}>
          {props.getValue() ?? templateName}
        </span>
      );
    },
  }),
  columnHelper.accessor('channelId', {
    id: 'channelId',
    header: 'Channel ID',
    cell: props => <span>{props.getValue() ?? '-'}</span>,
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    header: 'Created at',
    cell: props => {
      const isCreatedSlackChannel = props.row.original.channelId;
      return (
        <span>
          {isCreatedSlackChannel ? format(new Date(props.getValue()), DateFormat.D_MMM_Y) : '-'}
        </span>
      );
    },
  }),
  columnHelper.group({
    id: 'actions',
    header: 'Actions',
    cell: ctx => <RedirectOrCreateSlackChannelCell ctx={ctx} />,
    meta: {
      className: 'w-[160px]',
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
