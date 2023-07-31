import { pick } from '@appello/common/lib/utils/object/pick';
import { Icon } from '@appello/web-ui';
import { IconContainer } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC, useMemo } from 'react';

import { Permission } from '~/constants/permissions';
import { ProjectIntegrationType } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { copyTextValue } from '~/utils/copyTextValue';
import { CopyTextButton } from '~/view/components/CopyTextButton';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { CardVariant } from '~/view/pages/ProjectDetails/consts';
import { RequestCard } from '~/view/pages/ProjectDetails/pages/Development/components/RequestCard';

import { IntegrationsListItemMenu } from './components/IntegrationsListItemMenu';
import { RequestIntegrationType } from './types';

interface Props {
  integration?: ProjectIntegrationType;
  integrationRequest?: RequestIntegrationType;
  variant: CardVariant;
}

const iconsByCredentialField: Record<string, string> = {
  url: 'url',
  login: 'login',
  password: 'password',
};

export const IntegrationsListItem: FC<Props> = ({ integration, integrationRequest, variant }) => {
  const canWriteProjectIntegrations = useHasAccess(Permission.WRITE_PROJECT_INTEGRATIONS);

  const mainIntegrationCredentialsData = useMemo(
    () =>
      integration?.credential ? pick(integration.credential, ['url', 'login', 'password']) : null,
    [integration],
  );

  const isEmptyMainIntegrationCredential = useMemo(
    () =>
      Object.values(mainIntegrationCredentialsData || {}).every(credential => credential === ''),
    [mainIntegrationCredentialsData],
  );

  const withBorderBottomCardHeader =
    isEmptyMainIntegrationCredential && integration?.keys?.length === 0;

  return (
    <>
      {variant === CardVariant.DEFAULT && (
        <div className="p-5 border-solid border border-gray-5 rounded-xl">
          <div
            className={clsx(
              'flex items-center justify-between gap-3',
              !withBorderBottomCardHeader && 'border-solid border-b border-gray-5 pb-3',
            )}
          >
            <div className="flex items-center gap-2">
              <IconContainer
                name="cloudConnection"
                className="w-10 h-10 bg-blue/10"
                iconClassName="w-5 h-5"
              />
              <div>
                <h2 className="text-p4 font-medium break-all">
                  {convertUppercaseToReadable(integration?.name ?? '')}
                </h2>
                <span className="text-p5 text-gray-1">
                  {convertUppercaseToReadable(integration?.environment ?? '')}
                </span>
              </div>
            </div>
            {canWriteProjectIntegrations && <IntegrationsListItemMenu />}
          </div>
          <div className="mt-3 grid grid-cols-2 justify-between gap-10">
            {!isEmptyMainIntegrationCredential && (
              <div>
                <span className="text-p5 text-gray-1">Main</span>
                <div className="mt-2 flex flex-col gap-3">
                  {Object.entries(mainIntegrationCredentialsData || {})?.map(([key, value]) => (
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
                        {value || '-'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!!integration?.keys?.length && (
              <div>
                <span className="text-p5 text-gray-1">Keys</span>
                <div className="mt-2 flex flex-col  gap-3">
                  {integration?.keys?.map(value => (
                    <div key={value.id} className="flex items-center gap-2">
                      <span className="text-p5 truncate">{value.title}</span>
                      <CopyTextButton value={value.value} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {variant === CardVariant.REQUEST && (
        <RequestCard title={integrationRequest?.integrationName ?? ''} icon="cloudConnection" />
      )}
    </>
  );
};
