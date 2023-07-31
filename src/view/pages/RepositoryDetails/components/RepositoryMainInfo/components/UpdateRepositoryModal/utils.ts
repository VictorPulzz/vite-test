import { FetchRepositoryDetailsQuery } from '~/view/pages/RepositoryDetails/__generated__/schema';

import { UpdateRepositoryFormValues } from './hooks/useUpdateRepositoryForm';

export function transformRepositoryPrefilledData(
  data: FetchRepositoryDetailsQuery['repository'],
): UpdateRepositoryFormValues {
  return {
    name: data.name ?? '',
    technologies: data.technologies?.map(technology => technology.id) ?? [],
  };
}
