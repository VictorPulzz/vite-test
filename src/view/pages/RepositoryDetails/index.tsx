import React, { FC, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Loader } from '~/view/ui/components/common/Loader';

import { useFetchRepositoryDetailsQuery } from './__generated__/schema';
import { RepositoryDetailsTabs } from './components/RepositoryDetailsTabs';
import { RepositoryMainInfo } from './components/RepositoryMainInfo';

export const RepositoryDetailsPage: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const repositoryId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const { data, loading } = useFetchRepositoryDetailsQuery({
    variables: {
      input: { id: repositoryId },
    },
  });

  return (
    <SidebarLayout>
      <DetailLayout
        title="Repository details"
        onClickBackButton={() => navigate(-1)}
        contentClassName="flex-auto"
      >
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
