import { Nullable } from '@appello/common';
import { UserAuth } from '@appello/services';

import { UserProfileModel } from '~/models/user';

export interface UserState {
  profile: Nullable<UserProfileModel>;
  auth: Nullable<UserAuth>;
}
