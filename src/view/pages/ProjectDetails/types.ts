import { PaginationItem } from '~/types';

import {
  FetchHistoryLogsQuery,
  FetchProjectIntegrationsQuery,
  FetchProjectMembersQuery,
  FetchProjectReportsQuery,
  FetchProjectStatusReportAnswersQuery,
  FetchReportAnswersQuery,
  FetchReportQuestionsQuery,
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

export type ReportQuestionsResultType = Exclude<
  FetchReportQuestionsQuery['report']['questions'],
  null | undefined
>;

export type ReportAnswersResultType = Exclude<
  FetchReportAnswersQuery['report']['answers'],
  null | undefined
>;

export type ProjectReportsResultType = PaginationItem<FetchProjectReportsQuery['reportList']>;

export type ProjectReportAnswerType = Exclude<
  FetchProjectStatusReportAnswersQuery['projectReportAnswers'],
  undefined | null
>[number];
