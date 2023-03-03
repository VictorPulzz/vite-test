import { useSwitchValue } from '@appello/common/lib/hooks';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { PAGE_SIZE } from '~/constants/pagination';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Loader } from '~/view/ui/components/common/Loader';

import { useFetchRepositoryParticipantsQuery } from '../../__generated__/schema';
import { AddParticipantModal } from './components/AddParticipantModal';
import { ParticipantMenu } from './components/ParticipantMenu';

export const Participants: FC = () => {
  const {
    value: isAddParticipantModalOpen,
    on: openAddParticipantModal,
    off: closeAddParticipantModal,
  } = useSwitchValue(false);

  const params = useParams();
  const repositoryId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const { data, loading } = useFetchRepositoryParticipantsQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset: 0,
      },
      filters: { repositoryId },
    },
    fetchPolicy: 'cache-and-network',
  });

  const repositoryParticipantsIds = useMemo(
    () => data?.repositoryParticipantList.results.map(participant => participant.user.id),
    [data?.repositoryParticipantList.results],
  );

  return (
    <div>
      {!data && loading && (
        <div className="mt-3">
          <Loader full colorful />
        </div>
      )}
      {data && data.repositoryParticipantList.results.length === 0 && (
        <div className="flex h-[65vh]">
          <EmptyState iconName="users" label="No participants here yet" />
        </div>
      )}
      {data && (
        <>
          <div className="w-3/4 grid grid-cols-3 gap-x-[50px] gap-y-[20px] px-2">
            {data?.repositoryParticipantList.results.map(({ user, accessLevel }) => (
              <div key={user.id} className="flex items-center justify-between gap-[20px]">
                <div className="flex gap-[10px] items-center ">
                  <Avatar uri={user.photo?.url || photoPlaceholder} size={36} />
                  <div className="flex flex-col gap-[3px]">
                    <span className="text-p3 text-black">{user.fullName}</span>
                    <span className="text-c1 text-gray-1 leading-none">
                      {convertUppercaseToReadable(accessLevel)}
                    </span>
                  </div>
                </div>
                <ParticipantMenu participant={user} />
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
      <AddParticipantModal
        isOpen={isAddParticipantModalOpen}
        close={closeAddParticipantModal}
        repositoryId={repositoryId}
        repositoryParticipantsIds={repositoryParticipantsIds as string[]}
      />
    </div>
  );
};
