import { TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { RequestSort } from '~/services/gql/__generated__/globalTypes';
import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { TypeCell } from '~/view/pages/Requests/components/TypeCell';

import { AssignedTo, AssignedToVariant } from '../components/AssignedTo';
import { DueDate, DueDateVariant } from '../components/DueDate';
import { StatusCell } from '../components/StatusCell';
import { RequestResultType } from '../types';

const columnHelper = createColumnHelper<RequestResultType>();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export function useRequestsTableColumns() {
  const canReadUserDetails = useHasAccess(Permission.READ_USER_DETAILS);

  const { data: allUsers } = useFetchUserGlossaryListQuery({
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
            variant={AssignedToVariant.CELL}
            allUsers={allUsers?.userGlossaryList.results ?? []}
            id={id}
            status={status}
            assignedTo={assignedTo}
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
            <Avatar uri={createdBy?.photo?.url || photoPlaceholder} size={26} />
            {canReadUserDetails ? (
              <TextLink
                to={generatePath(ROUTES.USER_DETAILS, { id: createdBy?.id })}
                className="underline"
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
          <DueDate variant={DueDateVariant.CELL} id={id} dueDate={dueDate ?? ''} status={status} />
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
