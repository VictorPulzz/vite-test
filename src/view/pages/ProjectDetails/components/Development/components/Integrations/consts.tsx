import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

import { CopyTextButton } from '~/view/components/CopyTextButton';

import { MoreCell } from './components/MoreCell';

const columnHelper = createColumnHelper<any>();

export const INTEGRATIONS_TABLE_COLUMNS = [
  columnHelper.accessor('name', {
    id: 'name',
    header: 'Name',
  }),
  columnHelper.accessor('credentials', {
    id: 'credentials',
    header: 'Credentials',
    cell: ({
      row: {
        original: { credentials },
      },
    }) => {
      return (
        <div className="flex flex-col gap-2">
          {Object.entries(credentials).map(([key, value]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="font-semibold">
                {key[0].toUpperCase() +
                  key
                    .slice(1)
                    .replace(/([A-Z])/g, ' $1')
                    .trim()
                    .toLowerCase()}{' '}
                -
              </span>
              <div className="flex items-center gap-2">
                <span>{value as string}</span>
                <CopyTextButton value={value as string} />
              </div>
            </div>
          ))}
        </div>
      );
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
