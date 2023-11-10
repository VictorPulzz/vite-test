import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import { useListQueryParams } from '@appello/web-ui';
import { Pagination } from '@appello/web-ui';
import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { PAGE_SIZE } from '~/constants/pagination';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';
import { useFetchRepositoryParticipantsQuery } from '~/view/pages/RepositoryDetails/__generated__/schema';

import { AddParticipantModal } from './components/AddParticipantModal';
import { ParticipantMenu } from './components/ParticipantMenu';

export const Participants: FC = () => {
  const { canWriteRepoParticipants } = useUserPermissions();

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
      ) ?? [],
    [allRepositoryParticipants?.repositoryParticipantList.results],
  );

  const hasPagination = Number(data?.repositoryParticipantList.count) > PAGE_SIZE;

  return (
    <div className="flex flex-col h-full p-7">
      {loading && (
        <div className="flex h-full items-center">
          <Loader colorful full />
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
                className="flex items-center justify-between gap-[20px] p-4 border border-solid border-gray-5 rounded-md"
                key={user.id}
              >
                <div className="flex gap-[15px] items-center">
                  <Avatar size={36} uri={user.photoThumbnail?.url || photoPlaceholder} />
                  <div className="flex flex-col gap-[3px] ">
                    <span className="block text-p3 text-black break-words leading-4">
                      {user.fullName}
                    </span>
                    <span className="text-p5 text-gray-1 ">
                      {convertUppercaseToReadable(accessLevel)}
                    </span>
                  </div>
                </div>
                {canWriteRepoParticipants && (
                  <ParticipantMenu
                    accessLevel={accessLevel}
                    participant={user}
                    repositoryId={repositoryId}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        {hasPagination && data && (
          <Pagination
            itemsCount={data.repositoryParticipantList.results.length}
            offset={offset}
            pageSize={PAGE_SIZE}
            setOffset={setOffset}
            totalCount={data.repositoryParticipantList.count}
            onPageChange={gqlTableFetchMore(fetchMore)}
          />
        )}
        {canWriteRepoParticipants && (
          <Button
            className="mt-6 w-[136px]"
            label="Add participant"
            variant={ButtonVariant.SECONDARY}
            onClick={openAddParticipantModal}
          />
        )}
      </div>
      <AddParticipantModal
        close={closeAddParticipantModal}
        isOpen={isAddParticipantModalOpen}
        repositoryId={repositoryId}
        repositoryParticipantsIds={repositoryParticipantsIds}
      />
    </div>
  );
};
