import { TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { RequestSort } from '~/services/gql/__generated__/globalTypes';
import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import { useAppSelector } from '~/store/hooks';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';
import { TypeCell } from '~/view/pages/Requests/components/TypeCell';

import { AssignedTo, AssignedToVariant } from '../components/AssignedTo';
import { DueDate, DueDateVariant } from '../components/DueDate';
import { StatusCell } from '../components/StatusCell';
import { RequestResultType } from '../types';

const columnHelper = createColumnHelper<RequestResultType>();

export function useRequestsTableColumns() {
  const roleId = useAppSelector(state => state.user.profile?.role?.id);

  const { canReadUserDetails } = useUserPermissions();

  const { data: allUsers } = useFetchUserGlossaryListQuery({
    variables: {
      filters: { roleId: [Number(roleId)] },
    },
    fetchPolicy: 'cache-and-network',
  });

  return [
    columnHelper.accessor('type', {
      id: RequestSort.TYPE,
      header: 'Type',
      cell: TypeCell,
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      enableSorting: false,
      meta: {
        className: 'max-w-[300px] break-all',
      },
    }),
    columnHelper.accessor('assignedTo', {
      id: RequestSort.ASSIGNED_TO,
      header: 'Assigned to',
      cell: ctx => {
        const { id, status, assignedTo } = ctx.row.original;
        return (
          <AssignedTo
            allUsers={allUsers?.userGlossaryList.results ?? []}
            assignedTo={assignedTo}
            id={id}
            status={status}
            variant={AssignedToVariant.CELL}
          />
        );
      },
    }),
    columnHelper.accessor('createdBy', {
      id: RequestSort.CREATED_BY,
      header: 'Created By',
      cell: ctx => {
        const createdBy = ctx.getValue();
        return (
          <div className="flex gap-3 items-center">
            <Avatar size={26} uri={createdBy?.photoThumbnail?.url || photoPlaceholder} />
            {canReadUserDetails ? (
              <TextLink
                className="underline"
                to={generatePath(ROUTES.USER_DETAILS, { id: createdBy?.id })}
              >
                {createdBy?.fullName}
              </TextLink>
            ) : (
              <span>{createdBy?.fullName}</span>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor('createdAt', {
      id: RequestSort.CREATED_AT,
      header: 'Created at',
      cell: ctx => format(new Date(ctx.getValue()), DateFormat.D_MMM_Y),
    }),
    columnHelper.accessor('dueDate', {
      id: RequestSort.DUE_DATE,
      header: 'Due date',
      cell: ctx => {
        const { id, dueDate, status } = ctx.row.original;
        return (
          <DueDate dueDate={dueDate ?? ''} id={id} status={status} variant={DueDateVariant.CELL} />
        );
      },
    }),
    columnHelper.accessor('status', {
      id: RequestSort.STATUS,
      header: 'Status',
      cell: StatusCell,
    }),
  ];
}
