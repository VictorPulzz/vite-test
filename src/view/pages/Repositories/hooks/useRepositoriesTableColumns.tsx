import { Badge, BadgeColor, TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/table-core';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { RepositoryTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

import { MoreCell } from '../components/MoreCell';
import { RepositoryResultType } from '../types';

const columnHelper = createColumnHelper<RepositoryResultType>();

export function useRepositoriesTableColumns() {
  const { canWriteRepository } = useUserPermissions();

  return [
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Name',
      cell: ctx => {
        const { id, name } = ctx.row.original;
        return (
          <div>
            {name ? (
              <TextLink className="underline" to={generatePath(ROUTES.REPOSITORY_DETAILS, { id })}>
                {ctx.getValue()}
              </TextLink>
            ) : (
              <span className="text-red">Requested</span>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor('project.name', {
      id: 'project.name',
      header: 'Project',
      cell: ctx => {
        const { project } = ctx.row.original;
        return (
          <TextLink
            className="underline"
            to={generatePath(ROUTES.PROJECT_DETAILS, { id: project.id })}
          >
            {ctx.getValue()}
          </TextLink>
        );
      },
      meta: {
        className: 'w-[400px]',
      },
    }),
    columnHelper.accessor('technologies', {
      id: 'technologies',
      header: 'Technologies',
      cell: ctx => {
        const { technologies } = ctx.row.original;
        return (
          <div>
            {technologies?.map(({ id, name }, index) => [
              index > 0 && ', ',
              <span key={id}>{name}</span>,
            ])}
          </div>
        );
      },
    }),
    columnHelper.accessor('gitUrl', {
      id: 'gitUrl',
      header: 'Git url',
      cell: ctx => {
        const { gitUrl, inParticipant } = ctx.row.original;
        return (
          <div>
            {inParticipant && (
              <TextLink external className="underline" to={gitUrl ?? ''}>
                {gitUrl}
              </TextLink>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor('type', {
      id: 'type',
      header: 'Type',
      cell: ctx => {
        const type = ctx.getValue();
        return (
          <Badge
            color={type === RepositoryTypeChoice.FRONTEND ? BadgeColor.BLUE : BadgeColor.GREEN}
          >
            {convertUppercaseToReadable(type ?? '')}
          </Badge>
        );
      },
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: 'Created at',
      cell: ctx => format(new Date(ctx.getValue()), DateFormat.D_MMM_Y),
    }),
    columnHelper.group({
      id: 'more',
      enableHiding: !canWriteRepository,
      cell: MoreCell,
      meta: {
        className: 'w-0',
      },
    }),
  ];
}
