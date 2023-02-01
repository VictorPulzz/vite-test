import { useSwitchValue } from '@appello/common/lib/hooks';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { Table } from '~/view/ui/components/common/Table';

import { AddParticipantModal } from './components/AddParticipantModal';
import { TEAM_TABLE_COLUMNS } from './consts';

const participantTestData = {
  id: '0',
  fullName: 'Barbara Williams',
  photo: 'https://picsum.photos/36/36?random',
  position: 'Backend developer',
  email: 'expamle@com',
};

export const Team: FC = () => {
  const {
    value: isAddParticipantModalOpen,
    on: openAddParticipantModal,
    off: closeAddParticipantModal,
  } = useSwitchValue(false);
  // TODO remove participantsTestData when backend will be ready
  const participantsTestData = new Array(3).fill(participantTestData);

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
            <Table className="mt-3" data={participantsTestData} columns={TEAM_TABLE_COLUMNS} />
            <Button
              variant={ButtonVariant.SECONDARY}
              label="Add new member"
              withIcon="add"
              className="mt-3 w-[170px]"
              onClick={openAddParticipantModal}
            />
          </div>
          <div className="shadow-4 bg-white rounded-md p-7">
            <h2 className="text-p1 font-bold">Other contrubutors</h2>
            <Table className="mt-3" data={participantsTestData} columns={TEAM_TABLE_COLUMNS} />
          </div>
        </div>
      )}
      <AddParticipantModal isOpen={isAddParticipantModalOpen} close={closeAddParticipantModal} />
    </div>
  );
};
