import { PaginationItem } from '~/types';

import {
  FetchHistoryLogsQuery,
  FetchProjectMembersQuery,
  FetchProjectSlackChannelsQuery,
} from './__generated__/schema';

export type LogsResultType = PaginationItem<FetchHistoryLogsQuery['logList']>;

export type ProjectSlackChannelResultType = Exclude<
  FetchProjectSlackChannelsQuery['project']['slackChannels'],
  undefined | null
>[number];

export type ProjectMemberResultType = Exclude<
  | FetchProjectMembersQuery['projectMemberList']['currentTeam']
  | FetchProjectMembersQuery['projectMemberList']['otherContrubutors'],
  undefined | null
>[number];
