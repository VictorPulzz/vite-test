import { TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/table-core';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { ProjectInitialUserSort } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

import { MoreCell } from '../components/MoreCell';
import { ProjectInitialUsersResultType } from '../types';

const columnHelper = createColumnHelper<ProjectInitialUsersResultType>();

export function useProjectInitialUsersTableColumns() {
  const { canReadUserDetails } = useUserPermissions();

  return [
    columnHelper.accessor('user', {
      id: ProjectInitialUserSort.FULLNAME,
      header: 'Name',
      cell: ctx => {
        const user = ctx.getValue();
        return (
          <div className="flex gap-3 items-center">
            <Avatar uri={user?.photoThumbnail?.url || photoPlaceholder} size={26} />
            {canReadUserDetails ? (
              <TextLink
                to={generatePath(ROUTES.USER_DETAILS, { id: user?.id })}
                className="underline"
              >
                {user?.fullName}
              </TextLink>
            ) : (
              <span>{user?.fullName}</span>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor('user.department', {
      id: ProjectInitialUserSort.DEPARTMENT,
      header: 'Department',
      cell: ctx => <span>{convertUppercaseToReadable(ctx.getValue()?.name ?? '')}</span>,
    }),
    columnHelper.accessor('user.email', {
      id: ProjectInitialUserSort.EMAIL,
      header: 'Email',
    }),
    columnHelper.group({
      id: 'more',
      cell: MoreCell,
      meta: {
        className: 'w-0',
      },
    }),
  ];
}
