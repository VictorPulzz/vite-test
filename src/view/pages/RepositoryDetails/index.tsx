import { Loader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Permission } from '~/constants/permissions';
import { RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { RequestAccessMessage } from '~/view/components/RequestAccessMessage';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import {
  useFetchRepositoryDetailsQuery,
  useFetchRepositoryPreviewQuery,
} from './__generated__/schema';
import { RepositoryDetailsTabs } from './components/RepositoryDetailsTabs';
import { RepositoryMainInfo } from './components/RepositoryMainInfo';

export const RepositoryDetailsPage: FC = () => {
  const canReadRepoDetails = useHasAccess(Permission.READ_REPO_DETAILS);
  const params = useParams();
  const repositoryId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const { data: repositoryDetails, loading: isLoadingRepositoryDetails } =
    useFetchRepositoryDetailsQuery({
      variables: {
        input: { id: repositoryId },
      },
    });

  const { data: repositoryPreview, loading: isLoadingRepositoryPreview } =
    useFetchRepositoryPreviewQuery({
      variables: {
        input: { id: repositoryId },
      },
    });

  const isHasAccessToRepository =
    canReadRepoDetails || repositoryPreview?.repositoryPreview.inParticipant;

  const isLoading = isLoadingRepositoryPreview || isLoadingRepositoryDetails;

  return (
    <SidebarLayout>
      <DetailLayout
        title={isHasAccessToRepository ? 'Repository details' : ''}
        contentClassName="flex-auto"
      >
        {isLoading && (
          <div className="flex h-full items-center">
            <Loader full colorful />
          </div>
        )}
        {!isLoading && repositoryDetails && isHasAccessToRepository && (
          <div className="flex gap-5 p-6 h-full">
            <RepositoryMainInfo repository={repositoryDetails?.repository} />
            <RepositoryDetailsTabs />
          </div>
        )}
        {!isLoading && repositoryPreview && !isHasAccessToRepository && (
          <RequestAccessMessage
            className="h-full"
            title={repositoryPreview.repositoryPreview.name}
            requestType={RequestTypeChoice.ACCESS_REPOSITORY}
            projectId={repositoryPreview.repositoryPreview.projectId}
            repositoryId={repositoryId}
          />
        )}
      </DetailLayout>
    </SidebarLayout>
  );
};
