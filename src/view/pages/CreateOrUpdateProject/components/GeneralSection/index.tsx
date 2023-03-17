import React, { FC, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { CopyTextButton } from '~/view/components/CopyTextButton';
import { SectionContainer } from '~/view/components/SectionContainer';
import { DateField } from '~/view/ui/components/form/DateField';
import { InlineFields } from '~/view/ui/components/form/InlineFields';
import { SelectField } from '~/view/ui/components/form/SelectField';
import { TextAreaField } from '~/view/ui/components/form/TextAreaField';
import { TextField } from '~/view/ui/components/form/TextField';

import { useFetchPlatformsListQuery } from '../../__generated__/schema';

export const GeneralSection: FC = () => {
  const { control, watch } = useFormContext();

  const { data: platforms } = useFetchPlatformsListQuery({
    variables: {
      pagination: { limit: 0 },
    },
    fetchPolicy: 'cache-and-network',
  });

  const platformsOptions = useMemo(() => platforms?.platformList.results ?? [], [platforms]);

  return (
    <SectionContainer title="General">
      <InlineFields>
        <InlineFields>
          <TextField name="name" control={control} label="Project name" required />
          <TextField name="hoursEstimated" control={control} label="Hours estimated" required />
        </InlineFields>
        <SelectField
          name="platforms"
          options={platformsOptions}
          control={control}
          label="Platforms"
          isMulti
        />
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
