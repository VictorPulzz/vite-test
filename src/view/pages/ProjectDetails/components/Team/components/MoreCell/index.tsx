import { getGqlError } from '@appello/common/lib/services/gql/utils';
import { CellContext } from '@tanstack/react-table';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { UserType } from '~/services/gql/__generated__/globalTypes';
import {
  FetchProjectMembersDocument,
  useRemoveProjectMemberMutation,
} from '~/view/pages/ProjectDetails/__generated__/schema';
import { Icon } from '~/view/ui/components/common/Icon';

export const MoreCell: FC<CellContext<UserType, unknown>> = ({ row }) => {
  const params = useParams();
  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  const { id } = row.original;

  const [removeProjectMember] = useRemoveProjectMemberMutation();

  const removeCurrentProjectMember = useCallback(
    (memberId: number) => {
      toast.promise(
        removeProjectMember({
          variables: {
            input: { currentTeam: false, projectId, userId: memberId },
          },
          refetchQueries: [FetchProjectMembersDocument],
        }),
        {
          loading: 'Removing member...',
          success: 'Member removed',
          error: e => {
            const errors = getGqlError(e?.graphQLErrors);
            return `Error while removing member: ${JSON.stringify(errors)}`;
          },
        },
      );
    },
    [projectId, removeProjectMember],
  );

  const options: DropdownItem[] = [
    {
      label: 'Remove',
      onSelect: () => removeCurrentProjectMember(Number(id)),
      iconBefore: <Icon name="trash" size={14} />,
      className: 'text-red',
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
