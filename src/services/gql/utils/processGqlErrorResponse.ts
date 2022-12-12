import { createProcessGqlErrorResponse } from '@appello/common/lib/services/gql/utils';
import { toast } from 'react-hot-toast';

export const processGqlErrorResponse = createProcessGqlErrorResponse({
  onNonFieldError: toast.error,
  onUnhandledFieldErrors: toast.error,
  onUnknownError: toast.error,
});
