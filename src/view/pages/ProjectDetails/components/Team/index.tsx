import { useSwitchValue } from '@appello/common/lib/hooks';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { Table } from '~/view/ui/components/common/Table';

import { AddNewMemberModal } from './components/AddNewMemberModal';
import { TEAM_TABLE_COLUMNS } from './consts';

const teamMember = {
  id: '0',
  fullName: 'Barbara Williams',
  photo: { url: 'https://picsum.photos/36/36?random' },
  role: 'Backend developer',
  email: 'example@com',
  slack: 'https://picsum.photos/36/36?random',
};

export const Team: FC = () => {
  const {
    value: isAddNewMemberModalOpen,
    on: openAddNewMemberModalModal,
    off: closeAddNewMemberModalModal,
  } = useSwitchValue(false);
  // TODO remove currentTeamMembersTestData and otherContributorsTestData when backend will be ready
  const currentTeamMembers = new Array(5).fill(teamMember);
  const otherContributors = new Array(2).fill(teamMember);

  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const projectId = params.id ? Number(params.id) : 0;

  // const { data, loading } = useFetchProjectParticipantsQuery({
  //   variables: {
  //     data: { id: projectId },
  //   },
  // });

  // TODO remove when backend will be ready
  const loading = false;

  return (
    <div>
      {loading ? (
        <span>LOADING</span>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="shadow-4 bg-white rounded-md p-7">
            <h2 className="text-p1 font-bold">Current team</h2>
            {!!currentTeamMembers.length && (
              <Table className="mt-3" data={currentTeamMembers} columns={TEAM_TABLE_COLUMNS} />
            )}
            <Button
              variant={ButtonVariant.SECONDARY}
              label="Add new member"
              withIcon="add"
              className="mt-3 w-[170px]"
              onClick={openAddNewMemberModalModal}
            />
          </div>
          {!!otherContributors.length && (
            <div className="shadow-4 bg-white rounded-md p-7">
              <h2 className="text-p1 font-bold">Other contrubutors</h2>
              <Table className="mt-3" data={otherContributors} columns={TEAM_TABLE_COLUMNS} />
            </div>
          )}
        </div>
      )}
      <AddNewMemberModal isOpen={isAddNewMemberModalOpen} close={closeAddNewMemberModalModal} />
    </div>
  );
};
