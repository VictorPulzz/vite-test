import { Nullable, UserAuth } from '@appello/common';

import { UserProfileModel } from '~/models/user';

export interface UserState {
  profile: Nullable<UserProfileModel>;
  auth: Nullable<UserAuth>;
}
