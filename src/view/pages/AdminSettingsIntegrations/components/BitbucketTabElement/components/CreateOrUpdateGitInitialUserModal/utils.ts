import { FetchGitInitialUserDetailsQuery } from '~/view/pages/AdminSettingsIntegrations/__generated__/schema';

import { GitInitialUserFormValues } from './hooks/useGitInitialUserForm';

export function transformGitInitialUserPrefilledData(
  data: FetchGitInitialUserDetailsQuery['gitInitialUserDetails'],
): GitInitialUserFormValues {
  return {
    userId: data.user.id,
    accessLevel: data.accessLevel,
  };
}
