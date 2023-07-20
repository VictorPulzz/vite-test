import { Button, ButtonVariant, Loader } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import React, { FC } from 'react';

import { ProjectEnvironmentChoice } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { useFetchProjectEnvironmentQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import { useProjectEnvironmentForm } from './hooks/useProjectEnvironmentForm';

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

  const projectEnvironmentsOptions = enumToSelectOptions(ProjectEnvironmentChoice);

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      contentClassName="w-5/9"
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
        <div className="flex items-center h-[382px]">
          <Loader full colorful />
        </div>
      )}
      {!loading && (
        <>
          <div>
            <SelectField
              name="environment"
              options={projectEnvironmentsOptions}
              control={form.control}
              label="Environment"
              required
            />
            <TextField name="title" control={form.control} label="Name" />
            <div className="grid grid-cols-2 gap-x-5 mt-4">
              <div>
                <h2 className="text-p1 font-bold pb-2">Frontend credentials</h2>
                <TextField name="frontendCredentials.url" control={form.control} label="Url" />
                <TextField name="frontendCredentials.login" control={form.control} label="Login" />
                <TextField
                  name="frontendCredentials.password"
                  control={form.control}
                  label="Password"
                />
              </div>
              <div>
                <h2 className="text-p1 font-bold pb-2">Backend credentials</h2>
                <TextField name="backendCredentials.url" control={form.control} label="Url" />
                <TextField name="backendCredentials.login" control={form.control} label="Login" />
                <TextField
                  name="backendCredentials.password"
                  control={form.control}
                  label="Password"
                />
              </div>
            </div>
          </div>
          <Button
            variant={ButtonVariant.PRIMARY}
            onClick={handleSubmit}
            label="Create"
            className="mt-6"
            isLoading={form.formState.isSubmitting}
          />
        </>
      )}
    </Modal>
  );
};
