import { Badge, BadgeColor, TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useHasAccess } from '~/view/hooks/useHasAccess';

import { MoreCell } from '../components/MoreCell';
import { ProjectResultType } from '../types';

const columnHelper = createColumnHelper<ProjectResultType>();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export function useProjectsTableColumns() {
  const canReadUserDetails = useHasAccess(Permission.READ_USER_DETAILS);
  const canWriteProject = useHasAccess(Permission.WRITE_PROJECT);

  return [
    columnHelper.accessor('name', {
      id: 'name',
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
      cell: ctx => {
        return (
          <div>
            {ctx.getValue()?.map(pm => (
              <div key={pm.id} className="flex gap-3 items-center">
                <Avatar uri={pm.photo?.url || photoPlaceholder} size={26} />
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
    }),
    columnHelper.accessor('phase', {
      id: 'phase',
      header: 'Phase',
      cell: ctx => (
        <Badge color={BadgeColor.GREEN}>{convertUppercaseToReadable(ctx.getValue() ?? '')}</Badge>
      ),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: 'Status',
      cell: ctx => {
        return ctx.getValue() && <Badge color={BadgeColor.BLUE}>{ctx.getValue()?.name}</Badge>;
      },
    }),
    columnHelper.accessor('platforms', {
      id: 'platforms',
      header: 'Platform',
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
