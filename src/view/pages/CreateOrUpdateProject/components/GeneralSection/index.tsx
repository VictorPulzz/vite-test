import React, { FC, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { StatusEnum } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { CopyTextButton } from '~/view/components/CopyTextButton';
import { SectionContainer } from '~/view/components/SectionContainer';
import { ProjectFormValues } from '~/view/pages/CreateOrUpdateProject/hooks/useProjectForm';
import { DateField } from '~/view/ui/components/form/DateField';
import { InlineFields } from '~/view/ui/components/form/InlineFields';
import { SelectField } from '~/view/ui/components/form/SelectField';
import { TextAreaField } from '~/view/ui/components/form/TextAreaField';
import { TextField } from '~/view/ui/components/form/TextField';

import { useFetchPlatformsListQuery } from '../../__generated__/schema';

interface Props {
  projectId?: number;
}

export const GeneralSection: FC<Props> = ({ projectId }) => {
  const { control, watch } = useFormContext<ProjectFormValues>();

  const { data: platforms } = useFetchPlatformsListQuery({
    variables: {
      pagination: { limit: 0 },
    },
    fetchPolicy: 'cache-and-network',
  });

  const platformsOptions = useMemo(() => platforms?.platformList.results ?? [], [platforms]);
  const statusOptions = [...enumToSelectOptions(StatusEnum)];

  return (
    <SectionContainer title="General">
      <InlineFields>
        <InlineFields>
          <TextField name="name" control={control} label="Project name" required />
          <TextField name="hoursEstimated" control={control} label="Hours estimated" />
        </InlineFields>
        <InlineFields>
          <SelectField
            name="platforms"
            options={platformsOptions}
            control={control}
            label="Platform"
            isMulti
          />
          <SelectField name="status" options={statusOptions} control={control} label="Status" />
        </InlineFields>
      </InlineFields>
      {!!projectId && (
        <InlineFields>
          <InlineFields>
            <DateField name="startDate" control={control} label="Start date" />
            <DateField name="endDate" control={control} label="Estimated end date" />
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
      )}
      <TextAreaField name="notes" control={control} label="Notes" />
    </SectionContainer>
  );
};
