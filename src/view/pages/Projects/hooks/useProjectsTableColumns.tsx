import { Badge, BadgeColor, TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { ProjectSort } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

import { MoreCell } from '../components/MoreCell';
import { ProjectResultType } from '../types';

const columnHelper = createColumnHelper<ProjectResultType>();

export function useProjectsTableColumns() {
  const { canReadUserDetails, canWriteProject } = useUserPermissions();

  return [
    columnHelper.accessor('name', {
      id: ProjectSort.NAME,
      header: 'Project name',
      cell: ctx => {
        const { id } = ctx.row.original;
        return (
          <div className="flex gap-3 items-center">
            <TextLink to={generatePath(ROUTES.PROJECT_DETAILS, { id })} className="underline">
              {ctx.getValue()}
            </TextLink>
          </div>
        );
      },
      meta: {
        className: 'w-[400px]',
      },
    }),
    columnHelper.accessor('PM', {
      id: 'PM',
      header: 'PM',
      enableSorting: false,
      cell: ctx => {
        return (
          <div>
            {ctx.getValue()?.map(pm => (
              <div key={pm.id} className="flex gap-3 items-center">
                <Avatar uri={pm.photoThumbnail?.url || photoPlaceholder} size={26} />
                {canReadUserDetails ? (
                  <TextLink
                    to={generatePath(ROUTES.USER_DETAILS, { id: pm.id })}
                    className="underline"
                  >
                    {pm.fullName}
                  </TextLink>
                ) : (
                  <span>{pm.fullName}</span>
                )}
              </div>
            ))}
          </div>
        );
      },
      meta: {
        className: 'min-w-[150px] whitespace-pre-wrap',
      },
    }),
    columnHelper.accessor('phase', {
      id: 'phase',
      header: 'Phase',
      enableSorting: false,
      cell: ctx => (
        <Badge color={BadgeColor.GREEN}>{convertUppercaseToReadable(ctx.getValue() ?? '')}</Badge>
      ),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: 'Status',
      enableSorting: false,
      cell: ctx => {
        return ctx.getValue() && <Badge color={BadgeColor.BLUE}>{ctx.getValue()?.name}</Badge>;
      },
    }),
    columnHelper.accessor('platforms', {
      id: 'platforms',
      header: 'Platform',
      enableSorting: false,
      cell: ctx => {
        const platforms = ctx.getValue();
        return (
          <div className="flex gap-2">
            {platforms?.map(platform => (
              <Badge key={platform.id} color={BadgeColor.BLUE}>
                {platform.name}
              </Badge>
            ))}
          </div>
        );
      },
    }),
    columnHelper.accessor('createdAt', {
      id: ProjectSort.CREATED_AT,
      header: 'Created at',
      cell: ctx => format(new Date(ctx.getValue()), DateFormat.D_MMM_Y),
      meta: {
        className: 'w-[110px]',
      },
    }),
    columnHelper.group({
      id: 'more',
      enableHiding: !canWriteProject,
      cell: MoreCell,
      meta: {
        className: 'w-0',
      },
    }),
  ];
}
