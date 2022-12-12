import { UserAuth } from '@appello/common/lib/types';

import { UserProfileModel } from '~/models/user';

export interface AuthResponse extends UserAuth {
  user: UserProfileModel;
}

export interface SignInVariables {
  email: string;
  password: string;
}
