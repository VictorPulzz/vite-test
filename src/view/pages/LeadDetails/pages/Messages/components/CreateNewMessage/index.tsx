import { Button, ButtonVariant, TextAreaField } from '@appello/web-ui';
import React, { FC } from 'react';

import { SectionContainer } from '~/view/components/SectionContainer';

import { useCreateNewMessageForm } from './hooks/useCreateNewMessageForm';

export const CreateNewMessageSection: FC = () => {
  const {
    form: { control, formState },
    handleSubmit,
  } = useCreateNewMessageForm();

  return (
    <SectionContainer title="Create new message">
      <div className="flex w-full">
        <TextAreaField name="prompt" control={control} label="Prompt" />
      </div>
      <Button
        variant={ButtonVariant.PRIMARY}
        onClick={handleSubmit}
        label="Generate"
        className="mt-6 w-[190px]"
        isLoading={formState.isSubmitting}
      />
    </SectionContainer>
  );
};
