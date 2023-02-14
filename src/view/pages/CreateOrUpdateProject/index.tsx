import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { Button, ButtonVariant } from '@ui/components/common/Button';
import { DateField } from '@ui/components/form/DateField';
import { InlineFields } from '@ui/components/form/InlineFields';
import { TextField } from '@ui/components/form/TextField';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { ExtractRouteParams } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { ClientType, DocumentTemplateType } from '~/services/gql/__generated__/globalTypes';
import { CopyTextButton } from '~/view/components/CopyTextButton';
import { SectionContainer } from '~/view/components/SectionContainer';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { useProjectForm } from '~/view/pages/CreateOrUpdateProject/hooks/useProjectForm';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Icon } from '~/view/ui/components/common/Icon';
import { Table } from '~/view/ui/components/common/Table';
import { TextAreaField } from '~/view/ui/components/form/TextAreaField';

import { useFetchDocumentTemplateListQuery, useFetchProjectQuery } from './__generated__/schema';
import { AddOrEditClientTeamMemberModal } from './components/AddOrEditClientTeamMemberModal';
import { GenerateDocumentModal } from './components/GenerateDocumentModal';
import { CLIENT_TEAM_TABLE_COLUMNS } from './consts';

export const CreateOrUpdateProject: FC = () => {
  const {
    value: isAddOrEditClientTeamMemberModalOpen,
    on: openAddOrEditClientTeamMemberModal,
    off: closeAddOrEditClientTeamMemberModal,
  } = useSwitchValue(false);

  const {
    value: isGenerateDocumentModalOpen,
    on: openGenerateDocumentModal,
    off: closeGenerateDocumentModal,
  } = useSwitchValue(false);

  const navigate = useNavigate();
  const params = useParams<ExtractRouteParams<typeof ROUTES.EDIT_PROJECT, string>>();

  const projectId = useMemo(() => (params?.id ? Number(params.id) : undefined), [params]);

  const { data: documentTemplates } = useFetchDocumentTemplateListQuery();

  const { data: projectInfo } = useFetchProjectQuery({
    variables: {
      data: { id: projectId ?? 0 },
    },
    skip: !projectId,
  });

  const { form, handleSubmit } = useProjectForm({
    onSubmitSuccessful: () => navigate(-1),
    prefilledData: projectInfo?.project,
    id: projectId,
  });

  const clientTeamMembers = form.watch('clientTeamMembers');

  const [template, setTemplate] = useState<{ id: number; name: string }>({ id: 0, name: '' });

  const prepeareGenerateDocumentFields = useCallback(
    (templateId: number, templateName: string) => {
      setTemplate({ id: templateId, name: templateName });
      openGenerateDocumentModal();
    },
    [openGenerateDocumentModal],
  );

  const templateById = useMemo(
    () =>
      documentTemplates?.documentTemplateList.find(
        documentTemplate => documentTemplate.id === template.id,
      ),
    [documentTemplates?.documentTemplateList, template.id],
  );

  return (
    <FormProvider {...form}>
      <SidebarLayout>
        <DetailLayout
          title={`${projectId ? 'Edit' : 'New'} project`}
          contentClassName="my-4 mx-6"
          rightHeaderElement={
            <Button
              variant={ButtonVariant.PRIMARY}
              label={`${projectId ? 'Save' : 'Create'} project`}
              className="w-36"
              onClick={handleSubmit}
              isLoading={form.formState.isSubmitting}
            />
          }
        >
          <div className="flex flex-col gap-4">
            <SectionContainer title="General">
              <InlineFields>
                <TextField name="name" control={form.control} label="Project name" required />
                <TextField
                  name="hoursEstimated"
                  control={form.control}
                  label="Hours estimated"
                  required
                />
              </InlineFields>
              <InlineFields>
                <InlineFields>
                  <DateField name="startDate" control={form.control} label="Start date" required />
                  <DateField
                    name="endDate"
                    control={form.control}
                    label="Estimated end date"
                    required
                  />
                </InlineFields>
                <InlineFields>
                  <div className="relative">
                    <TextField name="design" control={form.control} label="Design link" />
                    <CopyTextButton
                      value={form.watch('design')}
                      className="absolute right-[10px] top-[30px] z-10"
                    />
                  </div>
                  <div className="relative">
                    <TextField name="roadmap" control={form.control} label="Roadmap link" />
                    <CopyTextButton
                      value={form.watch('roadmap')}
                      className="absolute right-[10px] top-[30px] z-10"
                    />
                  </div>
                </InlineFields>
              </InlineFields>
              <TextAreaField name="notes" control={form.control} label="Notes" />
              <div className=" mt-5 flex gap-4">
                {documentTemplates?.documentTemplateList.map((template, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Icon name="documents" size={16} className="text-blue" />
                    <button
                      key={template.name}
                      type="button"
                      className="hover:underline"
                      onClick={() => prepeareGenerateDocumentFields(template.id, template.name)}
                    >
                      <span className="text-c1">Generate {template.name}</span>
                    </button>
                  </div>
                ))}
              </div>
            </SectionContainer>
            <SectionContainer title="Client team">
              {clientTeamMembers.length === 0 && (
                <EmptyState iconName="users" label="No members here yet" />
              )}
              {!!clientTeamMembers.length && (
                <Table
                  className="mt-3"
                  data={clientTeamMembers as ClientType[]}
                  columns={CLIENT_TEAM_TABLE_COLUMNS}
                />
              )}
              <Button
                variant={ButtonVariant.SECONDARY}
                label="Add team member"
                withIcon="add"
                className="w-[170px] mt-3"
                onClick={openAddOrEditClientTeamMemberModal}
              />
              <AddOrEditClientTeamMemberModal
                isOpen={isAddOrEditClientTeamMemberModalOpen}
                close={closeAddOrEditClientTeamMemberModal}
                isEditMode={false}
              />
            </SectionContainer>
          </div>
        </DetailLayout>
        <GenerateDocumentModal
          isOpen={isGenerateDocumentModalOpen}
          close={closeGenerateDocumentModal}
          template={templateById as DocumentTemplateType}
        />
      </SidebarLayout>
    </FormProvider>
  );
};
