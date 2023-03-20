import { useSearchParams } from '@appello/web/lib/hooks/useSearchParams';
import { Button, ButtonVariant } from '@ui/components/common/Button';
import { SelectField } from '@ui/components/form/SelectField';
import { TextField } from '@ui/components/form/TextField';
import React, { FC, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { RepositoryTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Checkbox } from '~/view/ui/components/form/Checkbox';
import { InlineFields } from '~/view/ui/components/form/InlineFields';

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

  const {
    form: { register, control, formState, setValue },
    handleSubmit,
  } = useCreateRepositoryForm({
    onSubmitSuccessful: () => navigate(-1),
  });

  useEffect(() => {
    if (searchParams.projectId) {
      setValue('projectId', +searchParams.projectId);
    }
  }, [searchParams.projectId, setValue]);

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
            isLoading={formState.isSubmitting}
          />
        }
      >
        <section className={styles['section']}>
          <h2 className={styles['section__heading']}>Repository info</h2>
          <InlineFields>
            <TextField name="name" control={control} label="Name" required />
            <SelectField
              name="projectId"
              options={projectsOptions}
              control={control}
              label="Project"
              required
              // TODO add disabled if searchParams.projectId===true
            />
          </InlineFields>
          <InlineFields>
            <SelectField
              name="type"
              options={repositoryTypeOptions}
              control={control}
              label="Type"
              required
            />
            <SelectField
              name="technologies"
              options={technologiesOptions}
              control={control}
              label="Technologies"
              isMulti
            />
          </InlineFields>
        </section>
        <section className={styles['section']}>
          <h2 className={styles['section__heading']}>Git</h2>
          <div className="mt-2 form__inline-fields form__field-row grid-cols-3">
            <SelectField
              name="boilerplateId"
              options={boilerplatesOptions}
              control={control}
              label="Boilerplate"
              required
            />
            <TextField name="gitRepoId" control={control} label="Git repo id" required />
            <TextField name="gitSlug" control={control} label="Git slug" required />
          </div>
          <div className="flex flex-col">
            <Checkbox label="Use terraform" {...register('useTerraform')} className="mt-4" />
            <div className="flex flex-col gap-1">
              <Checkbox label="With relay" {...register('withRelay')} className="mt-4" />
              <span className="text-c1 text-gray-2">
                Works only for GraphQl Boilerplate. Please, consult backend developer if not sure
              </span>
            </div>
          </div>
        </section>
        <section className={styles['section']}>
          <h2 className={styles['section__heading']}>AWS</h2>
          <div className="flex flex-col gap-1">
            <Checkbox
              label="Do you need AWS secrets?"
              {...register('awsSecrets')}
              className="mt-4"
            />
            <span className="text-c1 text-gray-2">
              Set yes for backend repository, consult frontend developer for frontend
            </span>
          </div>
        </section>
      </DetailLayout>
    </SidebarLayout>
  );
};
