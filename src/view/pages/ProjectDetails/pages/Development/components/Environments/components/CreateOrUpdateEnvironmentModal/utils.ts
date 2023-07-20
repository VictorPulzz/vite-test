import { FetchProjectEnvironmentQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { ProjectEnvironmentFormValues } from './hooks/useProjectEnvironmentForm';

export function transformProjectEnvironmentPrefilledData(
  data: FetchProjectEnvironmentQuery['projectEnvironment'],
): ProjectEnvironmentFormValues {
  return {
    environment: data.name,
    title: data.title ?? '',
    frontendCredentials: {
      url: data.frontendCredentials?.url ?? '',
      login: data.frontendCredentials?.login ?? '',
      password: data.frontendCredentials?.password ?? '',
    },
    backendCredentials: {
      url: data.backendCredentials?.url ?? '',
      login: data.backendCredentials?.login ?? '',
      password: data.backendCredentials?.password ?? '',
    },
  };
}
