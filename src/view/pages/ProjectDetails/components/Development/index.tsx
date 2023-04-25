import { Loader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { RequestStatusChoice, RequestTypeChoice } from '~/services/gql/__generated__/globalTypes';

import {
  useFetchEnvsRequestsListQuery,
  useFetchIntegrationsRequestsListQuery,
  useFetchProjectEnvironmentsListQuery,
  useFetchProjectIntegrationsListQuery,
  useFetchProjectRepositoriesListQuery,
  useFetchReposRequestsListQuery,
} from '../../__generated__/schema';
import { DevelopmentEnvironments } from './components/Environments';
import { DevelopmentIntegrations } from './components/Integrations';
import { DevelopmentRepositories } from './components/Repositories';

export const Development: FC = () => {
  const params = useParams();
  const projectId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const { data: repositoriesList, loading: isProjectRepositoriesListLoading } =
    useFetchProjectRepositoriesListQuery({
      variables: {
        data: { id: projectId },
      },
      fetchPolicy: 'cache-and-network',
    });

  const { data: reposRequests, loading: isLoadingReposRequests } = useFetchReposRequestsListQuery({
    variables: {
      pagination: {
        limit: 0,
      },
      filters: {
        type: RequestTypeChoice.CREATION_REPOSITORY,
        status: RequestStatusChoice.PENDING,
        project: projectId,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: environmentsList, loading: isProjectEnvironmentsListLoading } =
    useFetchProjectEnvironmentsListQuery({
      variables: {
        data: { id: projectId },
      },
    });

  const { data: envsRequests, loading: isLoadingEnvsRequests } = useFetchEnvsRequestsListQuery({
    variables: {
      pagination: {
        limit: 0,
      },
      filters: {
        type: RequestTypeChoice.CREATION_ENVIRONMENT,
        status: RequestStatusChoice.PENDING,
        project: projectId,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: integrationsList, loading: isProjectIntegrationsListLoading } =
    useFetchProjectIntegrationsListQuery({
      variables: {
        data: { id: projectId },
      },
    });

  const { data: integrationsRequests, loading: isLoadingIntegrationsRequests } =
    useFetchIntegrationsRequestsListQuery({
      variables: {
        pagination: {
          limit: 0,
        },
        filters: {
          type: RequestTypeChoice.CREATION_INTEGRATION,
          status: RequestStatusChoice.PENDING,
          project: projectId,
        },
      },
      fetchPolicy: 'cache-and-network',
    });

  const prepeareReposRequests = useMemo(
    () =>
      reposRequests
        ? reposRequests?.requestList.results.map(request => ({
            ...request,
            name: '',
            type: request.repositoryType,
          }))
        : [],
    [reposRequests],
  );

  const projectRepositories = useMemo(
    () => [...(repositoriesList?.projectRepositoryList ?? []), ...prepeareReposRequests],
    [prepeareReposRequests, repositoriesList?.projectRepositoryList],
  );

  const isLoading =
    isProjectRepositoriesListLoading ||
    isLoadingReposRequests ||
    isProjectEnvironmentsListLoading ||
    isLoadingEnvsRequests ||
    isProjectIntegrationsListLoading ||
    isLoadingIntegrationsRequests;

  return (
    <div className="h-full">
      {isLoading ? (
        <div className="flex h-full items-center">
          <Loader full colorful />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <DevelopmentRepositories repositories={projectRepositories} projectId={projectId} />
          <DevelopmentEnvironments
            environments={environmentsList?.projectEnvironmentList ?? []}
            envsRequests={envsRequests?.requestList.results ?? []}
            projectId={projectId}
          />
          <DevelopmentIntegrations
            integrations={integrationsList?.projectIntegrationList ?? []}
            integrationsRequests={integrationsRequests?.requestList.results ?? []}
            projectId={projectId}
          />
        </div>
      )}
    </div>
  );
};
