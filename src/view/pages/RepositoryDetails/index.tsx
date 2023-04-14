import { Loader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useFetchRepositoryDetailsQuery } from './__generated__/schema';
import { RepositoryDetailsTabs } from './components/RepositoryDetailsTabs';
import { RepositoryMainInfo } from './components/RepositoryMainInfo';

export const RepositoryDetailsPage: FC = () => {
  const params = useParams();

  const repositoryId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const { data, loading } = useFetchRepositoryDetailsQuery({
    variables: {
      input: { id: repositoryId },
    },
  });

  return (
    <SidebarLayout>
      <DetailLayout title="Repository details" contentClassName="flex-auto">
        {loading && (
          <div className="flex h-full items-center">
            <Loader full colorful />
          </div>
        )}
        {data && (
          <div className="flex gap-5 p-6 h-full">
            <RepositoryMainInfo repository={data?.repository} />
            <RepositoryDetailsTabs />
          </div>
        )}
      </DetailLayout>
    </SidebarLayout>
  );
};
