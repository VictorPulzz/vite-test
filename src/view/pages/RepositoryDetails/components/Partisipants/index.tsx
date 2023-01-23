import { useSwitchValue } from '@appello/common/lib/hooks';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';

import { AddParticipantModal } from '../AddParticipantModal';

// TODO remove participantTestData when backend will be ready
const participantTestData = {
  id: 1,
  fullName: 'Barbara Williams',
  photo: 'https://picsum.photos/36/36?random',
  position: 'Admin',
};

export const Participants: FC = () => {
  const {
    value: isAddParticipantModalOpen,
    on: openAddParticipantModal,
    off: closeAddParticipantModal,
  } = useSwitchValue(false);
  // TODO remove participantsTestData when backend will be ready
  const participantsTestData = new Array(12).fill(participantTestData);

  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const repositoryId = params.id ? Number(params.id) : 0;

  // const { data, loading } = useFetchRepositoryParticipantsQuery({
  //   variables: {
  //     data: { id: repositoryId },
  //   },
  // });

  // TODO remove when backend will be ready
  const loading = false;

  return (
    <div>
      {loading ? (
        <span>LOADING</span>
      ) : (
        <>
          <div className="w-3/4 grid grid-cols-3 gap-x-[50px] gap-y-[20px] px-2">
            {participantsTestData.map((participant, index) => (
              <div key={`${participant.id + index}`} className="flex gap-[10px] items-center">
                <Avatar uri={`${participant.photo}=${index}` || photoPlaceholder} size={36} />
                <div className="flex flex-col gap-[3px]">
                  <span className="text-p3 text-black">{participant.fullName}</span>
                  <span className="text-c1 text-black leading-none">{participant.position}</span>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant={ButtonVariant.SECONDARY}
            label="Add participant"
            className="mt-10 w-[136px]"
            onClick={openAddParticipantModal}
          />
        </>
      )}
      <AddParticipantModal isOpen={isAddParticipantModalOpen} close={closeAddParticipantModal} />
    </div>
  );
};
