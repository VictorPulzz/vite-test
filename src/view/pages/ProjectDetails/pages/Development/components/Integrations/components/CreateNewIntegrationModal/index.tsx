import { Button, ButtonVariant } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { InlineFields } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { nanoid } from '@reduxjs/toolkit';
import clsx from 'clsx';
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
      close={close}
      contentClassName="w-5/9"
      isOpen={isOpen}
      title="Create new integration"
      onAfterClose={resetForm}
    >
      <div className="flex flex-col">
        <InlineFields>
          <TextField control={control} label="Integration name" name="name" />
          <SelectField
            control={control}
            label="Environment"
            name="environment"
            options={projectEnvironmentsOptions}
          />
        </InlineFields>
        <InlineFields>
          <TextField control={control} label="Login" name="credential.login" />
          <TextField control={control} label="Password" name="credential.password" />
        </InlineFields>
        <TextField control={control} label="Account url" name="credential.url" />
      </div>
      {!!fields.length && <div className="mt-2 border-solid border-b border-gray-5 pb-5" />}
      <div className="mt-4 ">
        {fields.map((_, index) => (
          <div className="mt-3 flex justify-between gap-3" key={nanoid()}>
            <div className="form__inline-fields form__field-row flex-auto">
              <TextField control={control} label="Key title" name={`keys.${index}.title`} />
              <TextField control={control} label="Key value" name={`keys.${index}.value`} />
            </div>
            <button
              className={clsx('w-[20px] mt-4', {
                'mb-4': !!formState.errors.keys?.[index],
              })}
              type="button"
              onClick={() => remove(index)}
            >
              <Icon name="close" size={15} />
            </button>
          </div>
        ))}
      </div>
      <button className="w-full" type="button" onClick={() => append(emptyKeysField)}>
        <h2 className="mt-3 text-p2 text-blue hover:underline">+ Add key</h2>
      </button>
      <Button
        className="mt-6"
        isLoading={formState.isSubmitting}
        label="Send"
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
      />
    </Modal>
  );
};
