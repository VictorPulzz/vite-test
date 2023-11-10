import { Button, ButtonVariant } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '~/constants/routes';

import { NoAccessMessage } from '../NoAccessMessage';

interface Props {
  className?: string;
}

export const NoAccessPage: FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className={clsx('flex flex-col items-center justify-center h-full flex-auto', className)}>
      <NoAccessMessage />
      <Button
        className="mt-6 w-[300px]"
        label="Go to home page"
        variant={ButtonVariant.PRIMARY}
        onClick={() => navigate(ROUTES.HOME)}
      />
    </div>
  );
};
