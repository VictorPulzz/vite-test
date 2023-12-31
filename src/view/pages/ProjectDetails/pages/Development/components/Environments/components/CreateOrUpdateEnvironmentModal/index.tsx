import {
  Button,
  ButtonVariant,
  Checkbox,
  InlineFields,
  Loader,
  TextAreaField,
} from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { nanoid } from '@reduxjs/toolkit';
import React, { FC } from 'react';
import { FormProvider, useFieldArray } from 'react-hook-form';

import { ProjectEnvironmentChoice } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { useFetchProjectEnvironmentQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { CredentialsItem } from './components/CredentialsItem';
import {
  ProjectEnvironmentFormValues,
  useProjectEnvironmentForm,
} from './hooks/useProjectEnvironmentForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  environmentId?: number;
}

export const CreateOrUpdateEnvironmentModal: FC<Props> = ({ isOpen, close, environmentId }) => {
  const { data: projectEnvironmentInfo, loading } = useFetchProjectEnvironmentQuery({
    variables: {
      input: { id: Number(environmentId) },
    },
    skip: !environmentId,
    fetchPolicy: 'cache-and-network',
  });

  const { form, handleSubmit, resetForm } = useProjectEnvironmentForm({
    onSubmitSuccessful: () => close(),
    prefilledData: projectEnvironmentInfo?.projectEnvironment,
  });

  const { append: appendCredentials, remove: removeCredentials } =
    useFieldArray<ProjectEnvironmentFormValues>({
      control: form.control,
      name: 'credentials',
    });

  const credentialsFields = form.watch('credentials');

  const emptyCredentialsField = {
    id: nanoid(6),
    type: null,
    shortDescription: '',
    url: '',
    login: '',
    password: '',
    isNew: true,
  };

  const projectEnvironmentsOptions = enumToSelectOptions(ProjectEnvironmentChoice);

  return (
    <FormProvider {...form}>
      <Modal
        close={close}
        contentClassName="w-[62.5rem]"
        isOpen={isOpen}
        title={`${
          environmentId
            ? `Edit ${convertUppercaseToReadable(
                projectEnvironmentInfo?.projectEnvironment.name ?? '',
              )}`
            : 'Create new'
        } environment`}
        onAfterClose={resetForm}
      >
        {loading && (
          <div className="flex items-center h-[36.125rem]">
            <Loader colorful full />
          </div>
        )}
        {!loading && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-h6 mb-2">Main</h2>
              <InlineFields>
                <TextField control={form.control} label="Environment name" name="title" />
                <SelectField
                  required
                  control={form.control}
                  label="Environment"
                  name="environment"
                  options={projectEnvironmentsOptions}
                />
              </InlineFields>
              <TextAreaField control={form.control} label="Notes" maxLength={500} name="notes" />
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <h2 className="text-h6 mb-2">Creds</h2>
                <button type="button" onClick={() => appendCredentials(emptyCredentialsField)}>
                  <h2 className="text-p5 text-blue hover:underline">+ Add creds</h2>
                </button>
              </div>
              <div className="flex flex-col gap-4 h-[205px] overflow-auto pr-5">
                {credentialsFields.map((field, index) => (
                  <CredentialsItem
                    index={index}
                    key={field.id}
                    removeCredentials={removeCredentials}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Checkbox
                label="Show creds to every contributors in team"
                {...form.register('showCredsToEveryContributors')}
              />
              <Button
                className="w-[150px]"
                isLoading={form.formState.isSubmitting}
                label={environmentId ? 'Save' : 'Create'}
                variant={ButtonVariant.PRIMARY}
                onClick={handleSubmit}
              />
            </div>
          </div>
        )}
      </Modal>
    </FormProvider>
  );
};
