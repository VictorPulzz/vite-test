import { getGqlError, useSwitchValue } from '@appello/common';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { ConfirmActionModal } from '~/view/components/ConfirmActionModal';
import {
  FetchProjectMembersDocument,
  useAddProjectMemberMutation,
  useRemoveProjectMemberMutation,
} from '~/view/pages/ProjectDetails/__generated__/schema';
import { ProjectMemberResultType } from '~/view/pages/ProjectDetails/types';

import { InviteUserToSlackModal } from './components/InviteUserToSlackModal';

interface Props {
  ctx: CellContext<ProjectMemberResultType, unknown>;
  isCurrentTeam: boolean;
  createdProjectSlackChannelsCount: number;
}

export const MoreCell: FC<Props> = ({ ctx, isCurrentTeam, createdProjectSlackChannelsCount }) => {
  const {
    value: isInviteUserToSlackModalOpen,
    on: openInviteUserToSlackModalModal,
    off: closeInviteUserToSlackModalModal,
  } = useSwitchValue(false);

  const {
    value: isConfirmActionModal,
    on: openConfirmActionModal,
    off: closeConfirmActionModal,
  } = useSwitchValue(false);

  const params = useParams();
  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  const { user, currentTeam } = ctx.row.original;

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
      label: 'Invite to slack channels',
      onSelect: openInviteUserToSlackModalModal,
      disabled: createdProjectSlackChannelsCount === 0,
    },
    {
      label: 'Remove from current',
      onSelect: () => moveProjectMember(user.id),
    },
  ];

  const otherContributorsOptions: DropdownItem[] = [
    {
      label: 'Invite to slack channels',
      onSelect: openInviteUserToSlackModalModal,
      disabled: createdProjectSlackChannelsCount === 0,
    },
    {
      label: 'Set as current',
      onSelect: () => moveProjectMember(user.id),
    },
    {
      label: 'Remove from project',
      onSelect: openConfirmActionModal,
      className: 'text-red',
    },
  ];

  return (
    <>
      <Dropdown
        containerWidth="14.93rem"
        items={isCurrentTeam ? currentTeamOptions : otherContributorsOptions}
      >
        {({ onClick }) => (
          <button type="button" onClick={onClick}>
            <Icon name="menu" size={16} />
          </button>
        )}
      </Dropdown>
      {isInviteUserToSlackModalOpen && (
        <InviteUserToSlackModal
          close={closeInviteUserToSlackModalModal}
          isCurrentTeam={currentTeam}
          isOpen={isInviteUserToSlackModalOpen}
          projectId={projectId}
          user={user}
        />
      )}
      {isConfirmActionModal && (
        <ConfirmActionModal
          action="remove"
          close={closeConfirmActionModal}
          description="Do this if person was added by mistake only. Otherwise the data about his contributions to the project will be lost"
          isOpen={isConfirmActionModal}
          name={user.fullName}
          onAccept={() => removeFromOtherContributors(user.id)}
        />
      )}
    </>
  );
};
