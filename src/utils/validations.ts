import * as yup from 'yup';
import { StringSchema } from 'yup';
import { ObjectShape } from 'yup/lib/object';

import { formErrors } from '~/constants/form';

export function confirmPasswordValidation(password: string, confirm: string): ObjectShape {
  return {
    [password]: passwordValidation(),
    [confirm]: yup
      .string()
      .required(formErrors.REQUIRED)
      .test({
        message: formErrors.PASSWORD_MISMATCH,
        test: (value, { parent }) => parent[password] === value,
      }),
  };
}

export function passwordValidation(): StringSchema {
  return yup
    .string()
    .required(formErrors.REQUIRED)
    .min(8, formErrors.PASSWORD_MIN_LENGTH)
    .test({
      message: formErrors.INVALID_PASSWORD,
      test: value => {
        if (!value) return false;

        return /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(value);
      },
    });
}
