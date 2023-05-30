import { ContractChoice } from '~/services/gql/__generated__/globalTypes';

import { FetchUserDetailsQuery } from '../UserDetails/__generated__/schema';
import { UserFormValues } from './hooks/useUserForm';

export function transformUserPrefilledData(
  data: FetchUserDetailsQuery['userDetails'],
): UserFormValues {
  return {
    photo: data?.photoThumbnail?.url as string,
    firstName: data.firstName as string,
    lastName: data.lastName as string,
    email: data.email,
    department: data.department?.id as number,
    role: data.role?.id as number,
    address: data.address as string,
    contractType: data.contractType as ContractChoice,
    birthDate: new Date(data.birthDate as string),
    isActive: data.isActive as boolean,
  };
}
