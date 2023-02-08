import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '~/view/ui/components/common/Loader';

import {
  useFetchProjectEnvironmentsListQuery,
  // useFetchProjectIntegrationsListQuery,
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
    });

  const { data: environmentsList, loading: isProjectEnvironmentsListLoading } =
    useFetchProjectEnvironmentsListQuery({
      variables: {
        data: { id: projectId },
      },
    });

  // const { data: integrationsList, loading: isProjectIntegrationsListLoading } =
  //   useFetchProjectIntegrationsListQuery({
  //     variables: {
  //       data: { id: projectId },
  //     },
  //   });

  // console.log('🚀 ~ file: index.tsx:32 ~ projectIntegrationList', integrationsList);
  return (
    <div>
      {isProjectRepositoriesListLoading || isProjectEnvironmentsListLoading ? (
        <Loader full colorful />
      ) : (
        <div className="flex flex-col gap-5">
          {repositoriesList && (
            <DevelopmentRepositories repositories={repositoriesList?.projectRepositoryList} />
          )}
          {environmentsList && (
            <DevelopmentEnvironments environments={environmentsList.projectEnvironmentList} />
          )}

          <DevelopmentIntegrations />
        </div>
      )}
    </div>
  );
};
