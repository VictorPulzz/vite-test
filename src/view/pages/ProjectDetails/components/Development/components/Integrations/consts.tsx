import { pick } from '@appello/common/lib/utils/object/pick';
import { createColumnHelper } from '@tanstack/react-table';
import React, { Fragment } from 'react';

import { ProjectIntegrationType } from '~/services/gql/__generated__/globalTypes';
import { CopyTextButton } from '~/view/components/CopyTextButton';

import { MoreCell } from './components/MoreCell';

const columnHelper = createColumnHelper<ProjectIntegrationType>();

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
        <div className="flex gap-[30px]">
          {credentials?.map((credentialsItem, index) => (
            <div key={index} className="flex flex-col gap-1">
              {Object.entries(
                pick(credentialsItem, ['name', 'url', 'login', 'password', 'key']),
              ).map(([key, value]) => (
                <Fragment key={key}>
                  {value && (
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{key[0].toUpperCase() + key.slice(1)} -</span>
                      <div className="flex items-center gap-2">
                        <span>{value}</span>
                        {key !== 'name' && <CopyTextButton value={value as string} />}
                      </div>
                    </div>
                  )}
                </Fragment>
              ))}
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
