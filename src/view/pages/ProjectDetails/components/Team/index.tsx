import { useSwitchValue } from '@appello/common/lib/hooks';
import { ColumnDef } from '@tanstack/table-core';
import React, { FC, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Permission } from '~/constants/permissions';
import { UserType } from '~/services/gql/__generated__/globalTypes';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Loader } from '~/view/ui/components/common/Loader';
import { Table } from '~/view/ui/components/common/Table';

import { useFetchProjectMembersQuery } from '../../__generated__/schema';
import { AddNewMemberModal } from './components/AddNewMemberModal';
import {
  CURRENT_TEAM_TABLE_COLUMNS,
  CURRENT_TEAM_TABLE_COLUMNS_NO_DETAILS,
  OTHER_CONTRIBUTORS_TABLE_COLUMNS,
  OTHER_CONTRIBUTORS_TABLE_COLUMNS_NO_DETAILS,
} from './consts';

export const Team: FC = () => {
  const canEditProjectTeam = useHasAccess(Permission.EDIT_PROJECT_TEAM);
  const canReadUserDetails = useHasAccess(Permission.READ_USER_DETAILS);

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
      ].map(user => user.id),
    [data],
  );

  const getTableColumns = useCallback(
    (arr: ColumnDef<UserType, string>[], arrWithoutUserDetails: ColumnDef<UserType, string>[]) => {
      if (canReadUserDetails) {
        if (canEditProjectTeam) {
          return canEditProjectTeam ? arr : [...arr.slice(0, arr.length - 1)];
        }
        return [...arr.slice(0, arr.length - 1)];
      }
      return canEditProjectTeam
        ? arrWithoutUserDetails
        : [...arrWithoutUserDetails.slice(0, arrWithoutUserDetails.length - 1)];
    },
    [canEditProjectTeam, canReadUserDetails],
  );

  return (
    <div>
      {loading && <Loader full colorful />}
      {data && (
        <div className="flex flex-col gap-5">
          <SectionContainer title="Current team">
            {data && !!data?.projectMemberList.currentTeam.length ? (
              <Table
                className="mt-3"
                data={data?.projectMemberList.currentTeam as UserType[]}
                columns={getTableColumns(
                  CURRENT_TEAM_TABLE_COLUMNS,
                  CURRENT_TEAM_TABLE_COLUMNS_NO_DETAILS,
                )}
              />
            ) : (
              <EmptyState iconName="users" label="No contributors here yet" />
            )}
            {canEditProjectTeam && (
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
                data={data.projectMemberList.otherContrubutors as UserType[]}
                columns={getTableColumns(
                  OTHER_CONTRIBUTORS_TABLE_COLUMNS,
                  OTHER_CONTRIBUTORS_TABLE_COLUMNS_NO_DETAILS,
                )}
              />
            </SectionContainer>
          )}
        </div>
      )}
      <AddNewMemberModal
        isOpen={isAddNewMemberModalOpen}
        close={closeAddNewMemberModalModal}
        projectId={projectId}
        projectMembersListIds={projectMembersListIds as string[]}
        canEditProjectTeam={canEditProjectTeam}
      />
    </div>
  );
};
