import React, { FC, useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { Loader } from '~/view/ui/components/common/Loader';

import { useFetchUserDetailsQuery } from './__generated__/schema';
import { UserDetailsTabs } from './components/UserDetailsTabs';
import { UserMainInfo } from './components/UserMainInfo';

export const UserDetailsPage: FC = () => {
  const canEditUser = useHasAccess(Permission.EDIT_USER);

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
        onClickBackButton={() => navigate(-1)}
        rightHeaderElement={
          canEditUser && (
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
