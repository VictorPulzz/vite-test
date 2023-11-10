import { Button, ButtonVariant } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import { ExtractRouteParams } from 'react-router';
import { useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useFetchDocumentTemplateListQuery, useFetchProjectQuery } from './__generated__/schema';
import { ClientTeamSection } from './components/ClientTeamSection';
import { GeneralSection } from './components/GeneralSection';
import { GenerateDocumentsSection } from './components/GenerateDocumentsSection';
import { useProjectForm } from './hooks/useProjectForm';

export const CreateOrUpdateProject: FC = () => {
  const params = useParams<ExtractRouteParams<typeof ROUTES.EDIT_PROJECT, string>>();

  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  const { data: projectInfo } = useFetchProjectQuery({
    variables: {
      data: { id: projectId },
    },
    skip: !projectId,
  });

  const { data: documentTemplates, loading } = useFetchDocumentTemplateListQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { form, handleSubmit, isLoading } = useProjectForm({
    prefilledData: projectInfo?.project,
    id: projectId,
    templates: documentTemplates?.documentTemplateList.results ?? [],
  });

  return (
    <FormProvider {...form}>
      <SidebarLayout>
        <DetailLayout
          contentClassName="my-4 mx-6 flex-auto"
          rightHeaderElement={
            <Button
              className="w-36"
              isLoading={isLoading}
              label={`${projectId ? 'Save' : 'Create'} project`}
              variant={ButtonVariant.PRIMARY}
              onClick={handleSubmit}
            />
          }
          title={`${projectId ? 'Edit' : 'New'} project`}
        >
          {loading && (
            <div className="flex h-full items-center">
              <Loader colorful full />
            </div>
          )}
          {!loading && (
            <div className="flex flex-col gap-4">
              <GeneralSection projectId={projectId} />
              {!projectId && documentTemplates?.documentTemplateList.results.length !== 0 && (
                <GenerateDocumentsSection
                  templates={documentTemplates?.documentTemplateList.results ?? []}
                />
              )}
              <ClientTeamSection />
            </div>
          )}
        </DetailLayout>
      </SidebarLayout>
    </FormProvider>
  );
};
