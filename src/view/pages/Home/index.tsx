import { Button, ButtonVariant } from '@ui/components/common/Button';
import React, { FC } from 'react';

import { useAppDispatch } from '~/store/hooks';
import { signOut } from '~/store/modules/user';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <SidebarLayout>
      <div className="p-5">
        <p className="mb-5">Home Page</p>
        <Button
          variant={ButtonVariant.PRIMARY}
          label="Sign out"
          onClick={() => dispatch(signOut())}
          className="w-[130px]"
        />
      </div>
    </SidebarLayout>
  );
};
