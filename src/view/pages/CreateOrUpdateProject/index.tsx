import { Button, ButtonVariant } from '@ui/components/common/Button';
import { DateField } from '@ui/components/form/DateField';
import { InlineFields } from '@ui/components/form/InlineFields';
import { TextField } from '@ui/components/form/TextField';
import React, { FC, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { useCreateProjectForm } from '~/view/pages/CreateOrUpdateProject/hooks/useCreateProjectForm';
import { Icon } from '~/view/ui/components/common/Icon';
import { TextAreaField } from '~/view/ui/components/form/TextAreaField';

export const CreateOrUpdateProject: FC = () => {
  const navigate = useNavigate();

  const {
    form: { control, formState, watch },
    handleSubmit,
  } = useCreateProjectForm({
    onSubmitSuccessful: () => navigate(-1),
  });

  // const { fields, append } = useFieldArray({
  //   control,
  //   name: 'clientTeamMembers',
  // });

  // const clientTeamMemberFields = { name: '', email: '', phone: '', position: '', notes: '' };

  const copyFieldValue = useCallback((field: string) => {
    navigator.clipboard.writeText(field);
    if (field) {
      toast.success('Copied');
    }
  }, []);

  return (
    <SidebarLayout>
      <DetailLayout
        title="New project"
        contentClassName="my-4 mx-6"
        rightHeaderElement={
          <Button
            variant={ButtonVariant.PRIMARY}
            label="Create project"
            className="w-36"
            onClick={handleSubmit}
            isLoading={formState.isSubmitting}
          />
        }
      >
        <div className="flex flex-col gap-4">
          <section className="shadow-4 rounded-md bg-white p-7">
            <h2 className="text-p1 font-bold pb-2">General</h2>
            <InlineFields>
              <TextField name="name" control={control} label="Project name" required />
              <TextField name="hoursEstimated" control={control} label="Hours estimated" required />
            </InlineFields>
            <InlineFields>
              <InlineFields>
                <DateField name="startDate" control={control} label="Start date" required />
                <DateField name="endDate" control={control} label="Estimated end date" />
              </InlineFields>
              <InlineFields>
                <div className="relative">
                  <TextField name="design" control={control} label="Design link" />
                  <button
                    type="button"
                    className="absolute right-[10px] top-[30px] z-10 text-blue hover:opacity-70"
                    onClick={() => copyFieldValue(watch('design'))}
                  >
                    <Icon name="copy" size={14} />
                  </button>
                </div>
                <div className="relative">
                  <TextField name="roadmap" control={control} label="Roadmap link" />
                  <button
                    type="button"
                    className="absolute right-[10px] top-[30px] z-10 text-blue hover:opacity-70"
                    onClick={() => copyFieldValue(watch('roadmap'))}
                  >
                    <Icon name="copy" size={14} />
                  </button>
                </div>
              </InlineFields>
            </InlineFields>
            <TextAreaField name="notes" control={control} label="Notes" />
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
