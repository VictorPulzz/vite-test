import { createColumnHelper } from '@tanstack/table-core';
import clsx from 'clsx';
import { format } from 'date-fns';
import React from 'react';

import { DateFormat } from '~/constants/dates';

import { ProjectSlackChannelResultType } from '../../../../types';
import { RedirectOrCreateSlackChannelCell } from './components/RedirectOrCreateSlackChannelCell';

const columnHelper = createColumnHelper<ProjectSlackChannelResultType>();

const DELETED_CHANNEL_TEMPLATE_TITLE = 'Deleted channel type';

export const SLACK_CHANNELS_TABLE_COLUMNS = [
  columnHelper.accessor('template.label', {
    id: 'type.label',
    header: 'Type',
    cell: props => {
      const isCreatedSlackChannel = props.row.original.channelId;
      return (
        <span className={clsx(!props.getValue() && 'italic', !isCreatedSlackChannel && 'text-red')}>
          {props.getValue() ?? DELETED_CHANNEL_TEMPLATE_TITLE}
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
    id: 'more',
    header: 'Actions',
    cell: ctx => <RedirectOrCreateSlackChannelCell ctx={ctx} />,
    meta: {
      className: 'w-[160px]',
    },
  }),
];
