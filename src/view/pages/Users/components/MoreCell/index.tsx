// import { getGqlError } from '@appello/common/lib/services/gql/utils';
import { CellContext } from '@tanstack/table-core';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC } from 'react';

import { Icon } from '~/view/ui/components/common/Icon';

// import { useChangeClientStatusMutation } from '~/view/pages/ClientsList/__generated__/schema';
// import { ProjectResultType } from '../../types';

// TODO need to fix this cell
// TODO remove any
export const MoreCell: FC<CellContext<any, unknown>> = ({ row }) => {
  // TODO remove console.log
  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: index.tsx:13 ~ row', row);
  // const { user } = row.original;

  // const [changeStatus] = useChangeClientStatusMutation();

  // const setActiveStatus = useCallback(
  //   (isActive: boolean) => {
  //     toast.promise(
  //       changeStatus({
  //         variables: {
  //           input: { id, isActive },
  //         },
  //       }),
  //       {
  //         loading: 'Changing status...',
  //         success: 'Status changed',
  //         error: e => {
  //           const errors = getGqlError(e?.graphQLErrors);
  //           return `Error while changing status: ${JSON.stringify(errors)}`;
  //         },
  //       },
  //     );
  //   },
  //   [changeStatus, id],
  // );

  const options: DropdownItem[] = [
    {
      label: 'Change status',
      iconBefore: <Icon name="connection" size={16} />,
      items: [
        {
          label: 'Active',
          // onSelect: () => setActiveStatus(true),
          onSelect: () => null,
          // iconAfter: user.isActive && <Icon name="check" className="text-green" size={18} />,
        },
        {
          label: 'Inactive',
          // onSelect: () => setActiveStatus(false),
          onSelect: () => null,
          // iconAfter: !user.isActive && <Icon name="check" className="text-green" size={18} />,
        },
      ],
    },
  ];

  return (
    <Dropdown items={options} containerWidth="14.93rem">
      {({ onClick }) => (
        <button type="button" onClick={onClick}>
          <Icon name="menu" size={16} />
        </button>
      )}
    </Dropdown>
  );
};
