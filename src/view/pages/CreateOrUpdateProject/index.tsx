import { Button, ButtonVariant } from '@ui/components/common/Button';
import { DateField } from '@ui/components/form/DateField';
import { InlineFields } from '@ui/components/form/InlineFields';
import { TextField } from '@ui/components/form/TextField';
import React, { FC, useMemo } from 'react';
import { ExtractRouteParams } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { CopyTextButton } from '~/view/components/CopyTextButton';
import { SectionContainer } from '~/view/components/SectionContainer';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { useProjectForm } from '~/view/pages/CreateOrUpdateProject/hooks/useProjectForm';
import { Checkbox } from '~/view/ui/components/form/Checkbox';
import { TextAreaField } from '~/view/ui/components/form/TextAreaField';

import { useFetchProjectQuery } from './__generated__/schema';

export const CreateOrUpdateProject: FC = () => {
  const navigate = useNavigate();
  const params = useParams<ExtractRouteParams<typeof ROUTES.EDIT_PROJECT, string>>();

  const projectId = useMemo(() => (params?.id ? Number(params.id) : undefined), [params]);

  const { data } = useFetchProjectQuery({
    variables: {
      data: { id: projectId ?? 0 },
    },
    skip: !projectId,
  });

  const { form, handleSubmit } = useProjectForm({
    onSubmitSuccessful: () => navigate(-1),
    prefilledData: data?.project,
    id: projectId,
  });

  const isGenerateServiceAgreementChecked = form.watch('isGenerateServiceAgreement');

  // TODO add clientTeamMembers with useFieldArray
  // const { fields, append } = useFieldArray({
  //   control,
  //   name: 'clientTeamMembers',
  // });

  // const clientTeamMemberFields = { name: '', email: '', phone: '', position: '', notes: '' };

  return (
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
            <div className="flex items-center gap-4 my-4">
              <Checkbox
                label="Generate Design & Prototype Agreement"
                {...form.register('isGenerateDesignAndPrototypeAgreement')}
              />
              <Checkbox
                label="Generate Service agreement"
                {...form.register('isGenerateServiceAgreement')}
              />
            </div>
            {isGenerateServiceAgreementChecked && (
              <InlineFields>
                <TextField name="companyName" control={form.control} label="Company name" />
                <TextField name="companyAcn" control={form.control} label="Company ACN" />
                <TextField name="hourlyRate" control={form.control} label="Hourly rate" />
                <TextField name="depositHours" control={form.control} label="Deposit hours" />
                <TextField name="address" control={form.control} label="Address" />
                <TextField name="abn" control={form.control} label="ABN" />
              </InlineFields>
            )}
          </SectionContainer>
          <SectionContainer title="Client team">
            <Button
              variant={ButtonVariant.SECONDARY}
              label="Add team member"
              withIcon="add"
              className="w-[170px] mt-3"
            />
          </SectionContainer>
        </div>
      </DetailLayout>
    </SidebarLayout>
  );
};
