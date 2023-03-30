import { useSwitchValue } from '@appello/common/lib/hooks';
import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { PAGE_SIZE } from '~/constants/pagination';
import { Permission } from '~/constants/permissions';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { Pagination } from '~/view/components/Pagination';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Loader } from '~/view/ui/components/common/Loader';
import { useListQueryParams } from '~/view/ui/hooks/useListQueryParams';

import { useFetchRepositoryParticipantsQuery } from '../../__generated__/schema';
import { AddParticipantModal } from './components/AddParticipantModal';
import { ParticipantMenu } from './components/ParticipantMenu';

export const Participants: FC = () => {
  const canEditRepoParticipants = useHasAccess(Permission.EDIT_REPO_PARTICIPANTS);

  const { offset, setOffset } = useListQueryParams();

  const {
    value: isAddParticipantModalOpen,
    on: openAddParticipantModal,
    off: closeAddParticipantModal,
  } = useSwitchValue(false);

  const params = useParams();
  const repositoryId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const { data: allRepositoryParticipants } = useFetchRepositoryParticipantsQuery({
    variables: {
      pagination: {
        limit: 0,
      },
      filters: { repositoryId },
    },
  });

  const { data, loading, fetchMore } = useFetchRepositoryParticipantsQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      filters: { repositoryId },
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data?.repositoryParticipantList.results.length === 0) {
      setOffset(0);
    }
  }, [data?.repositoryParticipantList.results.length, setOffset]);

  const repositoryParticipantsIds = useMemo(
    () =>
      allRepositoryParticipants?.repositoryParticipantList.results.map(
        participant => participant.user.id,
      ),
    [allRepositoryParticipants?.repositoryParticipantList.results],
  );

  const hasPagination = data && data.repositoryParticipantList.count > PAGE_SIZE;

  return (
    <div className="flex flex-col h-full p-7">
      {loading && (
        <div className="flex h-full items-center">
          <Loader full colorful />
        </div>
      )}
      {data && data.repositoryParticipantList.results.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <EmptyState iconName="users" label="No participants here yet" />
        </div>
      )}
      {!loading && data && data.repositoryParticipantList.results.length > 0 && (
        <div className="flex-auto">
          <div className="grid grid-cols-3 gap-[20px]">
            {data?.repositoryParticipantList.results.map(({ user, accessLevel }) => (
              <div
                key={user.id}
                className="flex items-center justify-between gap-[20px] p-4 border border-solid border-gray-5 rounded-md"
              >
                <div className="flex gap-[15px] items-center">
                  <Avatar uri={user.photo?.url || photoPlaceholder} size={36} />
                  <div className="flex flex-col gap-[3px] ">
                    <span className="block text-p3 text-black break-words leading-4">
                      {user.fullName}
                    </span>
                    <span className="text-c1 text-gray-1 ">
                      {convertUppercaseToReadable(accessLevel)}
                    </span>
                  </div>
                </div>
                {canEditRepoParticipants && (
                  <ParticipantMenu
                    participant={user}
                    repositoryId={repositoryId}
                    accessLevel={accessLevel}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        {hasPagination && (
          <Pagination
            setOffset={setOffset}
            totalCount={data.repositoryParticipantList.count}
            offset={offset}
            dataLength={data.repositoryParticipantList.results.length}
            fetchMore={fetchMore}
          />
        )}
        {canEditRepoParticipants && (
          <Button
            variant={ButtonVariant.SECONDARY}
            label="Add participant"
            className="mt-6 w-[136px]"
            onClick={openAddParticipantModal}
          />
        )}
      </div>
      <AddParticipantModal
        isOpen={isAddParticipantModalOpen}
        close={closeAddParticipantModal}
        repositoryId={repositoryId}
        repositoryParticipantsIds={repositoryParticipantsIds as string[]}
      />
    </div>
  );
};
