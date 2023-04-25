import { useSearchParams } from '@appello/web/lib/hooks/useSearchParams';
import { Button, ButtonVariant } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { Checkbox } from '@appello/web-ui';
import { InlineFields } from '@appello/web-ui';
import React, { FC, useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { RepositoryTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

import { useFetchAllProjectsQuery } from '../ProjectDetails/__generated__/schema';
import {
  useFetchBoilerplateListQuery,
  useFetchTechnologiesListQuery,
} from './__generated__/schema';
import { useCreateRepositoryForm } from './hooks/useCreateRepositoryForm';
import styles from './styles.module.scss';

export const CreateRepositoryPage: FC = () => {
  const navigate = useNavigate();
  const searchParams = useSearchParams();

  const { data: allProjects } = useFetchAllProjectsQuery({
    variables: {
      pagination: { limit: 0 },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: allTechnologies } = useFetchTechnologiesListQuery({
    variables: {
      pagination: { limit: 0 },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: allBoilerplates } = useFetchBoilerplateListQuery();

  const { form, handleSubmit } = useCreateRepositoryForm({
    onSubmitSuccessful: () => navigate(-1),
  });

  const withExistingRepo = useWatch({ control: form.control, name: 'withExistingRepo' });

  useEffect(() => {
    if (searchParams.projectId) {
      form.setValue('projectId', +searchParams.projectId);
    }
  }, [searchParams.projectId, form.setValue, form]);

  const projectsOptions = useMemo(
    () => allProjects?.projectsList.results ?? [],
    [allProjects?.projectsList.results],
  );

  const technologiesOptions = useMemo(
    () => allTechnologies?.technologyList.results ?? [],
    [allTechnologies],
  );

  const boilerplatesOptions = useMemo(
    () => allBoilerplates?.boilerplateList ?? [],
    [allBoilerplates?.boilerplateList],
  );

  const repositoryTypeOptions = enumToSelectOptions(RepositoryTypeChoice);

  return (
    <SidebarLayout>
      <DetailLayout
        title="Add repository"
        contentClassName="my-4 mx-6 shadow-4 rounded-md bg-white p-7"
        rightHeaderElement={
          <Button
            variant={ButtonVariant.PRIMARY}
            label="Create repository"
            className="w-36"
            onClick={handleSubmit}
            isLoading={form.formState.isSubmitting}
          />
        }
      >
        <section className={styles['section']}>
          <h2 className={styles['section__heading']}>Repository info</h2>
          <InlineFields>
            <TextField name="name" control={form.control} label="Name" required />
            <SelectField
              name="projectId"
              options={projectsOptions}
              control={form.control}
              label="Project"
              required
              disabled={!!searchParams.projectId}
            />
          </InlineFields>
          <InlineFields>
            <SelectField
              name="type"
              options={repositoryTypeOptions}
              control={form.control}
              label="Type"
              required
            />
            <SelectField
              name="technologies"
              options={technologiesOptions}
              control={form.control}
              label="Technologies"
              isMulti
              required
            />
          </InlineFields>
        </section>
        <section className={styles['section']}>
          <h2 className={styles['section__heading']}>Git</h2>
          <Checkbox
            {...form.register('withExistingRepo')}
            label="Add existing repository"
            className="mt-4 mb-4"
          />
          <div className="mt-2 form__inline-fields form__field-row grid-cols-3">
            {!withExistingRepo && (
              <SelectField
                name="boilerplateId"
                options={boilerplatesOptions}
                control={form.control}
                label="Boilerplate"
              />
            )}
            {withExistingRepo && (
              <>
                <TextField name="gitRepoId" control={form.control} label="Git repo id" />
                {/* TODO: research if we really need this in UI <TextField name="gitSlug" control={form.control} label="Git slug" /> */}
              </>
            )}
          </div>
          {!withExistingRepo && (
            <div className="flex flex-col">
              <Checkbox label="Use terraform" {...form.register('useTerraform')} className="mt-4" />
              <div className="flex flex-col gap-1">
                <Checkbox label="With relay" {...form.register('withRelay')} className="mt-4" />
                <span className="text-p5 text-gray-2">
                  Works only for GraphQl Boilerplate. Please, consult backend developer if not sure
                </span>
              </div>
            </div>
          )}
        </section>
        <section className={styles['section']}>
          <h2 className={styles['section__heading']}>AWS</h2>
          <div className="flex flex-col gap-1">
            <Checkbox
              label="Do you need AWS secrets?"
              {...form.register('awsSecrets')}
              className="mt-4"
            />
            <span className="text-p5 text-gray-2">
              Set yes for backend repository, consult frontend developer for frontend
            </span>
          </div>
        </section>
      </DetailLayout>
    </SidebarLayout>
  );
};
