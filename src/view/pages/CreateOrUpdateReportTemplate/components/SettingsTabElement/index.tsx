import {
  Checkbox,
  InlineFields,
  SelectField,
  TextAreaField,
  TextField,
  TimeField,
  useSelectOptions,
} from '@appello/web-ui';
import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { TimeFormat } from '~/constants/dates';
import {
  ReportEmailNotificationChoice,
  ReportRepeatChoice,
  WeekDayChoice,
} from '~/services/gql/__generated__/globalTypes';
import { FetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { SectionContainer } from '~/view/components/SectionContainer';
import { FetchRolesListQuery } from '~/view/pages/Users/__generated__/schema';

import { ReportTemplateFormValues } from '../../hooks/useReportTemplateForm';

interface Props {
  roles: FetchRolesListQuery['rolesList'];
  users: FetchUserGlossaryListQuery['userGlossaryList']['results'];
}

export const SettingsTabElement: FC<Props> = ({ roles, users }) => {
  const { control, register } = useFormContext<ReportTemplateFormValues>();

  const rolesOptions = useSelectOptions(roles, {
    value: 'value',
    label: 'label',
  });

  const usersOptions = useSelectOptions(users, {
    value: 'id',
    label: 'fullName',
  });

  const daysOptions = enumToSelectOptions(WeekDayChoice);
  const repeatOptions = enumToSelectOptions(ReportRepeatChoice);
  const emailNotificationsOptions = enumToSelectOptions(ReportEmailNotificationChoice);

  return (
    <div className="mt-7 mb-20 w-[700px] m-auto flex flex-col gap-4">
      <SectionContainer title="About">
        <TextField name="name" control={control} label="Report name" required />
        <TextAreaField name="description" control={control} label="Report description" />
      </SectionContainer>
      <SectionContainer title="Reporting rules">
        <SelectField
          name="filledById"
          options={rolesOptions}
          control={control}
          label="To be filled by"
          required
        />
        <InlineFields>
          <SelectField
            name="reportDay"
            options={daysOptions}
            control={control}
            label="Report day"
            required
          />
          <TimeField
            name="time"
            control={control}
            label="Time"
            required
            step={60}
            labelFormat={TimeFormat.TIME_FORMAT}
          />
        </InlineFields>
        <InlineFields>
          <SelectField
            name="repeat"
            options={repeatOptions}
            control={control}
            label="Repeat"
            required
          />
          <SelectField
            name="emailNotification"
            options={emailNotificationsOptions}
            control={control}
            label="Email notification"
            required
          />
        </InlineFields>
        <SelectField
          name="sendTo"
          options={usersOptions}
          control={control}
          label="Send submitted report to email"
          isMulti
        />
        <div className="flex flex-col">
          <Checkbox
            label="Apply to all projects"
            {...register('applyToAllProjects')}
            className="mt-4"
          />
          <span className="text-p5 text-gray-2 ml-7">
            This template will be automatically applied to all new projects
          </span>
        </div>
      </SectionContainer>
    </div>
  );
};
