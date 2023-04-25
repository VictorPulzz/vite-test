import { FetchProjectRepositoriesListQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

export type ProjectRepositoriesListResultType = Exclude<
  FetchProjectRepositoriesListQuery['projectRepositoryList'],
  undefined | null
>[number];
