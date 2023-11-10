import { Button, ButtonVariant } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useFetchUserDetailsQuery } from './__generated__/schema';
import { UserDetailsTabs } from './components/UserDetailsTabs';
import { UserMainInfo } from './components/UserMainInfo';

export const UserDetailsPage: FC = () => {
  const { canWriteUser } = useUserPermissions();

  const navigate = useNavigate();
  const params = useParams();
  const userId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const { data, loading } = useFetchUserDetailsQuery({
    variables: {
      input: { id: userId },
    },
  });

  return (
    <SidebarLayout>
      <DetailLayout
        contentClassName="flex-auto"
        rightHeaderElement={
          canWriteUser && (
            <Button
              className="w-36"
              label="Edit user"
              variant={ButtonVariant.SECONDARY}
              withIcon="edit"
              onClick={() => navigate(generatePath(ROUTES.EDIT_USER, { id: userId }))}
            />
          )
        }
        title="User details"
      >
        {loading && (
          <div className="flex h-full items-center">
            <Loader colorful full />
          </div>
        )}
        {data && (
          <div className="flex gap-5 p-6 h-full">
            <UserMainInfo user={data.userDetails} />
            <UserDetailsTabs userId={userId} />
          </div>
        )}
      </DetailLayout>
    </SidebarLayout>
  );
};
