import { Badge, BadgeColor, TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { RepositoryTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { useHasAccess } from '~/view/hooks/useHasAccess';

import { MoreCell } from '../components/MoreCell';
import { RepositoryResultType } from '../types';

const columnHelper = createColumnHelper<RepositoryResultType>();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export function useRepositoriesTableColumns() {
  const canReadRepoDetails = useHasAccess(Permission.READ_REPO_DETAILS);
  const canWriteRepository = useHasAccess(Permission.WRITE_REPOSITORY);

  return [
    columnHelper.accessor('name', {
      id: 'name',
      header: 'Name',
      cell: ctx => {
        const { id, name } = ctx.row.original;
        return (
          <div>
            {canReadRepoDetails ? (
              <div>
                {name ? (
                  <TextLink
                    to={generatePath(ROUTES.REPOSITORY_DETAILS, { id })}
                    className="underline"
                  >
                    {ctx.getValue()}
                  </TextLink>
                ) : (
                  <span className="text-red">Requested</span>
                )}
              </div>
            ) : (
              <div>
                {name ? <span>{ctx.getValue()}</span> : <span className="text-red">Requested</span>}
              </div>
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
            to={generatePath(ROUTES.PROJECT_DETAILS, { id: project.id })}
            className="underline"
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
        const gitUrl = ctx.getValue();
        return (
          <TextLink external to={gitUrl ?? ''} className="underline">
            {gitUrl}
          </TextLink>
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
