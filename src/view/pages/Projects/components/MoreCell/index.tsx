import { getGqlError } from '@appello/common/lib/services/gql/utils/getGqlError';
import { CellContext } from '@tanstack/table-core';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { StatusEnum } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { Icon } from '~/view/ui/components/common/Icon';

import { useChangeProjectStatusMutation } from '../../__generated__/schema';
import { ProjectResultType } from '../../types';

export const MoreCell: FC<CellContext<ProjectResultType, unknown>> = ({ row }) => {
  const { id, status } = row.original;

  const [changeStatus] = useChangeProjectStatusMutation();

  const setProjectStatus = useCallback(
    (status: StatusEnum) => {
      toast.promise(
        changeStatus({
          variables: {
            input: { id, status },
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
      items: Object.keys(StatusEnum).map(projectStatus => ({
        label: convertUppercaseToReadable(projectStatus),
        onSelect: () => setProjectStatus(projectStatus as StatusEnum),
        iconAfter: projectStatus === status && (
          <Icon name="check" className="text-green" size={18} />
        ),
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
