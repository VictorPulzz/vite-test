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
        <Icon className="flex-shrink-0" color="#91919E" name="circleCode" size={18} />
        <h2 className="text-p5 font-medium">
          {convertUppercaseToReadable(credentials.type)}
          {credentials.shortDescription && <span> • {credentials.shortDescription}</span>}
        </h2>
      </div>
      <CredentialsItemField
        label="Link"
        type={CredentialsItemFieldType.URL}
        value={credentials.url || ''}
      />
      <CredentialsItemField
        label="Login"
        type={CredentialsItemFieldType.LOGIN}
        value={credentials.login || ''}
      />
      <CredentialsItemField
        label="Password"
        type={CredentialsItemFieldType.PASSWORD}
        value={credentials.password || ''}
      />
    </div>
  );
};
