import { pick } from '@appello/common/lib/utils/object/pick';
import React, { FC, useMemo } from 'react';

import { ProjectIntegrationType } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { CopyTextButton } from '~/view/components/CopyTextButton';
import { Icon } from '~/view/ui/components/common/Icon';
import { IconContainer } from '~/view/ui/components/common/IconContainer';

import { IntegrationsListItemMenu } from './components/IntegrationsListItemMenu';

interface Props {
  integration: ProjectIntegrationType;
}

export const IntegrationsListItem: FC<Props> = ({ integration }) => {
  const mainIntegrationCredentialsData = useMemo(
    () =>
      integration.credential ? pick(integration.credential, ['url', 'login', 'password']) : null,
    [integration],
  );

  const isEmptyMainIntegrationCredential = Object.values(
    mainIntegrationCredentialsData || {},
  ).every(credential => credential === '');

  return (
    <div className="p-5 border-solid border border-gray-5 rounded-xl">
      <div className="flex items-center justify-between border-solid border-b border-gray-5 pb-3">
        <div className="flex items-center gap-2">
          <IconContainer name="code" className="w-10 h-10 bg-blue/10" iconClassName="w-5 h-5" />
          <div>
            <h2 className="text-p4 font-medium">{convertUppercaseToReadable(integration.name)}</h2>
            <span className="text-c1 text-gray-1">Dev</span>
          </div>
        </div>
        <IntegrationsListItemMenu />
      </div>
      <div className="mt-3 flex items-start justify-between">
        {!isEmptyMainIntegrationCredential && (
          <div>
            <span className="text-c1 text-gray-1">Main</span>
            <div className="mt-2 flex flex-col gap-3">
              {Object.entries(mainIntegrationCredentialsData || {})?.map(([key, value]) => (
                <div key={key} className="flex items-center gap-1">
                  <Icon name={key} size={18} color="#6F6F75" />
                  <span className="text-c1">{value || '-'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!!integration?.keys?.length && (
          <div>
            <span className="text-c1 text-gray-1">Keys</span>
            <div className="mt-2 flex flex-col items-end gap-3">
              {integration?.keys?.map(value => (
                <div key={value.id} className="flex items-center gap-2">
                  <span className="text-c1">{value.title}</span>
                  <CopyTextButton value={value.value} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
