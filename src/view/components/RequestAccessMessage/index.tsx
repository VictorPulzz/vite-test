import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { Button, ButtonVariant } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC } from 'react';

import { RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';

import { NewRequestModal } from '../NewRequestModal';
import { NoAccessMessage } from '../NoAccessMessage';

interface Props {
  className?: string;
  title: string;
  requestType: RequestTypeChoice;
  projectId?: Nullable<number>;
  repositoryId?: number;
}

export const RequestAccessMessage: FC<Props> = ({
  className,
  title,
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
      <NoAccessMessage />
      <p className="pt-2 text-p3 text-center text-gray-1">
        You can view <span className="text-primary font-semibold">{title}</span> once
        <br /> your request is approved
      </p>
      <Button
        className="mt-6 w-[300px]"
        label="Request access"
        variant={ButtonVariant.PRIMARY}
        onClick={openNewRequestModal}
      />
      {isNewRequestModalOpen && (
        <NewRequestModal
          close={closeNewRequestModal}
          isOpen={isNewRequestModalOpen}
          projectId={projectId}
          repositoryId={repositoryId}
          requestType={requestType}
        />
      )}
    </div>
  );
};
