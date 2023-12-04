import { getGqlError } from '@appello/services/dist/gql';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import clsx from 'clsx';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { useFetchProjectStatusesListQuery } from '~/view/pages/CreateOrUpdateProject/__generated__/schema';

import { FetchProjectsDocument, useChangeProjectStatusMutation } from '../../__generated__/schema';
import { ProjectResultType } from '../../types';

export const MoreCell: FC<CellContext<ProjectResultType, unknown>> = ({ row }) => {
  const { status, id, inCurrentTeam } = row.original;

  const { data: statuses } = useFetchProjectStatusesListQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [projectUpdate] = useChangeProjectStatusMutation();

  const setProjectStatus = useCallback(
    (status: number) => {
      toast.promise(
        projectUpdate({
          variables: {
            input: { id, statusId: status },
          },
          refetchQueries: [FetchProjectsDocument],
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
    [id, projectUpdate],
  );

  const options: DropdownItem[] = [
    {
      label: 'Change status',
      iconBefore: <Icon name="connection" size={16} />,
      items: statuses?.projectStatusesList.results.map(projectStatus => ({
        label: projectStatus.label,
        onSelect: () => setProjectStatus(projectStatus.value),
        iconAfter: projectStatus.value === status?.id && (
          <Icon className="text-green" name="check" size={18} />
        ),
      })),
    },
  ];

  return (
    <Dropdown containerWidth="14.93rem" items={options}>
      {({ onClick }) => (
        <button disabled={!inCurrentTeam} type="button" onClick={onClick}>
          <Icon
            className={clsx(!inCurrentTeam && 'text-gray-3 cursor-not-allowed')}
            name="menu"
            size={16}
          />
        </button>
      )}
    </Dropdown>
  );
};
