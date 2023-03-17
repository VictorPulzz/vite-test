import { createProcessGqlErrorResponse } from '@appello/common/lib/services/gql/utils';
import React from 'react';
import { toast } from 'react-hot-toast';

export const processGqlErrorResponse = createProcessGqlErrorResponse({
  onNonFieldError: toast.error,
  onUnhandledFieldErrors: errors => {
    toast.error(
      <ul>
        <li>Errors while processing operation:</li>
        {errors.map(({ name, value }) => (
          <li key={name}>
            {name}: {value}
          </li>
        ))}
      </ul>,
    );
  },
  onUnknownError: toast.error,
});
