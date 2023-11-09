import { useSwitchValue } from '@appello/common/lib/hooks';
import { Icon } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC, useCallback, useMemo } from 'react';

import { copyTextValue } from '~/utils/copyTextValue';

export enum CredentialsItemFieldType {
  URL = 'URL',
  LOGIN = 'LOGIN',
  PASSWORD = 'PASSWORD',
}

interface Props {
  label: string;
  value: string;
  type: CredentialsItemFieldType;
}

export const CredentialsItemField: FC<Props> = ({ label, value, type }) => {
  const { value: isPasswordVisible, toggle: togglePasswordVisibility } = useSwitchValue(false);

  const transformCredentialsPassword = useCallback(
    (password: string) => (isPasswordVisible ? password : [...password].map(() => '•').join('')),
    [isPasswordVisible],
  );

  const { credValue, onClick } = useMemo(() => {
    switch (true) {
      case type === CredentialsItemFieldType.URL || type === CredentialsItemFieldType.LOGIN:
        return { credValue: value === '' ? '-' : value, onClick: () => copyTextValue(value) };
      case type === CredentialsItemFieldType.PASSWORD:
        return {
          credValue: value === '' ? '-' : transformCredentialsPassword(value || ''),
          onClick: () => copyTextValue(isPasswordVisible ? value || '' : ''),
        };
      default:
        return {};
    }
  }, [isPasswordVisible, transformCredentialsPassword, type, value]);

  const credentialsValue = useMemo((): React.ReactNode => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          'text-p6 truncate text-left cursor-pointer',
          value !== '' && 'hover:underline',
          !isPasswordVisible && type === CredentialsItemFieldType.PASSWORD && 'hover:no-underline',
        )}
      >
        {credValue}
      </button>
    );
  }, [credValue, isPasswordVisible, onClick, type, value]);

  return (
    <div className="flex flex-col">
      <span className="text-p6 text-gray-2">{label}</span>
      <div className="flex items-center gap-2">
        {credentialsValue}
        {type === CredentialsItemFieldType.PASSWORD && value !== '' && (
          <button type="button" onClick={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? 'eye' : 'eye-crossed'}
              size={14}
              className="flex-shrink-0 cursor-pointer"
            />
          </button>
        )}
      </div>
    </div>
  );
};
