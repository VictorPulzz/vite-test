import { getGqlError } from '@appello/common/lib/services/gql/utils/getGqlError';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { useChangeUserStatusMutation } from '../../__generated__/schema';
import { UserResultType } from '../../types';

export const MoreCell: FC<CellContext<UserResultType, unknown>> = ({ row }) => {
  const { isActive, id } = row.original;

  const [changeStatus] = useChangeUserStatusMutation();

  const setActiveStatus = useCallback(
    (isActive: boolean) => {
      toast.promise(
        changeStatus({
          variables: {
            input: { id: Number(id), isActive },
          },
        }),
        {
          loading: 'Changing status...',
          success: 'Status changed',
          error: e => {
            const errors = getGqlError(e?.graphQLErrors);
            return `Error while changing status: ${JSON.stringify(errors)}`;
          },
        },
      );
    },
    [changeStatus, id],
  );

  const options: DropdownItem[] = [
    {
      label: 'Change status',
      iconBefore: <Icon name="connection" size={16} />,
      items: [
        {
          label: 'Active',
          onSelect: () => setActiveStatus(true),
          iconAfter: isActive && <Icon name="check" className="text-green" size={18} />,
        },
        {
          label: 'Inactive',
          onSelect: () => setActiveStatus(false),
          iconAfter: !isActive && <Icon name="check" className="text-green" size={18} />,
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
