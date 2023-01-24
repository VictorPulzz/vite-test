import { useSwitchValue } from '@appello/common/lib/hooks';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';

import { AddParticipantModal } from './components/AddParticipantModal';
import { ParticipantMenu } from './components/ParticipantMenu';

// TODO remove participantTestData and Participant when backend will be ready
interface Participant {
  id: string;
  fullName: string;
  photo: string;
  position: string;
}
const participantTestData: Participant = {
  id: '0',
  fullName: 'Barbara Williams',
  photo: 'https://picsum.photos/36/36?random',
  position: 'Backend developer',
};

export const Participants: FC = () => {
  const {
    value: isAddParticipantModalOpen,
    on: openAddParticipantModal,
    off: closeAddParticipantModal,
  } = useSwitchValue(false);
  // TODO remove participantsTestData when backend will be ready
  const participantsTestData = new Array(9).fill(participantTestData);

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
        <div className="flex flex-col gap-[20px] px-2">
          <div>
            <h2 className="mb-5 text-p1 font-semibold">Current team</h2>
            <div className="w-3/4 grid grid-cols-3 gap-x-[50px] gap-y-[20px]">
              {participantsTestData.map((participant, index) => (
                <div key={`${participant.id + index}`} className="flex items-center gap-[20px]">
                  <div className="flex gap-[10px] items-center">
                    <Avatar uri={`${participant.photo}=${index}` || photoPlaceholder} size={36} />
                    <div className="flex flex-col gap-[3px]">
                      <span className="text-p3 text-black">{participant.fullName}</span>
                      <span className="text-c1 text-gray-1 leading-none">
                        {participant.position}
                      </span>
                    </div>
                  </div>
                  <ParticipantMenu
                    participantId={+`${participant.id + index}`}
                    isOtherParticipant={false}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-5 text-p1 font-semibold">Other participants</h2>
            <div className="w-3/4 grid grid-cols-3 gap-x-[50px] gap-y-[20px]">
              {participantsTestData.map((participant, index) => (
                <div key={`${participant.id + index}`} className="flex items-center gap-[20px]">
                  <div className="flex gap-[10px] items-center">
                    <Avatar uri={`${participant.photo}=${index}` || photoPlaceholder} size={36} />
                    <div className="flex flex-col gap-[3px]">
                      <span className="text-p3 text-black">{participant.fullName}</span>
                      <span className="text-c1 text-gray-1 leading-none">
                        {participant.position}
                      </span>
                    </div>
                  </div>
                  <ParticipantMenu
                    participantId={+`${participant.id + index}`}
                    isOtherParticipant
                  />
                </div>
              ))}
            </div>
            <Button
              variant={ButtonVariant.SECONDARY}
              label="Add participant"
              className="mt-10 w-[136px]"
              onClick={openAddParticipantModal}
            />
          </div>
        </div>
      )}
      <AddParticipantModal isOpen={isAddParticipantModalOpen} close={closeAddParticipantModal} />
    </div>
  );
};
