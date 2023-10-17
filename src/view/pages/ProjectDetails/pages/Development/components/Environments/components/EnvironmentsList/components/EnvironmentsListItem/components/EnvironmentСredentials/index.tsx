import React, { FC } from 'react';

import { EnvironmentCredentialsType } from '~/services/gql/__generated__/globalTypes';

import { EnvironmentСredentialsItem } from './components/EnvironmentСredentialsItem';

interface Props {
  data: EnvironmentCredentialsType[];
}

export const EnvironmentСredentials: FC<Props> = ({ data }) => {
  return (
    <div className="mt-2 max-h-[200px] overflow-auto pr-6">
      {data.map(credentials => (
        <EnvironmentСredentialsItem key={credentials.id} credentials={credentials} />
      ))}
    </div>
  );
};
