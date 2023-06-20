import { createProcessApiError } from '@appello/common/lib/services/api';
import { toast } from 'react-hot-toast';

export const processApiError = createProcessApiError({
  onGlobalError: toast.error,
  onUnknownErrors: toast.error,
});
