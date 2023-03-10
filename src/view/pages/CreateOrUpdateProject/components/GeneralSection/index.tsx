import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { CopyTextButton } from '~/view/components/CopyTextButton';
import { SectionContainer } from '~/view/components/SectionContainer';
import { DateField } from '~/view/ui/components/form/DateField';
import { InlineFields } from '~/view/ui/components/form/InlineFields';
import { TextAreaField } from '~/view/ui/components/form/TextAreaField';
import { TextField } from '~/view/ui/components/form/TextField';

export const GeneralSection: FC = () => {
  const { control, watch } = useFormContext();

  return (
    <SectionContainer title="General">
      <InlineFields>
        <TextField name="name" control={control} label="Project name" required />
        <TextField name="hoursEstimated" control={control} label="Hours estimated" required />
      </InlineFields>
      <InlineFields>
        <InlineFields>
          <DateField name="startDate" control={control} label="Start date" required />
          <DateField name="endDate" control={control} label="Estimated end date" required />
        </InlineFields>
        <InlineFields>
          <div className="relative">
            <TextField name="design" control={control} label="Design link" />
            <CopyTextButton
              value={watch('design')}
              className="absolute right-[10px] top-[30px] z-10"
            />
          </div>
          <div className="relative">
            <TextField name="roadmap" control={control} label="Roadmap link" />
            <CopyTextButton
              value={watch('roadmap')}
              className="absolute right-[10px] top-[30px] z-10"
            />
          </div>
        </InlineFields>
      </InlineFields>
      <TextAreaField name="notes" control={control} label="Notes" />
    </SectionContainer>
  );
};
