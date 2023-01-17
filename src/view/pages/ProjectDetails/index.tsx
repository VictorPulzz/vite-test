import { DateField } from '@ui/components/form/DateField';
import { InlineFields } from '@ui/components/form/InlineFields';
import { SelectField } from '@ui/components/form/SelectField';
import { TextField } from '@ui/components/form/TextField';
import React, { FC } from 'react';
import { ExtractRouteParams } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { useProjectForm } from '~/view/pages/CreateOrUpdateProject/hooks/useProjectForm';

import styles from './styles.module.scss';

export const ProjectDetailsPage: FC = () => {
  const navigate = useNavigate();
  const params = useParams<ExtractRouteParams<typeof ROUTES.EDIT_PROJECT, string>>();
  const projectId = params.id ? Number(params.id) : undefined;

  const { form } = useProjectForm({
    onSubmitSuccessful: () => navigate(-1),
    // todo: deal with projectId can't be undefined wneh backend will be ready
    prefilledData: { id: projectId ?? 0 },
    id: projectId,
  });

  return (
    <SidebarLayout>
      <DetailLayout
        title="Project details"
        contentClassName="my-4 mx-6 shadow-4 rounded-md bg-white p-7"
      >
        <>
          <section className={styles['section']}>
            <h2 className={styles['section__heading']}>Project info</h2>
            <InlineFields>
              <TextField name="name" control={form.control} label="Name" required />
              <TextField name="clientName" control={form.control} label="Client name" />
            </InlineFields>
            <InlineFields>
              <SelectField name="phase" options={[]} control={form.control} label="Phase" />
              <SelectField name="status" options={[]} control={form.control} label="Status" />
            </InlineFields>
            <TextField name="designLink" control={form.control} label="Design link" />
            <InlineFields>
              <InlineFields>
                <DateField name="startDate" control={form.control} label="Start date" />
                <DateField name="endDate" control={form.control} label="End date" />
              </InlineFields>
              <TextField name="hoursEstimated" control={form.control} label="Hours estimated" />
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
