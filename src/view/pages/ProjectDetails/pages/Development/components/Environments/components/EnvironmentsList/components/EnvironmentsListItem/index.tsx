import { pick } from '@appello/common/lib/utils/object/pick';
import { Icon } from '@appello/web-ui';
import { IconContainer } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';

import { ProjectEnvironmentType } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { copyTextValue } from '~/utils/copyTextValue';
import { CardVariant } from '~/view/pages/ProjectDetails/consts';
import { RequestCard } from '~/view/pages/ProjectDetails/pages/Development/components/RequestCard';

import { EnvironmentsListItemMenu } from './components/EnvironmentsListItemMenu';
import { RequestEnvType } from './types';

interface Props {
  environment?: ProjectEnvironmentType;
  envRequest?: RequestEnvType;
  variant: CardVariant;
}

export const EnvironmentsListItem: FC<Props> = ({ environment, envRequest, variant }) => {
  const backendCredentialsData = useMemo(
    () =>
      environment?.backendCredentials
        ? pick(environment.backendCredentials, ['url', 'login', 'password'])
        : null,
    [environment?.backendCredentials],
  );

  const frontendCredentialsData = useMemo(
    () =>
      environment?.frontendCredentials
        ? pick(environment.frontendCredentials, ['url', 'login', 'password'])
        : null,
    [environment?.frontendCredentials],
  );

  return (
    <>
      {variant === CardVariant.DEFAULT && (
        <div className="p-5 border-solid border border-gray-5 rounded-xl">
          <div className="flex items-center justify-between border-solid border-b border-gray-5 pb-3">
            <div className="flex items-center gap-2">
              <IconContainer name="code" className="w-10 h-10 bg-blue/10" iconClassName="w-5 h-5" />
              <div>
                <h2 className="text-p4 font-medium">
                  {convertUppercaseToReadable(environment?.name ?? '')}
                </h2>
                <span className="text-p5 text-gray-1">Credentials</span>
              </div>
            </div>
            <EnvironmentsListItemMenu />
          </div>
          <div className="mt-3 grid grid-cols-2 justify-between gap-10">
            <div>
              <span className="text-p5 text-gray-1">Backend</span>
              <div className="mt-2 flex flex-col gap-3">
                {Object.entries(backendCredentialsData || {})?.map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1">
                    <Icon name={key} size={18} color="#6F6F75" className="flex-shrink-0" />
                    <button
                      type="button"
                      onClick={() => copyTextValue(value)}
                      className="text-p5 truncate hover:underline cursor-pointer"
                    >
                      {value}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-p5 text-gray-1">Frontend</span>
              <div className="mt-2 flex flex-col gap-3">
                {Object.entries(frontendCredentialsData || {})?.map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1">
                    <Icon name={key} size={18} color="#6F6F75" className="flex-shrink-0" />
                    <button
                      type="button"
                      onClick={() => copyTextValue(value)}
                      className="text-p5 truncate hover:underline cursor-pointer"
                    >
                      {value}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {variant === CardVariant.REQUEST && (
        <RequestCard title={envRequest?.environment ?? ''} icon="code" />
      )}
    </>
  );
};
