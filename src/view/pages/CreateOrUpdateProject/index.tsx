import { Button, ButtonVariant } from '@ui/components/common/Button';
import { DateField } from '@ui/components/form/DateField';
import { InlineFields } from '@ui/components/form/InlineFields';
import { TextField } from '@ui/components/form/TextField';
import React, { FC, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { ExtractRouteParams } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { useProjectForm } from '~/view/pages/CreateOrUpdateProject/hooks/useProjectForm';
import { Icon } from '~/view/ui/components/common/Icon';
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

  const copyFieldValue = useCallback((field: string) => {
    navigator.clipboard.writeText(field);
    if (field) {
      toast.success('Copied');
    }
  }, []);
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
          <section className="shadow-4 rounded-md bg-white p-7">
            <h2 className="text-p1 font-bold pb-2">General</h2>
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
                <DateField name="endDate" control={form.control} label="Estimated end date" />
              </InlineFields>
              <InlineFields>
                <div className="relative">
                  <TextField name="design" control={form.control} label="Design link" />
                  <button
                    type="button"
                    className="absolute right-[10px] top-[30px] z-10 text-blue hover:opacity-70"
                    onClick={() => copyFieldValue(form.watch('design'))}
                  >
                    <Icon name="copy" size={14} />
                  </button>
                </div>
                <div className="relative">
                  <TextField name="roadmap" control={form.control} label="Roadmap link" />
                  <button
                    type="button"
                    className="absolute right-[10px] top-[30px] z-10 text-blue hover:opacity-70"
                    onClick={() => copyFieldValue(form.watch('roadmap'))}
                  >
                    <Icon name="copy" size={14} />
                  </button>
                </div>
              </InlineFields>
            </InlineFields>
            <TextAreaField name="notes" control={form.control} label="Notes" />
          </section>
          <section className="shadow-4 rounded-md bg-white p-7">
            <h2 className="text-p1 font-bold pb-2">Client team</h2>
            <Button
              variant={ButtonVariant.SECONDARY}
              label="Add team member"
              withIcon="add"
              className="w-[170px] mt-3"
            />
          </section>
        </div>
      </DetailLayout>
    </SidebarLayout>
  );
};
