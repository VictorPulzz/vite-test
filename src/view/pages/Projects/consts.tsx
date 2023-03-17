import { createColumnHelper } from '@tanstack/react-table';
import { TextLink } from '@ui/components/common/TextLink';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { StatusEnum } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { getBadgeByProjectStatus } from '~/utils/getBadgeByProjectStatus';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { Badge } from '~/view/ui/components/common/Badge';

import { MoreCell } from './components/MoreCell';
import { ProjectResultType } from './types';

const columnHelper = createColumnHelper<ProjectResultType>();

export const PROJECTS_TABLE_COLUMNS = [
  columnHelper.accessor('name', {
    id: 'name',
    header: 'Project name',
    cell: props => {
      const { id } = props.row.original;
      return (
        <div className="flex gap-3 items-center">
          <TextLink to={generatePath(ROUTES.PROJECT_DETAILS, { id })} className="underline">
            {props.getValue()}
          </TextLink>
        </div>
      );
    },
  }),
  columnHelper.accessor(row => (row.PM ? row.PM[0]?.fullName : 'PM'), {
    id: 'PM',
    header: 'PM',
    cell: props => {
      const isProjectHasPm = props.row.original.PM && props.row.original.PM[0];
      return (
        <div>
          {isProjectHasPm ? (
            <div>
              {props.row.original.PM?.map(pm => (
                <div key={pm.id} className="flex gap-3 items-center">
                  <Avatar uri={pm.photo?.url || photoPlaceholder} size={26} />
                  <TextLink
                    to={generatePath(ROUTES.USER_DETAILS, { id: pm.id })}
                    className="underline"
                  >
                    {pm.fullName}
                  </TextLink>
                </div>
              ))}
            </div>
          ) : (
            <span>-</span>
          )}
        </div>
      );
    },
  }),
  columnHelper.accessor('status', {
    id: 'status',
    header: 'Status',
    cell: props => {
      const value = convertUppercaseToReadable(props.getValue() as StatusEnum);
      return <Badge color={getBadgeByProjectStatus(props.getValue() as StatusEnum)}>{value}</Badge>;
    },
  }),
  columnHelper.group({
    id: 'more',
    cell: MoreCell,
    meta: {
      className: 'w-0',
    },
  }),
];