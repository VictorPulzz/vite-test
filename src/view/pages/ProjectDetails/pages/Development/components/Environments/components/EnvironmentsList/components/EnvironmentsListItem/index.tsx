import { IconContainer } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC } from 'react';

import { ProjectEnvironmentType } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';
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

export const EnvironmentsListItem: FC<Props> = ({ environment, envRequest, variant }) => {
  const { canWriteProjectEnvs } = useUserPermissions();

  return (
    <>
      {variant === CardVariant.DEFAULT && environment && (
        <div className="p-5 border-solid border border-gray-5 rounded-xl">
          <div
            className={clsx(
              'flex items-center justify-between',
              (environment.notes || !!environment.credentials?.length) &&
                'border-solid border-b border-gray-5 pb-3',
            )}
          >
            <div className="flex items-center gap-2">
              <IconContainer name="code" className="w-9 h-9 bg-blue/10" iconClassName="w-5 h-5" />
              <div>
                <h2 className="text-p4 font-medium leading-none">
                  {convertUppercaseToReadable(environment.name)}
                  {environment.title && ` • ${environment.title}`}
                </h2>
                <span className="text-p5 text-gray-1 ">Credentials</span>
              </div>
            </div>
            {canWriteProjectEnvs && (
              <EnvironmentsListItemMenu
                id={environment.id}
                name={environment.name}
                title={environment.title || ''}
              />
            )}
          </div>
          {environment.notes && (
            <div className="mt-4">
              <span className="text-p6 text-gray-2">Notes</span>
              <p className="text-p5">{environment.notes}</p>
            </div>
          )}
          <EnvironmentСredentials data={environment.credentials || []} />
        </div>
      )}
      {variant === CardVariant.REQUEST && (
        <RequestCard title={envRequest?.environment ?? ''} icon="code" />
      )}
    </>
  );
};
