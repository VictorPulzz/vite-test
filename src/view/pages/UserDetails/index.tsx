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
        title="User details"
        rightHeaderElement={
          canWriteUser && (
            <Button
              variant={ButtonVariant.SECONDARY}
              label="Edit user"
              className="w-36"
              withIcon="edit"
              onClick={() => navigate(generatePath(ROUTES.EDIT_USER, { id: userId }))}
            />
          )
        }
        contentClassName="flex-auto"
      >
        {loading && (
          <div className="flex h-full items-center">
            <Loader full colorful />
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
