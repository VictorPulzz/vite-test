import { Button, ButtonVariant } from '@ui/components/common/Button';
import React, { FC, useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import { ExtractRouteParams } from 'react-router';
import { useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { DocumentTemplateType } from '~/services/gql/__generated__/globalTypes';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Loader } from '~/view/ui/components/common/Loader';

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

  const { data: documentTemplates, loading } = useFetchDocumentTemplateListQuery();

  const { form, handleSubmit, isLoading } = useProjectForm({
    prefilledData: projectInfo?.project,
    id: projectId,
    templates: documentTemplates?.documentTemplateList as DocumentTemplateType[],
  });

  return (
    <FormProvider {...form}>
      <SidebarLayout>
        <DetailLayout
          title={`${projectId ? 'Edit' : 'New'} project`}
          contentClassName="my-4 mx-6 flex-auto"
          rightHeaderElement={
            <Button
              variant={ButtonVariant.PRIMARY}
              label={`${projectId ? 'Save' : 'Create'} project`}
              className="w-36"
              onClick={handleSubmit}
              isLoading={isLoading}
            />
          }
        >
          {loading && (
            <div className="flex h-full items-center">
              <Loader full colorful />
            </div>
          )}
          {!loading && (
            <div className="flex flex-col gap-4">
              <GeneralSection projectId={projectId} />
              {!projectId && documentTemplates?.documentTemplateList.length !== 0 && (
                <GenerateDocumentsSection
                  templates={documentTemplates?.documentTemplateList as DocumentTemplateType[]}
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
