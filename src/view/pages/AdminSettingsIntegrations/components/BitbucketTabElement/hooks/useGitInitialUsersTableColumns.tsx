import { TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/table-core';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { GitInitialUserSort } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useHasAccess } from '~/view/hooks/useHasAccess';

import { MoreCell } from '../components/MoreCell';
import { GitInitialUsersResultType } from '../types';

const columnHelper = createColumnHelper<GitInitialUsersResultType>();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export function useGitInitialUsersTableColumns() {
  const canReadUserDetails = useHasAccess(Permission.READ_USER_DETAILS);

  return [
    columnHelper.accessor('user', {
      id: GitInitialUserSort.FULLNAME,
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
    columnHelper.accessor('accessLevel', {
      id: GitInitialUserSort.ACCESSLEVEL,
      header: 'Access level',
      cell: ctx => <span>{convertUppercaseToReadable(ctx.getValue() ?? '')}</span>,
    }),
    columnHelper.accessor('user.department', {
      id: GitInitialUserSort.DEPARTMENT,
      header: 'Department',
      cell: ctx => <span>{convertUppercaseToReadable(ctx.getValue()?.name ?? '')}</span>,
    }),
    columnHelper.accessor('user.email', {
      id: GitInitialUserSort.EMAIL,
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
