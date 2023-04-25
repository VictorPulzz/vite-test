import { Loader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Permission } from '~/constants/permissions';
import { RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { useAppSelector } from '~/store/hooks';
import { NoAccessMessage, NoAccessMessageVariant } from '~/view/components/NoAccessMessage';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import {
  useFetchRepositoryDetailsQuery,
  useFetchRepositoryParticipantsIdsQuery,
  useFetchRepositoryPreviewQuery,
} from './__generated__/schema';
import { RepositoryDetailsTabs } from './components/RepositoryDetailsTabs';
import { RepositoryMainInfo } from './components/RepositoryMainInfo';

export const RepositoryDetailsPage: FC = () => {
  const params = useParams();

  const canReadRepoDetails = useHasAccess(Permission.READ_REPO_DETAILS);

  const userId = useAppSelector(state => state.user.profile?.id);

  const repositoryId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const { data: repositoryParticipantsIdsData, loading: isLoadingRepositoryParticipantsIdsData } =
    useFetchRepositoryParticipantsIdsQuery({
      variables: {
        pagination: {
          limit: 0,
        },
        filters: { repositoryId },
      },
    });

  const repositoryParticipantsIds = useMemo(
    () =>
      repositoryParticipantsIdsData?.repositoryParticipantList.results.map(
        participant => participant.user.id,
      ) ?? [],
    [repositoryParticipantsIdsData?.repositoryParticipantList.results],
  );

  const isUserInRepository = canReadRepoDetails && repositoryParticipantsIds.includes(userId ?? '');

  const { data: repositoryDetails, loading: isLoadingRepositoryDetails } =
    useFetchRepositoryDetailsQuery({
      variables: {
        input: { id: repositoryId },
      },
      skip: !isUserInRepository,
    });

  const { data: repositoryPreview, loading: isLoadingRepositoryPreview } =
    useFetchRepositoryPreviewQuery({
      variables: {
        input: { id: repositoryId },
      },
      skip: isUserInRepository,
    });

  const isLoading =
    isLoadingRepositoryParticipantsIdsData ||
    isLoadingRepositoryPreview ||
    isLoadingRepositoryDetails;

  return (
    <SidebarLayout>
      <DetailLayout
        title={isUserInRepository ? 'Repository details' : ''}
        contentClassName="flex-auto"
      >
        {isLoading && (
          <div className="flex h-full items-center">
            <Loader full colorful />
          </div>
        )}
        {!isLoading && repositoryDetails && isUserInRepository && (
          <div className="flex gap-5 p-6 h-full">
            <RepositoryMainInfo repository={repositoryDetails?.repository} />
            <RepositoryDetailsTabs />
          </div>
        )}
        {!isLoading && repositoryPreview && !isUserInRepository && (
          <NoAccessMessage
            className="h-full"
            title={repositoryPreview.repositoryPreview.name}
            variant={NoAccessMessageVariant.REQUEST}
            requestType={RequestTypeChoice.ACCESS_REPOSITORY}
            projectId={Number(repositoryPreview.repositoryPreview.projectId)}
            repositoryId={repositoryId}
          />
        )}
      </DetailLayout>
    </SidebarLayout>
  );
};
