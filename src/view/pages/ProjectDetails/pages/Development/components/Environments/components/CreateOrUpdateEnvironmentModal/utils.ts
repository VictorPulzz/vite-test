import { FetchProjectEnvironmentQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { ProjectEnvironmentFormValues } from './hooks/useProjectEnvironmentForm';

export function transformProjectEnvironmentPrefilledData(
  data: FetchProjectEnvironmentQuery['projectEnvironment'],
): ProjectEnvironmentFormValues {
  return {
    title: data.title || '',
    environment: data.name,
    notes: data.notes || '',
    credentials:
      data.credentials?.map(value => ({
        id: value.id,
        type: value.type,
        shortDescription: value.shortDescription || '',
        url: value.url || '',
        login: value.login || '',
        password: value.password || '',
        isNew: false,
      })) || [],
    showCredsToEveryContributors: !!data.showCredsToEveryContributors,
  };
}
