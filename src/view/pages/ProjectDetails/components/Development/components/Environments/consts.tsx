import { createColumnHelper } from '@tanstack/react-table';
import omit from 'lodash/omit';
import React from 'react';

import { ProjectEnvironmentType } from '~/services/gql/__generated__/globalTypes';
import { CopyTextButton } from '~/view/components/CopyTextButton';

import { MoreCell } from './components/MoreCell';

const columnHelper = createColumnHelper<ProjectEnvironmentType>();

export const ENVIRONMENTS_TABLE_COLUMNS = [
  columnHelper.accessor('name', {
    id: 'name',
    header: 'Name',
  }),
  columnHelper.accessor('frontendCredentials', {
    id: 'frontendCredentials',
    header: 'Frontend credentials',
    cell: ({
      row: {
        original: { frontendCredentials },
      },
    }) => {
      const credentials = omit(frontendCredentials, ['__typename']);

      return (
        <div className="flex flex-col gap-2">
          {Object.entries(credentials).map(([key, value]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="font-semibold">{key[0].toUpperCase() + key.slice(1)} - </span>
              <div className="flex items-center gap-2">
                <span>{value}</span>
                <CopyTextButton value={value} />
              </div>
            </div>
          ))}
        </div>
      );
    },
  }),
  columnHelper.accessor('backendCredentials', {
    id: 'backendCredentials',
    header: 'Backend credentials',
    cell: ({
      row: {
        original: { backendCredentials },
      },
    }) => {
      const credentials = omit(backendCredentials, ['__typename']);

      return (
        <div className="flex flex-col gap-2">
          {Object.entries(credentials).map(([key, value]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="font-semibold">{key[0].toUpperCase() + key.slice(1)} - </span>
              <div className="flex items-center gap-2">
                <span>{value}</span>
                <CopyTextButton value={value} />
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
