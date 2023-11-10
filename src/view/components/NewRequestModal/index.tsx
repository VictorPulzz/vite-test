import { Nullable, useSelectOptions } from '@appello/common';
import {
  Button,
  ButtonVariant,
  DateField,
  InlineFields,
  Loader,
  Modal,
  ModalProps,
  SelectField,
  TextAreaField,
  TextField,
} from '@appello/web-ui';
import clsx from 'clsx';
import { isBefore, startOfToday } from 'date-fns';
import React, { FC, useEffect } from 'react';
import { toast } from 'react-hot-toast';
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
      toast.success('Your request has been sent', { duration: 2500 });
    },
    repositoryId,
  });

  useEffect(() => {
    if (requestType) {
      form.setValue('type', requestType);
      form.setValue('projectId', Number(projectId));
    }
  }, [form, projectId, repositoryId, requestType]);

  const typeField = form.watch('type');
  const assignedRoleIdField = form.watch('assignedRoleId');
  const projectIdField = form.watch('projectId');

  const { data: rolesList, loading: isLoadingRolesList } = useFetchRolesListQuery();

  const { data: allUsers, loading: isLoadingAllUsers } = useFetchUserGlossaryListQuery({
    variables: {
      filters: { roleId: [Number(assignedRoleIdField)] },
    },
    skip: !assignedRoleIdField,
    fetchPolicy: 'cache-and-network',
  });

  const { data: allProjects, loading: isLoadingAllProjects } = useFetchProjectGlossaryListQuery({
    variables: {
      filters: {
        hasRepositories: typeField === RequestTypeChoice.ACCESS_REPOSITORY ? true : null,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: allTechnologies, loading: isLoadingAllTechnologies } =
    useFetchTechnologiesListQuery({
      fetchPolicy: 'cache-and-network',
    });

  const { data: allRepositories } = useFetchRepositoryGlossaryListQuery({
    variables: {
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

  const isLoading =
    isLoadingRolesList || isLoadingAllUsers || isLoadingAllProjects || isLoadingAllTechnologies;

  return (
    <Modal
      close={close}
      contentClassName="w-[600px]"
      isOpen={isOpen}
      title="New request"
      onAfterClose={resetForm}
    >
      {isLoading ? (
        <div className="flex items-center h-[340px]">
          <Loader colorful full />
        </div>
      ) : (
        <>
          <InlineFields>
            <SelectField
              required
              control={form.control}
              disabled={!!requestType}
              label="Request type"
              name="type"
              options={requestTypesOptions}
            />
            <SelectField
              required
              control={form.control}
              label="Assigned to group"
              name="assignedRoleId"
              options={rolesOptions}
            />
          </InlineFields>
          <InlineFields>
            <SelectField
              control={form.control}
              disabled={!assignedRoleIdField}
              label="Assigned to person"
              name="assignedToId"
              options={usersOptions}
            />
            <DateField
              className="z-100"
              control={form.control}
              disabledDate={date => isBefore(date, startOfToday())}
              label="Due date"
              name="dueDate"
            />
          </InlineFields>
          <TextAreaField
            className={clsx(typeField && 'border-solid border-b border-gray-5 pb-6')}
            control={form.control}
            label="Description"
            name="description"
            placeholder="Short description"
          />
          {typeField === RequestTypeChoice.ACCESS_PROJECT && (
            <SelectField
              required
              control={form.control}
              disabled={!!projectId}
              label="Project"
              name="projectId"
              options={projectsOptions}
            />
          )}
          {typeField === RequestTypeChoice.ACCESS_REPOSITORY && (
            <>
              <SelectField
                required
                control={form.control}
                disabled={!!projectId}
                label="Project"
                name="projectId"
                options={projectsOptions}
              />
              <SelectField
                required
                control={form.control}
                disabled={!!repositoryId}
                label="Repository"
                name="repositoryId"
                options={repositoriesOptions}
              />
              <SelectField
                required
                control={form.control}
                label="Access level"
                name="accessLevel"
                options={repositoryAccessLevelOptions}
              />
            </>
          )}
          {typeField === RequestTypeChoice.CREATION_REPOSITORY && (
            <>
              <SelectField
                required
                control={form.control}
                disabled={!!projectId}
                label="Project"
                name="projectId"
                options={projectsOptions}
              />
              <SelectField
                required
                control={form.control}
                label="Type"
                name="repositoryType"
                options={repositoryTypeOptions}
              />
              <SelectField
                isMulti
                required
                control={form.control}
                label="Technologies"
                name="technologies"
                options={technologiesOptions}
              />
            </>
          )}
          {typeField === RequestTypeChoice.CREATION_ENVIRONMENT && (
            <>
              <SelectField
                required
                control={form.control}
                disabled={!!projectId}
                label="Project"
                name="projectId"
                options={projectsOptions}
              />
              <SelectField
                required
                control={form.control}
                label="Environment"
                name="environment"
                options={environmentOptions}
              />
            </>
          )}
          {typeField === RequestTypeChoice.CREATION_INTEGRATION && (
            <>
              <SelectField
                required
                control={form.control}
                disabled={!!projectId}
                label="Project"
                name="projectId"
                options={projectsOptions}
              />
              <TextField required control={form.control} label="Name" name="integrationName" />
            </>
          )}
          <div className="flex justify-end">
            <Button
              className="mt-6 w-[150px]"
              isLoading={form.formState.isSubmitting}
              label="Create request"
              variant={ButtonVariant.PRIMARY}
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
    </Modal>
  );
};
