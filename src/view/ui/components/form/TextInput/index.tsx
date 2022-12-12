import clsx from 'clsx';
import * as React from 'react';
import { useMemo } from 'react';

import formStyles from '../styles.module.scss';

export interface TextInputProps
  extends Omit<React.AllHTMLAttributes<HTMLInputElement>, 'autoComplete' | 'size'> {
  error?: boolean;
  autoComplete?: boolean | string;
  size?: InputSize;
}

export enum InputSize {
  MEDIUM = 'medium',
  LARGE = 'large',
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      placeholder,
      autoComplete,
      error = false,
      size = InputSize.MEDIUM,
      type = 'text',
      ...inputProps
    },
    ref,
  ) => {
    const autoCompleteAttribute = useMemo(() => {
      if (typeof autoComplete === 'boolean') {
        return autoComplete ? undefined : 'off';
      }
      return autoComplete;
    }, [autoComplete]);

    return (
      <input
        ref={ref}
        className={clsx(
          className,
          formStyles['form__input'],
          formStyles[`form__input--size-${size}`],
          {
            [`${formStyles['form__input--error']}`]: Boolean(error),
          },
        )}
        placeholder={placeholder}
        autoComplete={autoCompleteAttribute}
        type={type}
        {...inputProps}
      />
    );
  },
);
