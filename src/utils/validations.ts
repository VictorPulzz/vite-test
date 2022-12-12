import { z } from 'zod';

import { formErrors } from '~/constants/form';

export function passwordValidation(): z.ZodType<string> {
  return z
    .string()
    .min(8, formErrors.PASSWORD_MIN_LENGTH)
    .refine(value => {
      if (!value) return false;
      return /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(value);
    }, formErrors.INVALID_PASSWORD);
}
