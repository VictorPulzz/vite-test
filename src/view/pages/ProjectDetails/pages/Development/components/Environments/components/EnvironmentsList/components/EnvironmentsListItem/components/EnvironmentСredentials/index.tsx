import { Icon } from '@appello/web-ui';
import React, { FC } from 'react';

import { EnvironmentCredentialsType } from '~/services/gql/__generated__/globalTypes';
import { copyTextValue } from '~/utils/copyTextValue';

interface Props {
  label: string;
  data: Nullable<Pick<EnvironmentCredentialsType, 'url' | 'login' | 'password'>>;
}

const iconsByCredentialField: Record<string, string> = {
  url: 'url',
  login: 'login',
  password: 'password',
};

export const EnvironmentСredentials: FC<Props> = ({ label, data }) => {
  return (
    <div>
      <span className="text-p5 text-gray-1">{label}</span>
      <div className="mt-2 flex flex-col gap-3">
        {Object.entries(data || {})?.map(([key, value]) => (
          <div key={key} className="flex items-center gap-1">
            <Icon
              name={iconsByCredentialField[key]}
              size={18}
              color="#6F6F75"
              className="flex-shrink-0"
            />
            <button
              type="button"
              onClick={() => copyTextValue(value ?? '')}
              className="text-p5 truncate hover:underline cursor-pointer"
            >
              {value === '' ? '-' : value}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
