// import { getGqlError } from '@appello/common/lib/services/gql/utils';
import { CellContext } from '@tanstack/table-core';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC } from 'react';

import { StatusEnum } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { Icon } from '~/view/ui/components/common/Icon';

import { ProjectResultType } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MoreCell: FC<CellContext<ProjectResultType, unknown>> = ({ row }) => {
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
  // TODO add changeStatus mutation
  const options: DropdownItem[] = [
    {
      label: 'Change status',
      iconBefore: <Icon name="connection" size={16} />,
      items: Object.keys(StatusEnum).map(status => ({
        label: convertUppercaseToReadable(status),
        onSelect: () => status,
      })),
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
