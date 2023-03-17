import { Button, ButtonVariant } from '@ui/components/common/Button';
import React from 'react';

import { useAppDispatch } from '~/store/hooks';
import { signOut } from '~/store/modules/user';

export const ErrorBoundaryPage: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex-center flex-1 flex-col bg-primary pt-12">
      <div className="flex-center flex-1 flex-col">
        <h1 className="text-h1 text-center text-white">Oops! Something went wrong</h1>
        <p className="text-p4 mt-2 text-center text-white/80">
          Refresh the page, log out or try again later.
        </p>
        <div className="mt-6 flex gap-3">
          <Button
            variant={ButtonVariant.PRIMARY}
            label="Refresh page"
            onClick={() => window.location.reload()}
            className="!w-48"
          />
          <Button
            variant={ButtonVariant.PRIMARY}
            label="Log out"
            withIcon="logout"
            onClick={() => dispatch(signOut())}
            className="!w-48"
          />
        </div>
      </div>
    </div>
  );
};
