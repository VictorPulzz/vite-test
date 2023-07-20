import { pick } from '@appello/common/lib/utils/object/pick';
import { IconContainer } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';

import { Permission } from '~/constants/permissions';
import { ProjectEnvironmentType } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { CardVariant } from '~/view/pages/ProjectDetails/consts';
import { RequestCard } from '~/view/pages/ProjectDetails/pages/Development/components/RequestCard';

import { EnvironmentsListItemMenu } from './components/EnvironmentsListItemMenu';
import { EnvironmentСredentials } from './components/EnvironmentСredentials';
import { RequestEnvType } from './types';

interface Props {
  environment?: ProjectEnvironmentType;
  envRequest?: RequestEnvType;
  variant: CardVariant;
}

export enum EnvironmentCredentialsType {
  FRONT_END = 1,
  BACK_END = 2,
}

export const EnvironmentsListItem: FC<Props> = ({ environment, envRequest, variant }) => {
  const canWriteProjectEnvs = useHasAccess(Permission.WRITE_PROJECT_ENVS);

  const frontendCredentialsData = useMemo(
    () =>
      environment?.frontendCredentials
        ? pick(environment.frontendCredentials, ['url', 'login', 'password'])
        : null,
    [environment?.frontendCredentials],
  );

  const backendCredentialsData = useMemo(
    () =>
      environment?.backendCredentials
        ? pick(environment.backendCredentials, ['url', 'login', 'password'])
        : null,
    [environment?.backendCredentials],
  );

  return (
    <>
      {variant === CardVariant.DEFAULT && environment && (
        <div className="p-5 border-solid border border-gray-5 rounded-xl">
          <div className="flex items-center justify-between border-solid border-b border-gray-5 pb-3">
            <div className="flex items-center gap-2">
              <IconContainer name="code" className="w-10 h-10 bg-blue/10" iconClassName="w-5 h-5" />
              <div>
                <h2 className="text-p4 font-medium">
                  {convertUppercaseToReadable(environment?.name ?? '')} {environment.title}
                </h2>
                <span className="text-p5 text-gray-1">Credentials</span>
              </div>
            </div>
            {canWriteProjectEnvs && (
              <EnvironmentsListItemMenu id={environment.id} name={environment.name} />
            )}
          </div>
          <div className="mt-3 grid grid-cols-2 justify-between gap-10">
            <EnvironmentСredentials label="Frontend" data={frontendCredentialsData} />
            <EnvironmentСredentials label="Backend" data={backendCredentialsData} />
          </div>
        </div>
      )}
      {variant === CardVariant.REQUEST && (
        <RequestCard title={envRequest?.environment ?? ''} icon="code" />
      )}
    </>
  );
};
