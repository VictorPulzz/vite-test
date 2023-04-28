import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Permission } from '~/constants/permissions';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';

import { useFetchProjectMembersQuery } from '../../__generated__/schema';
import { AddNewMemberModal } from './components/AddNewMemberModal';
import { TeamTableType, useProjectTeamTableColumns } from './hooks/useProjectTeamTableColumns';

export const Team: FC = () => {
  const canWriteProjectTeam = useHasAccess(Permission.WRITE_PROJECT_TEAM);

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
          <Loader full colorful />
        </div>
      )}
      {data && (
        <div className="flex flex-col gap-5">
          <SectionContainer title="Current team">
            {data && !!data?.projectMemberList.currentTeam.length ? (
              <Table
                className="mt-3"
                data={data?.projectMemberList.currentTeam}
                columns={currentTeamTableColumns}
              />
            ) : (
              <EmptyState iconName="users" label="No contributors here yet" />
            )}
            {canWriteProjectTeam && (
              <Button
                variant={ButtonVariant.SECONDARY}
                label="Add new member"
                withIcon="add"
                className="mt-3 w-[170px]"
                onClick={openAddNewMemberModalModal}
              />
            )}
          </SectionContainer>
          {!!data?.projectMemberList.otherContrubutors.length && (
            <SectionContainer title="Other contributors">
              <Table
                className="mt-3"
                data={data.projectMemberList.otherContrubutors}
                columns={otherContributorsTableColumns}
              />
            </SectionContainer>
          )}
        </div>
      )}
      <AddNewMemberModal
        isOpen={isAddNewMemberModalOpen}
        close={closeAddNewMemberModalModal}
        projectId={projectId}
        projectMembersListIds={projectMembersListIds}
        canWriteProjectTeam={canWriteProjectTeam}
      />
    </>
  );
};
