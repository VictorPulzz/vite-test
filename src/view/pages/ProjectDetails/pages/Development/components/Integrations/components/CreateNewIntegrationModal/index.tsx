import { Button, ButtonVariant } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { InlineFields } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { nanoid } from '@reduxjs/toolkit';
import React, { FC } from 'react';
import { useFieldArray } from 'react-hook-form';

import { ProjectEnvironmentChoice } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';

import { useCreateNewIntegrationForm } from './hooks/useCreateNewIntegrationForm';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {}

export const CreateNewIntegrationModal: FC<Props> = ({ isOpen, close }) => {
  const {
    form: { control, formState },
    handleSubmit,
    resetForm,
  } = useCreateNewIntegrationForm({
    onSubmitSuccessful: () => close(),
  });

  const projectEnvironmentsOptions = enumToSelectOptions(ProjectEnvironmentChoice);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'keys',
  });

  const emptyKeysField = { title: '', value: '' };

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      contentClassName="w-5/9"
      title="Create new integration"
      onAfterClose={resetForm}
    >
      <div className="flex flex-col">
        <InlineFields>
          <TextField name="name" control={control} label="Integration name" />
          <SelectField
            name="environment"
            options={projectEnvironmentsOptions}
            control={control}
            label="Environment"
          />
        </InlineFields>
        <InlineFields>
          <TextField name="credential.login" control={control} label="Login" />
          <TextField name="credential.password" control={control} label="Password" />
        </InlineFields>
        <TextField name="credential.url" control={control} label="Account url" />
      </div>
      {!!fields.length && <div className="mt-2 border-solid border-b border-gray-5 pb-5" />}
      <div className="mt-4 ">
        {fields.map((_, index) => (
          <div key={nanoid()} className="mt-3 flex justify-between gap-3">
            <div className="form__inline-fields form__field-row flex-auto">
              <TextField name={`keys.${index}.title`} control={control} label="Key title" />
              <TextField name={`keys.${index}.value`} control={control} label="Key value" />
            </div>
            <button className="w-[20px] mt-4" type="button" onClick={() => remove(index)}>
              <Icon name="close" size={15} />
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => append(emptyKeysField)}>
        <h2 className="mt-3 text-p2 text-blue hover:underline">+ Add key</h2>
      </button>
      <Button
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
        label="Send"
        className="mt-6"
        isLoading={formState.isSubmitting}
      />
    </Modal>
  );
};
