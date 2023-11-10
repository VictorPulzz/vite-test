import { useSwitchValue } from '@appello/common';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SectionContainer } from '~/view/components/SectionContainer';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

import { useFetchProjectMembersQuery } from '../../__generated__/schema';
import { AddNewMemberModal } from './components/AddNewMemberModal';
import { TeamTableType, useProjectTeamTableColumns } from './hooks/useProjectTeamTableColumns';

export const Team: FC = () => {
  const { canWriteProjectTeam } = useUserPermissions();

  const currentTeamTableColumns = useProjectTeamTableColumns(TeamTableType.CURRENT_TEAM);

  const otherContributorsTableColumns = useProjectTeamTableColumns(
    TeamTableType.OTHER_CONTRIBUTORS,
  );

  const {
    value: isAddNewMemberModalOpen,
    on: openAddNewMemberModalModal,
    off: closeAddNewMemberModalModal,
  } = useSwitchValue(false);

  const params = useParams();
  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  const { data, loading } = useFetchProjectMembersQuery({
    variables: {
      data: { id: projectId },
    },
  });

  const [isCurrentTeam, setIsCurrentTeam] = useState<boolean>(false);

  const handleAddNewMember = useCallback(
    (isCurrentTeam: boolean) => {
      setIsCurrentTeam(isCurrentTeam);
      openAddNewMemberModalModal();
    },
    [openAddNewMemberModalModal],
  );

  const projectMembersListIds = useMemo(
    () =>
      [
        ...(data?.projectMemberList.currentTeam ?? []),
        ...(data?.projectMemberList.otherContrubutors ?? []),
      ].map(member => member.user.id),
    [data],
  );

  return (
    <>
      {loading && (
        <div className="flex h-full items-center">
          <Loader colorful full />
        </div>
      )}
      {data && (
        <div className="flex flex-col gap-5">
          <SectionContainer title="Current team">
            {data && !!data?.projectMemberList.currentTeam.length ? (
              <Table
                className="mt-3"
                columns={currentTeamTableColumns}
                data={data?.projectMemberList.currentTeam}
              />
            ) : (
              <EmptyState iconName="users" label="No contributors here yet" />
            )}
            {canWriteProjectTeam && (
              <Button
                className="mt-3 w-[170px]"
                label="Add new member"
                variant={ButtonVariant.SECONDARY}
                withIcon="add"
                onClick={() => handleAddNewMember(true)}
              />
            )}
          </SectionContainer>
          <SectionContainer title="Other contributors">
            {data && !!data?.projectMemberList.otherContrubutors.length ? (
              <Table
                className="mt-3"
                columns={otherContributorsTableColumns}
                data={data.projectMemberList.otherContrubutors}
              />
            ) : (
              <EmptyState iconName="users" label="No contributors here yet" />
            )}
            {canWriteProjectTeam && (
              <Button
                className="mt-3 w-[170px]"
                label="Add new member"
                variant={ButtonVariant.SECONDARY}
                withIcon="add"
                onClick={() => handleAddNewMember(false)}
              />
            )}
          </SectionContainer>
        </div>
      )}
      <AddNewMemberModal
        canWriteProjectTeam={canWriteProjectTeam}
        close={closeAddNewMemberModalModal}
        isCurrentTeam={isCurrentTeam}
        isOpen={isAddNewMemberModalOpen}
        projectId={projectId}
        projectMembersListIds={projectMembersListIds}
      />
    </>
  );
};
