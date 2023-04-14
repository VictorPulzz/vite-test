import { Loader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import {
  useFetchProjectEnvironmentsListQuery,
  useFetchProjectIntegrationsListQuery,
  useFetchProjectRepositoriesListQuery,
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

  const { data: environmentsList, loading: isProjectEnvironmentsListLoading } =
    useFetchProjectEnvironmentsListQuery({
      variables: {
        data: { id: projectId },
      },
    });

  const { data: integrationsList, loading: isProjectIntegrationsListLoading } =
    useFetchProjectIntegrationsListQuery({
      variables: {
        data: { id: projectId },
      },
    });

  return (
    <div className="h-full">
      {isProjectRepositoriesListLoading ||
      isProjectEnvironmentsListLoading ||
      isProjectIntegrationsListLoading ? (
        <div className="flex h-full items-center">
          <Loader full colorful />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <DevelopmentRepositories
            repositories={repositoriesList?.projectRepositoryList ?? []}
            projectId={projectId}
          />
          <DevelopmentEnvironments environments={environmentsList?.projectEnvironmentList ?? []} />
          <DevelopmentIntegrations integrations={integrationsList?.projectIntegrationList ?? []} />
        </div>
      )}
    </div>
  );
};
