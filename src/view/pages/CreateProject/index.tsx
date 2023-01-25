import { Button, ButtonSize, ButtonVariant } from '@ui/components/common/Button';
import { DateField } from '@ui/components/form/DateField';
import { InlineFields } from '@ui/components/form/InlineFields';
import { SelectField } from '@ui/components/form/SelectField';
import { TextField } from '@ui/components/form/TextField';
import React, { FC } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { useCreateProjectForm } from '~/view/pages/CreateProject/hooks/useCreateProjectForm';
import { TextAreaField } from '~/view/ui/components/form/TextAreaField';

import styles from './styles.module.scss';

// TODO remove  phaseOptions later
// export enum ProjectPhase {
//   SIGNED = 'Signed',
//   DESIGN = 'Design',
//   DEVELOPMENT = 'Development',
//   SUPPORT = 'Support',
//   FINISHED = 'Finished',
//   ARCHIVED = 'Archived',
// }

// TODO remove  phaseOptions later
// const phaseOptions = [
//   {
//     label: ProjectPhase.SIGNED,
//     value: ProjectPhase.SIGNED,
//   },
//   {
//     label: ProjectPhase.DESIGN,
//     value: ProjectPhase.DESIGN,
//   },
//   {
//     label: ProjectPhase.DEVELOPMENT,
//     value: ProjectPhase.DEVELOPMENT,
//   },
//   {
//     label: ProjectPhase.SUPPORT,
//     value: ProjectPhase.SUPPORT,
//   },
//   {
//     label: ProjectPhase.FINISHED,
//     value: ProjectPhase.FINISHED,
//   },
//   {
//     label: ProjectPhase.ARCHIVED,
//     value: ProjectPhase.ARCHIVED,
//   },
// ];

export const CreateProjectPage: FC = () => {
  const navigate = useNavigate();

  const {
    form: { control, formState },
    handleSubmit,
  } = useCreateProjectForm({
    onSubmitSuccessful: () => navigate(-1),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'clientTeamMembers',
  });

  const clientTeamMemberFields = { name: '', position: '', email: '', phone: '' };

  return (
    <SidebarLayout>
      <DetailLayout
        title="Add project"
        contentClassName="my-4 mx-6 shadow-4 rounded-md bg-white p-7"
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
        <>
          <section className={styles['section']}>
            <h2 className={styles['section__heading']}>Project info</h2>
            <InlineFields>
              <TextField name="name" control={control} label="Name" required />
              <SelectField name="status" options={[]} control={control} label="Status" />
            </InlineFields>
            <InlineFields>
              <InlineFields>
                <DateField
                  name="estimatedStartDate"
                  control={control}
                  label="Estimated start date"
                  required
                />
                <DateField
                  name="estimatedEndDate"
                  control={control}
                  label="Estimated end date"
                  required
                />
              </InlineFields>
              <TextField name="designLink" control={control} label="Design link" />
            </InlineFields>
            <TextAreaField name="notes" control={control} label="Notes" />
          </section>
          <section className={styles['section']}>
            <h2 className={styles['section__heading']}>Client info</h2>
            <InlineFields>
              <TextField name="clientName" control={control} label="Client name" required />
              <TextField name="clientPhone" control={control} label="Phone" required />
              <TextField name="clientEmail" control={control} label="Email" required />
              <TextField name="clientNotes" control={control} label="Notes " />
            </InlineFields>
          </section>
          <section>
            <h2 className={styles['section__heading']}>Client team</h2>
            <div>
              {fields.map((field, index) => (
                <div key={field.id} className={styles['section']}>
                  <InlineFields>
                    <TextField
                      name={`clientTeamMembers.${index}.name`}
                      control={control}
                      label="Name"
                    />
                    <TextField
                      name={`clientTeamMembers.${index}.position`}
                      control={control}
                      label="Position"
                    />
                    <TextField
                      name={`clientTeamMembers.${index}.email`}
                      control={control}
                      label="Email"
                    />
                    <TextField
                      name={`clientTeamMembers.${index}.phone`}
                      control={control}
                      label="Phone "
                    />
                  </InlineFields>
                  <Button
                    variant={ButtonVariant.NEGATIVE}
                    label="Remove"
                    className="w-20 mt-4"
                    onClick={() => remove(index)}
                    size={ButtonSize.SMALL}
                  />
                </div>
              ))}
            </div>
            <Button
              variant={ButtonVariant.SECONDARY}
              label="+ Add team member"
              className="mt-6 w-1/2"
              onClick={() => append(clientTeamMemberFields)}
            />
          </section>
        </>
      </DetailLayout>
    </SidebarLayout>
  );
};
