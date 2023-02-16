import { useSwitchValue } from '@appello/common/lib/hooks';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { UserType } from '~/services/gql/__generated__/globalTypes';
import { SectionContainer } from '~/view/components/SectionContainer';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Loader } from '~/view/ui/components/common/Loader';
import { Table } from '~/view/ui/components/common/Table';

import { useFetchProjectMembersQuery } from '../../__generated__/schema';
import { AddNewMemberModal } from './components/AddNewMemberModal';
import { CURRENT_TEAM_TABLE_COLUMNS, OTHER_CONTRUBUTORS_TABLE_COLUMNS } from './consts';

export const Team: FC = () => {
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
                columns={CURRENT_TEAM_TABLE_COLUMNS}
              />
            ) : (
              <EmptyState iconName="users" label="No contributors here yet" />
            )}
            <Button
              variant={ButtonVariant.SECONDARY}
              label="Add new member"
              withIcon="add"
              className="mt-3 w-[170px]"
              onClick={openAddNewMemberModalModal}
            />
          </SectionContainer>
          {!!data?.projectMemberList.otherContrubutors.length && (
            <SectionContainer title="Other contrubutors">
              <Table
                className="mt-3"
                data={data.projectMemberList.otherContrubutors as UserType[]}
                columns={OTHER_CONTRUBUTORS_TABLE_COLUMNS}
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
      />
    </div>
  );
};
