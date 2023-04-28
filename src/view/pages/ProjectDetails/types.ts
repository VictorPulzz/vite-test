import { PaginationItem } from '~/types';

import {
  FetchHistoryLogsQuery,
  FetchProjectIntegrationsQuery,
  FetchProjectMembersQuery,
} from './__generated__/schema';

export type LogsResultType = PaginationItem<FetchHistoryLogsQuery['logList']>;

export type ProjectSlackChannelResultType = Exclude<
  FetchProjectIntegrationsQuery['projectIntegrationPage']['slackChannels'],
  undefined | null
>[number];

export type ProjectMemberResultType = Exclude<
  | FetchProjectMembersQuery['projectMemberList']['currentTeam']
  | FetchProjectMembersQuery['projectMemberList']['otherContrubutors'],
  undefined | null
>[number];
