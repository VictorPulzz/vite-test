import { DateField, Loader, useSelectOptions } from '@appello/web-ui';
import { InlineFields } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { TextAreaField } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { Button, ButtonVariant } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ProjectEnvironmentChoice,
  RepositoryAccessLevelChoice,
  RepositoryTypeChoice,
  RequestTypeChoice,
} from '~/services/gql/__generated__/globalTypes';
import {
  useFetchProjectGlossaryListQuery,
  useFetchRepositoryGlossaryListQuery,
  useFetchUserGlossaryListQuery,
} from '~/services/gql/__generated__/schema';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';

import { useFetchRolesListQuery, useFetchTechnologiesListQuery } from './__generated__/schema';
import { useCreateNewRequestForm } from './hooks/useCreateNewRequest';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  requestType?: RequestTypeChoice;
  projectId?: Nullable<number>;
  repositoryId?: number;
}

export const NewRequestModal: FC<Props> = ({
  isOpen,
  close,
  requestType,
  projectId,
  repositoryId,
}) => {
  const navigate = useNavigate();

  const { form, handleSubmit, resetForm } = useCreateNewRequestForm({
    onSubmitSuccessful: () => {
      if (
        requestType === RequestTypeChoice.ACCESS_PROJECT ||
        requestType === RequestTypeChoice.ACCESS_REPOSITORY
      ) {
        navigate(-1);
      }
      close();
    },
    repositoryId,
  });

  useEffect(() => {
    if (requestType) {
      form.setValue('type', requestType);
      form.setValue('projectId', Number(projectId));
    }
  }, [form, projectId, repositoryId, requestType]);

  const { data: rolesList, loading: isLoadingRolesList } = useFetchRolesListQuery();

  const { data: allUsers, loading: isLoadingAllUsers } = useFetchUserGlossaryListQuery({
    variables: {
      pagination: {
        limit: 0,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: allProjects, loading: isLoadingAllProjects } = useFetchProjectGlossaryListQuery({
    variables: {
      pagination: {
        limit: 0,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: allTechnologies, loading: isLoadingAllTechnologies } =
    useFetchTechnologiesListQuery({
      variables: {
        pagination: { limit: 0 },
      },
      fetchPolicy: 'cache-and-network',
    });

  const projectIdField = form.watch('projectId');

  const { data: allRepositories } = useFetchRepositoryGlossaryListQuery({
    variables: {
      pagination: {
        limit: 0,
      },
      filters: { projectId: projectIdField },
    },
    skip: !projectIdField,
    fetchPolicy: 'cache-and-network',
  });

  const usersOptions = useSelectOptions(allUsers?.userGlossaryList.results, {
    value: 'id',
    label: 'fullName',
  });

  const rolesOptions = useSelectOptions(rolesList?.rolesList, {
    value: 'value',
    label: 'label',
  });

  const projectsOptions = useSelectOptions(allProjects?.projectGlossaryList.results, {
    value: 'id',
    label: 'name',
  });

  const repositoriesOptions = useSelectOptions(allRepositories?.repositoryGlossaryList.results, {
    value: 'id',
    label: 'name',
  });

  const technologiesOptions = useSelectOptions(allTechnologies?.technologyList.results, {
    value: 'value',
    label: 'label',
  });

  const requestTypesOptions = enumToSelectOptions(RequestTypeChoice);
  const repositoryAccessLevelOptions = enumToSelectOptions(RepositoryAccessLevelChoice);
  const repositoryTypeOptions = enumToSelectOptions(RepositoryTypeChoice);
  const environmentOptions = enumToSelectOptions(ProjectEnvironmentChoice);

  const typeField = form.watch('type');

  const isLoading =
    isLoadingRolesList || isLoadingAllUsers || isLoadingAllProjects || isLoadingAllTechnologies;

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-[600px]"
      title="New request"
      onAfterClose={resetForm}
    >
      {isLoading ? (
        <div className="flex items-center h-[340px]">
          <Loader full colorful />
        </div>
      ) : (
        <>
          <InlineFields>
            <SelectField
              name="type"
              options={requestTypesOptions}
              control={form.control}
              label="Request type"
              required
              disabled={!!requestType}
            />
            <SelectField
              name="assignedRoleId"
              options={rolesOptions}
              control={form.control}
              label="Assigned to group"
              required
            />
          </InlineFields>
          <InlineFields>
            <SelectField
              name="assignedToId"
              options={usersOptions}
              control={form.control}
              label="Assigned to person"
            />
            <DateField name="dueDate" control={form.control} label="Due date" className="z-100" />
          </InlineFields>
          <TextAreaField
            name="description"
            control={form.control}
            label="Description"
            placeholder="Short description"
            className={clsx(typeField && 'border-solid border-b border-gray-5 pb-6')}
          />
          {typeField === RequestTypeChoice.ACCESS_PROJECT && (
            <SelectField
              name="projectId"
              options={projectsOptions}
              control={form.control}
              label="Project"
              required
              disabled={!!projectId}
            />
          )}
          {typeField === RequestTypeChoice.ACCESS_REPOSITORY && (
            <>
              <SelectField
                name="projectId"
                options={projectsOptions}
                control={form.control}
                label="Project"
                required
                disabled={!!projectId}
              />
              <SelectField
                name="repositoryId"
                options={repositoriesOptions}
                control={form.control}
                label="Repository"
                required
                disabled={!!repositoryId}
              />
              <SelectField
                name="accessLevel"
                options={repositoryAccessLevelOptions}
                control={form.control}
                label="Access level"
                required
              />
            </>
          )}
          {typeField === RequestTypeChoice.CREATION_REPOSITORY && (
            <>
              <SelectField
                name="projectId"
                options={projectsOptions}
                control={form.control}
                label="Project"
                required
                disabled={!!projectId}
              />
              <SelectField
                name="repositoryType"
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
            </>
          )}
          {typeField === RequestTypeChoice.CREATION_ENVIRONMENT && (
            <>
              <SelectField
                name="projectId"
                options={projectsOptions}
                control={form.control}
                label="Project"
                required
                disabled={!!projectId}
              />
              <SelectField
                name="environment"
                options={environmentOptions}
                control={form.control}
                label="Environment"
                required
              />
            </>
          )}
          {typeField === RequestTypeChoice.CREATION_INTEGRATION && (
            <>
              <SelectField
                name="projectId"
                options={projectsOptions}
                control={form.control}
                label="Project"
                required
                disabled={!!projectId}
              />
              <TextField name="integrationName" control={form.control} label="Name" required />
            </>
          )}
          <Button
            variant={ButtonVariant.PRIMARY}
            onClick={handleSubmit}
            label="Create request"
            className="mt-6"
            isLoading={form.formState.isSubmitting}
          />
        </>
      )}
    </Modal>
  );
};
