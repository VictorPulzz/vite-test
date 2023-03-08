import { pick } from '@appello/common/lib/utils/object/pick';
import React, { FC, useMemo } from 'react';

import { ProjectEnvironmentType } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { Icon } from '~/view/ui/components/common/Icon';
import { IconContainer } from '~/view/ui/components/common/IconContainer';

import { EnvironmentsListItemMenu } from './components/EnvironmentsListItemMenu';

interface Props {
  environment: ProjectEnvironmentType;
}

export const EnvironmentsListItem: FC<Props> = ({
  environment: { name, backendCredentials, frontendCredentials },
}) => {
  const backendCredentialsData = useMemo(
    () => (backendCredentials ? pick(backendCredentials, ['url', 'login', 'password']) : null),
    [backendCredentials],
  );

  const frontendCredentialsData = useMemo(
    () => (frontendCredentials ? pick(frontendCredentials, ['url', 'login', 'password']) : null),
    [frontendCredentials],
  );

  return (
    <div className="p-5 border-solid border border-gray-5 rounded-xl">
      <div className="flex items-center justify-between border-solid border-b border-gray-5 pb-3">
        <div className="flex items-center gap-2">
          <IconContainer name="code" className="w-10 h-10 bg-blue/10" iconClassName="w-5 h-5" />
          <div>
            <h2 className="text-p4 font-medium">{convertUppercaseToReadable(name)}</h2>
            <span className="text-c1 text-gray-1">Credentials</span>
          </div>
        </div>
        <EnvironmentsListItemMenu />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <span className="text-c1 text-gray-1">Backend</span>
          <div className="mt-2 flex flex-col gap-3">
            {Object.entries(backendCredentialsData || {})?.map(([key, value]) => (
              <div key={key} className="flex items-center gap-1">
                <Icon name={key} size={18} color="#6F6F75" />
                <span className="text-c1">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-c1 text-gray-1">Frontend</span>
          <div className="mt-2 flex flex-col gap-3">
            {Object.entries(frontendCredentialsData || {})?.map(([key, value]) => (
              <div key={key} className="flex items-center gap-1">
                <Icon name={key} size={18} color="#6F6F75" />
                <span className="text-c1">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
