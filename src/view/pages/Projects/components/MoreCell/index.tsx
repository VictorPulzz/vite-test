import { getGqlError } from '@appello/common/lib/services/gql/utils/getGqlError';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { useFetchProjectStatusesListQuery } from '~/view/pages/CreateOrUpdateProject/__generated__/schema';

import { FetchProjectsDocument, useChangeProjectStatusMutation } from '../../__generated__/schema';
import { ProjectResultType } from '../../types';

export const MoreCell: FC<CellContext<ProjectResultType, unknown>> = ({ row }) => {
  const { status, id } = row.original;

  const { data: statuses } = useFetchProjectStatusesListQuery({
    variables: {
      pagination: { limit: 0 },
    },
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
