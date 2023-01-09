import { Button, ButtonVariant } from '@ui/components/common/Button';
import { DateField } from '@ui/components/form/DateField';
import { InlineFields } from '@ui/components/form/InlineFields';
import { SelectField } from '@ui/components/form/SelectField';
import { TextField } from '@ui/components/form/TextField';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { ExtractRouteParams } from 'react-router';
import { useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import styles from './styles.module.scss';

export enum ProjectPhase {
  SIGNED = 'Signed',
  DESIGN = 'Design',
  DEVELOPMENT = 'Development',
  SUPPORT = 'Support',
  FINISHED = 'Finished',
  ARCHIVED = 'Archived',
}

const phaseOptions = [
  {
    label: ProjectPhase.SIGNED,
    value: ProjectPhase.SIGNED,
  },
  {
    label: ProjectPhase.DESIGN,
    value: ProjectPhase.DESIGN,
  },
  {
    label: ProjectPhase.DEVELOPMENT,
    value: ProjectPhase.DEVELOPMENT,
  },
  {
    label: ProjectPhase.SUPPORT,
    value: ProjectPhase.SUPPORT,
  },
  {
    label: ProjectPhase.FINISHED,
    value: ProjectPhase.FINISHED,
  },
  {
    label: ProjectPhase.ARCHIVED,
    value: ProjectPhase.ARCHIVED,
  },
];

export const CreateOrUpdateProjectPage: FC = () => {
  // const navigate = useNavigate();
  const params = useParams<ExtractRouteParams<typeof ROUTES.EDIT_PROJECT, string>>();
  const clientId = params.id ? Number(params.id) : undefined;
  const isEditMode = !!clientId;
  const form = useForm();

  /* const { data: clientDetails, loading: isClientDetailsLoading } = useFetchClientQuery({
    variables: {
      id: isEditMode ? clientId : 0,
    },
    skip: !isEditMode,
  }); */

  /* const { form, handleSubmit } = useClientForm({
    onSubmitSuccessful: () => navigate(-1),
    prefilledData: clientDetails?.clientDetails,
    id: clientId,
  }); */

  return (
    <SidebarLayout>
      <DetailLayout
        title={isEditMode ? 'Edit project' : 'Add project'}
        contentClassName="my-4 mx-6 shadow-4 rounded-md bg-white p-7"
        rightHeaderElement={
          <Button
            variant={ButtonVariant.PRIMARY}
            label={isEditMode ? 'Save project' : 'Create project'}
            className="w-36"
            // onClick={handleSubmit}
            // isLoading={form.formState.isSubmitting}
          />
        }
      >
        <>
          <section className={styles['section']}>
            <h2 className={styles['section__heading']}>Project info</h2>
            <InlineFields>
              <TextField name="firstName" control={form.control} label="Name" required />
              <TextField name="clientName" control={form.control} label="Client name" />
            </InlineFields>
            <InlineFields>
              <SelectField
                name="phase"
                options={phaseOptions}
                control={form.control}
                label="Phase"
              />
              <SelectField name="status" options={[]} control={form.control} label="Status" />
            </InlineFields>
            <TextField name="designLink" control={form.control} label="Design link" />
            <InlineFields>
              <InlineFields>
                <DateField name="startDate" control={form.control} label="Start date" />
                <DateField name="endDate" control={form.control} label="End date" />
              </InlineFields>
              <TextField name="hours" control={form.control} label="Hours estimated" />
            </InlineFields>
            <SelectField name="pm" options={[]} control={form.control} label="Project manager" />
            <SelectField name="designer" options={[]} control={form.control} label="Designer" />
            <SelectField name="qa" options={[]} control={form.control} label="Quality assurance" />
            <SelectField
              name="frontDev"
              options={[]}
              control={form.control}
              label="Frontend developer"
            />
            <SelectField
              name="backDev"
              options={[]}
              control={form.control}
              label="Backend developer"
            />
            <TextField name="notes" control={form.control} label="Notes" />
          </section>
          <section className={styles['section']}>
            <h2 className={styles['section__heading']}>Repositories</h2>
            <p>TBD</p>
          </section>
          <section className={styles['section']}>
            <h2 className={styles['section__heading']}>Credentials</h2>
            <p>TBD</p>
          </section>
        </>
      </DetailLayout>
    </SidebarLayout>
  );
};
