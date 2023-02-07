import { useSwitchValue } from '@appello/common/lib/hooks';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { SectionContainer } from '~/view/components/SectionContainer';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { Table } from '~/view/ui/components/common/Table';

import { useFetchProjectMembersQuery } from '../../__generated__/schema';
import { AddNewMemberModal } from './components/AddNewMemberModal';
import { TEAM_TABLE_COLUMNS } from './consts';

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

  return (
    <div>
      {loading ? (
        <span>LOADING</span>
      ) : (
        <div className="flex flex-col gap-5">
          <SectionContainer title="Current team">
            {!!data?.projectMemberList.currentTeam.length && (
              <Table
                className="mt-3"
                data={data?.projectMemberList.currentTeam}
                columns={TEAM_TABLE_COLUMNS}
              />
            )}
            <Button
              variant={ButtonVariant.SECONDARY}
              label="Add new member"
              withIcon="add"
              className="mt-3 w-[170px]"
              onClick={openAddNewMemberModalModal}
            />
          </SectionContainer>
          {!!data?.projectMemberList.otherParticipants.length && (
            <SectionContainer title="Other contrubutors">
              <Table
                className="mt-3"
                data={data.projectMemberList.otherParticipants}
                columns={TEAM_TABLE_COLUMNS}
              />
            </SectionContainer>
          )}
        </div>
      )}
      <AddNewMemberModal isOpen={isAddNewMemberModalOpen} close={closeAddNewMemberModalModal} />
    </div>
  );
};
