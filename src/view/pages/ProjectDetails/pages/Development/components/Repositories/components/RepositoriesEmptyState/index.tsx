import { Button, ButtonVariant, IconContainer } from '@appello/web-ui';
import React, { useMemo } from 'react';
import { generatePath } from 'react-router';
import { useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { SectionContainer } from '~/view/components/SectionContainer';

export const RepositoriesEmptyState: React.FC = () => {
  const params = useParams();
  const projectId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  return (
    <SectionContainer containerClassName="flex items-center">
      <IconContainer
        className="w-12 h-12 bg-blue/10 mr-[14px]"
        iconClassName="w-6 h-6"
        name="information"
      />
      <div>
        <p className="text-h6 font-bold mb-[2px]">Repositories</p>
        <p className="text-c1 text-gray-1">
          To create repository for this project you need to create the project in{' '}
          <span className="text-black-2">Bitbucket</span>
        </p>
      </div>
      <Button
        className="w-[142px] ml-auto"
        label="Create"
        to={generatePath(ROUTES.PROJECT_DETAILS_INTEGRATIONS, { id: projectId })}
        variant={ButtonVariant.PRIMARY}
        withIcon="cloudConnection"
      />
    </SectionContainer>
  );
};
