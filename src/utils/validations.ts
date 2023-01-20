import { isValidPhoneNumber } from 'libphonenumber-js';
import { parsePhoneNumber } from 'libphonenumber-js/max';
import { z } from 'zod';

import { formErrors } from '~/constants/form';

export const passwordValidation = z
  .string()
  .min(8, formErrors.PASSWORD_MIN_LENGTH)
  .refine(value => {
    if (!value) return false;
    return /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[@$!%*#?&]).{8,}$/.test(value);
  }, formErrors.INVALID_PASSWORD);

export const phoneNumberValidation = z
  .string()
  .refine(value => {
    if (!value) return true;
    return isValidPhoneNumber(value, { defaultCountry: 'AU' });
  }, formErrors.INVALID_PHONE_NUMBER)
  .refine(value => {
    if (!value) return true;
    try {
      const phoneNumber = parsePhoneNumber(value, 'AU');
      const type = phoneNumber.getType();
      return type === 'MOBILE' || type === 'FIXED_LINE_OR_MOBILE';
    } catch (e) {
      return false;
    }
  }, formErrors.SHOULD_BE_MOBILE);

export const numberValidation = z
  .string()
  .refine(value => value === '' || !Number.isNaN(+value), formErrors.SHOULD_BE_NUMBER);

export const zipCodeValidation = z.string().refine(value => {
  return /^[0-9A-z\s-]+$/.test(value);
}, formErrors.INVALID_ZIP_CODE);
