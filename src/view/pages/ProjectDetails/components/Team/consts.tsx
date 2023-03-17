import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { UserType } from '~/services/gql/__generated__/globalTypes';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { TextLink } from '~/view/ui/components/common/TextLink';

import { MoreCell } from './components/MoreCell';

const columnHelper = createColumnHelper<UserType>();

export const CURRENT_TEAM_TABLE_COLUMNS = [
  columnHelper.accessor('fullName', {
    id: 'fullName',
    header: 'Name',
    cell: ({
      row: {
        original: { photo, fullName, id },
      },
    }) => {
      return (
        <div className="flex gap-3 items-center">
          <Avatar uri={photo?.url || photoPlaceholder} size={26} />
          <TextLink to={generatePath(ROUTES.USER_DETAILS, { id })} className="underline">
            {fullName}
          </TextLink>
        </div>
      );
    },
  }),
  columnHelper.accessor(row => row?.role?.name, {
    id: 'role',
    header: 'Position',
  }),
  columnHelper.accessor('email', {
    id: 'email',
    header: 'Email',
  }),
  columnHelper.group({
    id: 'slack',
    cell: props => (
      <Button
        variant={ButtonVariant.SECONDARY}
        label="Slack"
        onClick={() => props}
        className="w-[100px]"
      />
    ),
    meta: {
      className: 'w-0',
    },
  }),
  columnHelper.group({
    id: 'more',
    cell: ctx => <MoreCell isCurrentTeam ctx={ctx} />,
    meta: {
      className: 'w-0',
    },
  }),
];

export const OTHER_CONTRUBUTORS_TABLE_COLUMNS = [
  ...CURRENT_TEAM_TABLE_COLUMNS.slice(0, CURRENT_TEAM_TABLE_COLUMNS.length - 1),
  columnHelper.group({
    id: 'more',
    cell: ctx => <MoreCell isCurrentTeam={false} ctx={ctx} />,
    meta: {
      className: 'w-0',
    },
  }),
];
