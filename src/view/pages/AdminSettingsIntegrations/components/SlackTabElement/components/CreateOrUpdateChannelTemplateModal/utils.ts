import { SlackChannelTemplateResultType } from '../../types';
import { ChannelTemplateFormValues } from './hooks/useChannelTemplateForm';

export function transformChannelTemplatePrefilledData(
  data: SlackChannelTemplateResultType,
): ChannelTemplateFormValues {
  return {
    label: data.label ?? '',
    prefix: data.prefix ?? '',
    initialUsers: data.initialUsers?.map(({ id }) => id) ?? [],
    isPrivate: data.isPrivate ?? false,
  };
}
