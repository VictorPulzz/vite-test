import { DateField, Icon } from '@appello/web-ui';
import { InlineFields } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { TextAreaField } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { useSelectOptions } from '@appello/web-ui';
import React, { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { ProjectPhaseChoice } from '~/services/gql/__generated__/globalTypes';
import { copyTextValue } from '~/utils/copyTextValue';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { SectionContainer } from '~/view/components/SectionContainer';
import { ProjectFormValues } from '~/view/pages/CreateOrUpdateProject/hooks/useProjectForm';

import {
  useFetchPlatformsListQuery,
  useFetchProjectStatusesListQuery,
} from '../../__generated__/schema';

interface Props {
  projectId?: number;
}

const DEFAULT_STATUS_ID = 1;

export const GeneralSection: FC<Props> = ({ projectId }) => {
  const { control, setValue } = useFormContext<ProjectFormValues>();

  const { data: platforms } = useFetchPlatformsListQuery({
    fetchPolicy: 'cache-and-network',
  });
  const { data: statuses } = useFetchProjectStatusesListQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (statuses?.projectStatusesList.results) {
      setValue('status', DEFAULT_STATUS_ID);
    }
  }, [setValue, statuses?.projectStatusesList.results]);

  const platformsOptions = useSelectOptions(platforms?.platformList.results, {
    value: 'value',
    label: 'label',
  });

  const statusesOptions = useSelectOptions(statuses?.projectStatusesList.results, {
    value: 'value',
    label: 'label',
  });

  const phasesOptions = enumToSelectOptions(ProjectPhaseChoice);

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
          <SelectField name="status" options={statusesOptions} control={control} label="Status" />
        </InlineFields>
      </InlineFields>
      {!!projectId && (
        <>
          <InlineFields>
            <div>
              <InlineFields>
                <DateField name="startDate" control={control} label="Start date" />
                <DateField name="endDate" control={control} label="Estimated end date" />
              </InlineFields>
              <div className="flex items-center gap-1 mt-2">
                <Icon name="information" className="w-4 h-4 text-blue" />
                <span className="text-gray-1 text-p5">
                  Start date and Estimated end date will be used for calculating the Estimated days
                </span>
              </div>
            </div>
            <InlineFields>
              <TextField
                name="design"
                control={control}
                label="Design link"
                iconAfterElement={<Icon name="copy" className="text-accent" />}
                onIconAfterClick={copyTextValue}
              />
              <TextField
                name="roadmap"
                control={control}
                label="Roadmap link"
                iconAfterElement={<Icon name="copy" className="text-accent" />}
                onIconAfterClick={copyTextValue}
              />
            </InlineFields>
          </InlineFields>
          <InlineFields>
            <TextField
              name="kanbanBoard"
              control={control}
              label="Kanban board link"
              iconAfterElement={<Icon name="copy" className="text-accent" />}
              onIconAfterClick={copyTextValue}
            />
            <SelectField name="phase" options={phasesOptions} control={control} label="Phase" />
          </InlineFields>
        </>
      )}
      {!projectId && (
        <SelectField name="phase" options={phasesOptions} control={control} label="Phase" />
      )}
      <TextAreaField name="notes" control={control} label="Notes" />
    </SectionContainer>
  );
};
