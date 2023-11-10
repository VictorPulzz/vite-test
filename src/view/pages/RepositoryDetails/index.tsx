import { Loader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { RequestAccessMessage } from '~/view/components/RequestAccessMessage';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import {
  useFetchRepositoryDetailsQuery,
  useFetchRepositoryPreviewQuery,
} from './__generated__/schema';
import { RepositoryDetailsTabs } from './components/RepositoryDetailsTabs';
import { RepositoryMainInfo } from './components/RepositoryMainInfo';

export const RepositoryDetailsPage: FC = () => {
  const { canReadRepoDetails } = useUserPermissions();

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
        contentClassName="flex-auto"
        title={isHasAccessToRepository ? 'Repository details' : ''}
      >
        {isLoading && (
          <div className="flex h-full items-center">
            <Loader colorful full />
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
            projectId={repositoryPreview.repositoryPreview.projectId}
            repositoryId={repositoryId}
            requestType={RequestTypeChoice.ACCESS_REPOSITORY}
            title={repositoryPreview.repositoryPreview.name}
          />
        )}
      </DetailLayout>
    </SidebarLayout>
  );
};
