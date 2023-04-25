import { TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { useHasAccess } from '~/view/hooks/useHasAccess';

import { ProjectRepositoriesListResultType } from '../types';

const columnHelper = createColumnHelper<ProjectRepositoriesListResultType>();
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export function useDevelopmentReposTableColumns() {
  const canReadRepoDetails = useHasAccess(Permission.READ_REPO_DETAILS);

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
    columnHelper.accessor('type', {
      id: 'type',
      header: 'Type',
      cell: ctx => <span>{convertUppercaseToReadable(ctx.getValue() ?? '')}</span>,
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
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: 'Created at',
      cell: ctx => <span>{format(new Date(ctx.getValue()), DateFormat.D_MMM_Y)}</span>,
    }),
  ];
}
