import { Icon } from '@appello/web-ui';
import React, { FC } from 'react';

import { EnvironmentCredentialsType } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';

import { CredentialsItemField, CredentialsItemFieldType } from './components/CredentialsItemField';

interface Props {
  credentials: EnvironmentCredentialsType;
}

export const EnvironmentСredentialsItem: FC<Props> = ({ credentials }) => {
  return (
    <div className="grid grid-cols-4 gap-x-10 border-solid border-b last:border-b-0 border-gray-5 py-3">
      <div className="flex items-center gap-1">
        <Icon name="circleCode" size={18} color="#91919E" className="flex-shrink-0" />
        <h2 className="text-p5 font-medium truncate">
          {convertUppercaseToReadable(credentials.type)}
          {credentials.shortDescription && <span> • {credentials.shortDescription}</span>}
        </h2>
      </div>
      <CredentialsItemField
        label="Link"
        value={credentials.url || ''}
        type={CredentialsItemFieldType.URL}
      />
      <CredentialsItemField
        label="Login"
        value={credentials.login || ''}
        type={CredentialsItemFieldType.LOGIN}
      />
      <CredentialsItemField
        label="Password"
        value={credentials.password || ''}
        type={CredentialsItemFieldType.PASSWORD}
      />
    </div>
  );
};
