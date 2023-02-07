import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { TextLink } from '~/view/ui/components/common/TextLink';

import { MoreCell } from './components/MoreCell';
// TODO ad type
const columnHelper = createColumnHelper<any>();

export const TEAM_TABLE_COLUMNS = [
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
    cell: ({
      row: {
        original: { slack },
      },
    }) => (
      <Button
        variant={ButtonVariant.SECONDARY}
        label="Slack"
        onClick={() => slack}
        className="w-[100px]"
      />
    ),
    meta: {
      className: 'w-0',
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
