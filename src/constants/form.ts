export const formErrors = {
  REQUIRED: 'This field is required',
  REQUIRED_QUESTION: 'This is a required question',
  INVALID_EMAIL: 'Invalid email address',
  PASSWORD_MISMATCH: 'Passwords should be the same',
  INVALID_PHONE_NUMBER: 'Invalid phone number',
  PASSWORD_MIN_LENGTH: 'Password should be at least 8 characters',
  INVALID_PASSWORD:
    'Password should contain latin letters and at least one uppercase letter, one lowercase letter, one special character and one numeric character',
  SHOULD_BE_IN_PAST: 'Date should be in the past',
  INVALID_RANGE: 'Invalid range',
  MAX_IMAGE_SIZE: 'Image size should be less than 2mb',
  SHOULD_BE_MOBILE: 'Should be a mobile phone number',
  SHOULD_BE_NUMBER: 'Should be a number',
  INVALID_ZIP_CODE: 'Invalid zip code',
  fieldMaxLength: (value: number): string => `Сannot be longer than ${value} characters`,
};
