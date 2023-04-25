import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { Button, ButtonVariant, Icon } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC } from 'react';

import { RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';

import { NewRequestModal } from '../NewRequestModal';

export enum NoAccessMessageVariant {
  MESSAGE = 'MESSAGE',
  REQUEST = 'REQUEST',
}

interface Props {
  variant?: NoAccessMessageVariant;
  className?: string;
  title?: string;
  requestType?: RequestTypeChoice;
  projectId?: number;
  repositoryId?: number;
}

export const NoAccessMessage: FC<Props> = ({
  className,
  title,
  variant = NoAccessMessageVariant.MESSAGE,
  requestType,
  projectId,
  repositoryId,
}) => {
  const {
    value: isNewRequestModalOpen,
    on: openNewRequestModal,
    off: closeNewRequestModal,
  } = useSwitchValue(false);

  return (
    <div className={clsx('flex flex-col items-center justify-center', className)}>
      <div className="p-10 rounded-full bg-blue/10 mb-2">
        <Icon name="lock" size={38} className="m-auto text-blue" />
      </div>
      <h1 className="text-h4">You have no access to this section</h1>
      {variant === NoAccessMessageVariant.REQUEST && (
        <>
          <p className="pt-2 text-p3 text-center text-gray-1">
            You can view <span className="text-primary font-semibold">{title}</span> once
            <br /> your request is approved
          </p>
          <Button
            variant={ButtonVariant.PRIMARY}
            onClick={openNewRequestModal}
            label="Request access"
            className="mt-6 w-[300px]"
          />
          {isNewRequestModalOpen && (
            <NewRequestModal
              isOpen={isNewRequestModalOpen}
              close={closeNewRequestModal}
              requestType={requestType}
              projectId={projectId}
              repositoryId={repositoryId}
            />
          )}
        </>
      )}
    </div>
  );
};
