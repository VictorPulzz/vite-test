import { getGqlError } from '@appello/common/lib/services/gql/utils';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import {
  FetchProjectMembersDocument,
  useAddProjectMemberMutation,
  useRemoveProjectMemberMutation,
} from '~/view/pages/ProjectDetails/__generated__/schema';
import { ProjectMemberResultType } from '~/view/pages/ProjectDetails/types';

interface Props {
  ctx: CellContext<ProjectMemberResultType, unknown>;
  isCurrentTeam: boolean;
}
export const MoreCell: FC<Props> = ({ ctx, isCurrentTeam }) => {
  const params = useParams();
  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  const { id } = ctx.row.original.user;

  const [removeProjectMember] = useRemoveProjectMemberMutation();
  const [addProjectMember] = useAddProjectMemberMutation();

  const moveProjectMember = useCallback(
    (memberId: number) => {
      const variables = {
        variables: {
          input: {
            currentTeam: !isCurrentTeam,
            projectId,
            userId: memberId,
          },
        },
        refetchQueries: [FetchProjectMembersDocument],
      };

      if (isCurrentTeam) {
        toast.promise(removeProjectMember(variables), {
          loading: 'Moving member to other contributors...',
          success: 'Member moved to other contributors',
          error: e => {
            const errors = getGqlError(e?.graphQLErrors);
            return `Error while moving member to other contributors: ${JSON.stringify(errors)}`;
          },
        });
      } else
        toast.promise(addProjectMember(variables), {
          loading: 'Moving member to team...',
          success: 'Member moved to team',
          error: e => {
            const errors = getGqlError(e?.graphQLErrors);
            return `Error while moving member to team: ${JSON.stringify(errors)}`;
          },
        });
    },
    [isCurrentTeam, projectId, addProjectMember, removeProjectMember],
  );

  const removeFromOtherContributors = useCallback(
    (memberId: number) => {
      toast.promise(
        removeProjectMember({
          variables: {
            input: {
              currentTeam: !isCurrentTeam,
              projectId,
              userId: memberId,
            },
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
    [isCurrentTeam, projectId, removeProjectMember],
  );

  const currentTeamOptions: DropdownItem[] = [
    {
      label: 'Remove from current',
      onSelect: () => moveProjectMember(id),
    },
  ];

  const otherContributorsOptions: DropdownItem[] = [
    {
      label: 'Set as current',
      onSelect: () => moveProjectMember(id),
    },
    {
      label: 'Remove from project',
      onSelect: () => removeFromOtherContributors(id),
      className: 'text-red',
    },
  ];

  return (
    <Dropdown
      items={isCurrentTeam ? currentTeamOptions : otherContributorsOptions}
      containerWidth="14.93rem"
    >
      {({ onClick }) => (
        <button type="button" onClick={onClick}>
          <Icon name="menu" size={16} />
        </button>
      )}
    </Dropdown>
  );
};
