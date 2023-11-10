import { Button, ButtonVariant, TextLink } from '@appello/web-ui';
import { ColumnDef, createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

import { useFetchCreatedProjectSlackChannelsQuery } from '../../../__generated__/schema';
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
  const params = useParams();
  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  const { canReadUserDetails, canWriteProjectTeam } = useUserPermissions();

  const { data } = useFetchCreatedProjectSlackChannelsQuery({
    variables: {
      data: { id: projectId },
      filters: { slackCreatedOnly: true },
    },
  });

  return [
    columnHelper.accessor('user.fullName', {
      id: 'fullName',
      header: 'Name',
      cell: ctx => {
        const { photoThumbnail, fullName, id } = ctx.row.original.user;
        return (
          <div className="flex gap-3 items-center">
            <Avatar size={26} uri={photoThumbnail?.url || photoPlaceholder} />
            {canReadUserDetails ? (
              <TextLink className="underline" to={generatePath(ROUTES.USER_DETAILS, { id })}>
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
            {formattedStartDate} → {formattedEndDate}
          </span>
        );
      },
    }),
    columnHelper.group({
      id: 'slack',
      cell: ctx => {
        const teamMemberSlackUrl = ctx.row.original.user.slackUrl;
        return (
          <Button
            className="w-[100px]"
            label="Go to Slack"
            variant={ButtonVariant.SECONDARY}
            onClick={() => {
              if (teamMemberSlackUrl) {
                window.open(teamMemberSlackUrl, '_blank');
              }
            }}
          />
        );
      },
      meta: {
        className: 'w-0',
      },
    }),
    columnHelper.group({
      id: 'more',
      enableHiding: !canWriteProjectTeam,
      cell: ctx => (
        <MoreCell
          createdProjectSlackChannelsCount={data?.projectIntegrationPage.slackChannels?.length ?? 0}
          ctx={ctx}
          isCurrentTeam={type === TeamTableType.CURRENT_TEAM}
        />
      ),
      meta: {
        className: 'w-0',
      },
    }),
  ];
}
