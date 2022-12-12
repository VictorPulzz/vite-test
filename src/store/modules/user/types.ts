import { UserAuth } from '@appello/common/lib/types';

import { UserProfileModel } from '~/models/user';

export interface UserState {
  profile: Nullable<UserProfileModel>;
  auth: Nullable<UserAuth>;
}
