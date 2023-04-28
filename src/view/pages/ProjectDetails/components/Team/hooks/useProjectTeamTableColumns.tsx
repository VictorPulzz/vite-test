import { Button, ButtonVariant, TextLink } from '@appello/web-ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useHasAccess } from '~/view/hooks/useHasAccess';

import { ProjectMemberResultType } from '../../../types';
import { MoreCell } from '../components/MoreCell';

const columnHelper = createColumnHelper<ProjectMemberResultType>();

export enum TeamTableType {
  CURRENT_TEAM = 'CURRENT_TEAM',
  OTHER_CONTRIBUTORS = 'OTHER_CONTRIBUTORS',
}

export function useProjectTeamTableColumns(
  type: TeamTableType,
): ColumnDef<ProjectMemberResultType, string>[] {
  const canReadUserDetails = useHasAccess(Permission.READ_USER_DETAILS);
  const canWriteProjectTeam = useHasAccess(Permission.WRITE_PROJECT_TEAM);

  return [
    columnHelper.accessor('user.fullName', {
      id: 'fullName',
      header: 'Name',
      cell: ctx => {
        const { photo, fullName, id } = ctx.row.original.user;
        return (
          <div className="flex gap-3 items-center">
            <Avatar uri={photo?.url || photoPlaceholder} size={26} />
            {canReadUserDetails ? (
              <TextLink to={generatePath(ROUTES.USER_DETAILS, { id })} className="underline">
                {fullName}
              </TextLink>
            ) : (
              <span>{fullName}</span>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor(row => row?.user.role?.name, {
      id: 'role',
      header: 'Position',
    }),
    columnHelper.accessor('user.email', {
      id: 'email',
      header: 'Email',
    }),
    columnHelper.group({
      id: 'dates',
      header: 'Dates',
      cell: ctx => {
        const { startDate, endDate } = ctx.row.original;
        const formattedStartDate = format(new Date(startDate), DateFormat.D_MMM_Y);
        const formattedEndDate = endDate ? format(new Date(endDate), DateFormat.D_MMM_Y) : 'Now';

        return (
          <span>
            {formattedStartDate}-{formattedEndDate}
          </span>
        );
      },
    }),
    columnHelper.group({
      id: 'slack',
      cell: ctx => (
        <Button
          variant={ButtonVariant.SECONDARY}
          label="Slack"
          onClick={() => ctx}
          className="w-[100px]"
        />
      ),
      meta: {
        className: 'w-0',
      },
    }),
    columnHelper.group({
      id: 'more',
      enableHiding: !canWriteProjectTeam,
      cell: ctx => <MoreCell isCurrentTeam={type === TeamTableType.CURRENT_TEAM} ctx={ctx} />,
      meta: {
        className: 'w-0',
      },
    }),
  ];
}
