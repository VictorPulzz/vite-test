import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import React from 'react';

import { DateFormat } from '~/constants/dates';
import { ProjectSlackType } from '~/services/gql/__generated__/globalTypes';

import { RedirectOrCreateSlackChannelCell } from './components/RedirectOrCreateSlackChannelCell';

const columnHelper = createColumnHelper<ProjectSlackType>();

export const SLACK_CHANNELS_TABLE_COLUMNS = [
  columnHelper.accessor('type.name', {
    id: 'channelType',
    header: 'Type',
    cell: props => {
      const isCreatedSlackChannel = props.row.original.channelId;
      return <span className={`${!isCreatedSlackChannel && 'text-red'}`}>{props.getValue()}</span>;
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
