import { PaginationItem } from '~/types';

import { FetchHistoryLogsQuery, FetchProjectSlackChannelsQuery } from './__generated__/schema';

export type LogsResultType = PaginationItem<FetchHistoryLogsQuery['logList']>;

export type ProjectSlackChannelResultType = Exclude<
  FetchProjectSlackChannelsQuery['project']['slackChannels'],
  undefined | null
>[number];
