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
          <TextField required control={control} label="Project name" name="name" />
          <TextField control={control} label="Hours estimated" name="hoursEstimated" />
        </InlineFields>
        <InlineFields>
          <SelectField
            isMulti
            control={control}
            label="Platform"
            name="platforms"
            options={platformsOptions}
          />
          <SelectField control={control} label="Status" name="status" options={statusesOptions} />
        </InlineFields>
      </InlineFields>
      {!!projectId && (
        <>
          <InlineFields>
            <div>
              <InlineFields>
                <DateField control={control} label="Start date" name="startDate" />
                <DateField control={control} label="Estimated end date" name="endDate" />
              </InlineFields>
              <div className="flex items-center gap-1 mt-2">
                <Icon className="w-4 h-4 text-blue" name="information" />
                <span className="text-gray-1 text-p5">
                  Start date and Estimated end date will be used for calculating the Estimated days
                </span>
              </div>
            </div>
            <InlineFields>
              <TextField
                control={control}
                iconAfterElement={<Icon className="text-accent" name="copy" />}
                label="Design link"
                name="design"
                onIconAfterClick={copyTextValue}
              />
              <TextField
                control={control}
                iconAfterElement={<Icon className="text-accent" name="copy" />}
                label="Roadmap link"
                name="roadmap"
                onIconAfterClick={copyTextValue}
              />
            </InlineFields>
          </InlineFields>
          <InlineFields>
            <TextField
              control={control}
              iconAfterElement={<Icon className="text-accent" name="copy" />}
              label="Kanban board link"
              name="kanbanBoard"
              onIconAfterClick={copyTextValue}
            />
            <SelectField control={control} label="Phase" name="phase" options={phasesOptions} />
          </InlineFields>
        </>
      )}
      {!projectId && (
        <SelectField control={control} label="Phase" name="phase" options={phasesOptions} />
      )}
      <TextAreaField control={control} label="Notes" name="notes" />
    </SectionContainer>
  );
};
