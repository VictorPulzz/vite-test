import { FetchSlackTemplatesListQuery } from '../../__generated__/schema';

export type SlackChannelTemplateResultType = Exclude<
  FetchSlackTemplatesListQuery['slackTemplateList'],
  undefined | null
>[number];
