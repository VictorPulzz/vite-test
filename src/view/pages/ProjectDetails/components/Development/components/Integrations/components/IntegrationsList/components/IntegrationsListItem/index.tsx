import { pick } from '@appello/common/lib/utils/object/pick';
import clsx from 'clsx';
import React, { FC, useMemo } from 'react';

import { ProjectIntegrationType } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { copyTextValue } from '~/utils/copyTextValue';
import { CopyTextButton } from '~/view/components/CopyTextButton';
import { RequestCard } from '~/view/pages/ProjectDetails/components/Development/components/RequestCard';
import { CardVariant } from '~/view/pages/ProjectDetails/consts';
import { Icon } from '~/view/ui/components/common/Icon';
import { IconContainer } from '~/view/ui/components/common/IconContainer';

import { IntegrationsListItemMenu } from './components/IntegrationsListItemMenu';

interface Props {
  integration: ProjectIntegrationType;
  variant?: CardVariant;
}

export const IntegrationsListItem: FC<Props> = ({ integration, variant = CardVariant.DEFAULT }) => {
  const mainIntegrationCredentialsData = useMemo(
    () =>
      integration.credential ? pick(integration.credential, ['url', 'login', 'password']) : null,
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
              <IconContainer name="code" className="w-10 h-10 bg-blue/10" iconClassName="w-5 h-5" />
              <div>
                <h2 className="text-p4 font-medium break-all">
                  {convertUppercaseToReadable(integration.name)}
                </h2>
                <span className="text-c1 text-gray-1">
                  {convertUppercaseToReadable(integration.environment ?? '')}
                </span>
              </div>
            </div>
            <IntegrationsListItemMenu />
          </div>
          <div className="mt-3 grid grid-cols-2 justify-between gap-10">
            {!isEmptyMainIntegrationCredential && (
              <div>
                <span className="text-c1 text-gray-1">Main</span>
                <div className="mt-2 flex flex-col gap-3">
                  {Object.entries(mainIntegrationCredentialsData || {})?.map(([key, value]) => (
                    <div key={key} className="flex items-center gap-1">
                      <Icon name={key} size={18} color="#6F6F75" className="flex-shrink-0" />
                      <button
                        type="button"
                        onClick={() => copyTextValue(value ?? '')}
                        className="text-c1 truncate hover:underline cursor-pointer"
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
                <span className="text-c1 text-gray-1">Keys</span>
                <div className="mt-2 flex flex-col  gap-3">
                  {integration?.keys?.map(value => (
                    <div key={value.id} className="flex items-center gap-2">
                      <span className="text-c1 truncate">{value.title}</span>
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
        <RequestCard title={integration.name} icon="integration" />
      )}
    </>
  );
};
